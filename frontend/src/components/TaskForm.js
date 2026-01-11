import React, { useState, useEffect } from 'react';
import api from '../services/api';

function TaskForm({ projects, users, task, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    deadline: '',
    projectId: '',
    assignedUserId: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      // Format deadline for datetime-local input
      const deadlineDate = new Date(task.deadline);
      const formattedDeadline = deadlineDate.toISOString().slice(0, 16);
      
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        deadline: formattedDeadline,
        projectId: task.projectId || '',
        assignedUserId: task.assignedUserId || '',
      });
    } else {
      // Set default deadline to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDeadline = tomorrow.toISOString().slice(0, 16);
      setFormData((prev) => ({ ...prev, deadline: formattedDeadline }));
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    if (!formData.projectId) {
      alert('Please select a project');
      return;
    }
    
    if (!formData.deadline) {
      alert('Please select a deadline');
      return;
    }

    try {
      setLoading(true);
      const data = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        deadline: new Date(formData.deadline).toISOString(),
        projectId: parseInt(formData.projectId),
        assignedUserId: formData.assignedUserId ? parseInt(formData.assignedUserId) : undefined,
      };

      if (task) {
        await api.updateTask(task.id, data);
      } else {
        await api.createTask(data);
      }

      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
      alert(error.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="form-container">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="title">Task Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
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
                placeholder="Enter task description"
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="in_progress">🔄 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="deadline">Deadline *</label>
                <input
                  type="datetime-local"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="projectId">Project *</label>
                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="assignedUserId">Assign To</label>
                <select
                  id="assignedUserId"
                  name="assignedUserId"
                  value={formData.assignedUserId}
                  onChange={handleChange}
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
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
                {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
