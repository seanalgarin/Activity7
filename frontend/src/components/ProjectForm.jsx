import { useState, useEffect } from 'react';
import { projectsAPI } from '../services/api';
import Modal from './Modal';

function ProjectForm({ users, project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    userId: '',
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'alert' });

  const showAlert = (message, title = 'Message') => {
    setModal({ isOpen: true, title, message, type: 'alert' });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: '', message: '', type: 'alert' });
  };

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
      showAlert('Please enter a project name', 'Validation Error');
      return;
    }
    
    if (!formData.userId) {
      showAlert('Please select a project owner', 'Validation Error');
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
        await projectsAPI.update(project.id, data);
      } else {
        await projectsAPI.create(data);
      }

      onSubmit();
    } catch (error) {
      console.error('Error saving project:', error);
      const errorMessage = error.response?.data?.message 
        || (error.code === 'ERR_NETWORK' ? 'Unable to connect to server. Please ensure the backend is running.'
        : 'Failed to save project. Please try again.');
      showAlert(errorMessage, 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
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
            onClick={onCancel}
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

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}

export default ProjectForm;
