import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ProjectForm({ users, project, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    userId: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        userId: project.userId || '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a project name');
      return;
    }
    
    if (!formData.userId) {
      alert('Please select a project owner');
      return;
    }

    try {
      setLoading(true);
      const data = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        userId: parseInt(formData.userId),
      };

      if (project) {
        await api.updateProject(project.id, data);
      } else {
        await api.createProject(data);
      }

      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      alert(error.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="form-container">
          <h2>{project ? 'Edit Project' : 'Create New Project'}</h2>
          
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Project Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="userId">Project Owner *</label>
              <select
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
