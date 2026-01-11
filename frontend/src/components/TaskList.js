import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TaskForm from './TaskForm';
import Modal from './Modal';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksRes, projectsRes, usersRes] = await Promise.all([
        api.getTasks(),
        api.getProjects(),
        api.getUsers(),
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      showAlert('Failed to load tasks', 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    showConfirm(
      'Are you sure you want to delete this task?',
      async () => {
        closeModal();
        try {
          await api.deleteTask(id);
          setTasks(tasks.filter((t) => t.id !== id));
        } catch (error) {
          console.error('Error deleting task:', error);
          showAlert('Failed to delete task', 'Error');
        }
      },
      'Delete Task'
    );
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
    fetchData();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in_progress':
        return 'status-in-progress';
      case 'pending':
      default:
        return 'status-pending';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return '✅ Completed';
      case 'in_progress':
        return '🔄 In Progress';
      case 'pending':
      default:
        return '⏳ Pending';
    }
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h2>Tasks</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + New Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          projects={projects}
          users={users}
          onClose={handleFormClose}
        />
      )}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => {
            const overdue = isOverdue(task.deadline) && task.status !== 'completed';

            return (
              <div
                key={task.id}
                className={`task-card ${overdue ? 'task-overdue' : ''}`}
              >
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <div className="task-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(task)}
                      title="Edit task"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(task.id)}
                      title="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}

                <div className="task-meta">
                  <span className={`task-status ${getStatusClass(task.status)}`}>
                    {getStatusLabel(task.status)}
                  </span>

                  <span className={`task-deadline ${overdue ? 'deadline-overdue' : ''}`}>
                    📅 {formatDeadline(task.deadline)}
                  </span>
                </div>

                <div className="task-details">
                  <span className="task-project">
                    📁 {task.project?.name || 'No project'}
                  </span>
                  {task.assignedUser && (
                    <span className="task-assignee">
                      👤 {task.assignedUser.name}
                    </span>
                  )}
                </div>

                <div className="task-date">
                  {new Date(task.deadline).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

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

export default TaskList;
