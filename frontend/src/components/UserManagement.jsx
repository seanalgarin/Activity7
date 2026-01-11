import { useState } from 'react';
import { usersAPI } from '../services/api';
import Modal from './Modal';

function UserManagement({ users, onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'alert', onConfirm: null });

  const showAlert = (message, title = 'Message') => {
    setModal({ isOpen: true, title, message, type: 'alert', onConfirm: null });
  };

  const showConfirm = (message, onConfirm, title = 'Confirm') => {
    setModal({ isOpen: true, title, message, type: 'confirm', onConfirm });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: '', message: '', type: 'alert', onConfirm: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    console.log('🗑️ Delete requested for user ID:', id);
    showConfirm(
      'Are you sure you want to delete this user? This will also delete all their projects and tasks.',
      async () => {
        console.log('✅ User confirmed delete for ID:', id);
        closeModal();
        try {
          console.log('📡 Calling usersAPI.delete for ID:', id);
          const response = await usersAPI.delete(id);
          console.log('✅ Delete response:', response);
          console.log('🔄 Calling onUpdate to refresh data');
          await onUpdate();
          console.log('✅ User deleted and data refreshed successfully');
        } catch (error) {
          console.error('❌ Error deleting user:', {
            id,
            error,
            response: error.response,
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
          });
          const errorMessage = error.response?.data?.message || error.message || 'Failed to delete user';
          showAlert(`Failed to delete user: ${errorMessage}`, 'Error');
        }
      },
      'Delete User'
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('📝 Form submitted:', { formData, editingUser });
    
    if (!formData.name.trim() || !formData.email.trim()) {
      console.warn('⚠️ Validation failed: Empty fields');
      showAlert('Please fill in all fields', 'Validation Error');
      return;
    }

    try {
      setLoading(true);
      const data = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      console.log('📡 Sending request:', editingUser ? 'UPDATE' : 'CREATE', data);

      if (editingUser) {
        const response = await usersAPI.update(editingUser.id, data);
        console.log('✅ Update response:', response);
      } else {
        const response = await usersAPI.create(data);
        console.log('✅ Create response:', response);
      }

      setFormData({ name: '', email: '' });
      setEditingUser(null);
      setShowForm(false);
      console.log('🔄 Calling onUpdate to refresh data');
      await onUpdate();
      console.log('✅ User saved and data refreshed successfully');
    } catch (error) {
      console.error('❌ Error saving user:', {
        error,
        response: error.response,
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      const errorMessage = error.response?.data?.message 
        || (error.code === 'ERR_NETWORK' ? 'Unable to connect to server. Please ensure the backend is running.'
        : 'Failed to save user. Please try again.');
      showAlert(errorMessage, 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '' });
    setEditingUser(null);
    setShowForm(false);
  };

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        {!showForm && (
          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add New User
          </button>
        )}
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter user name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter user email"
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : editingUser ? 'Update User' : 'Add User'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="user-list">
        {users.length === 0 ? (
          <div className="empty-state">
            <p>No users yet. Add your first user!</p>
          </div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Projects</th>
                <th>Tasks</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.projects?.length || 0}</td>
                  <td>{user.assignedTasks?.length || 0}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(user)}
                        title="Edit user"
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(user.id)}
                        title="Delete user"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}

export default UserManagement;
