import { useState, useEffect } from 'react';
import { projectsAPI, tasksAPI, usersAPI } from '../services/api';
import ProjectList from './ProjectList';
import TaskList from './TaskList';
import ProjectForm from './ProjectForm';
import TaskForm from './TaskForm';
import UserManagement from './UserManagement';
import Modal from './Modal';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [editingProject, setEditingProject] = useState(null);
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
      const [projectsRes, tasksRes, usersRes] = await Promise.all([
        projectsAPI.getAll(),
        tasksAPI.getAll(),
        usersAPI.getAll(),
      ]);
      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = error.code === 'ERR_NETWORK' 
        ? 'Unable to connect to server. Please ensure the backend is running on port 3000.'
        : 'Failed to load data. Please try again.';
      showAlert(errorMessage, 'Error Loading Data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    showConfirm(
      'Are you sure you want to delete this project?',
      async () => {
        closeModal();
        try {
          await projectsAPI.delete(id);
          fetchData();
        } catch (error) {
          console.error('Error deleting project:', error);
          showAlert('Failed to delete project', 'Error');
        }
      },
      'Delete Project'
    );
  };

  const handleDeleteTask = async (id) => {
    showConfirm(
      'Are you sure you want to delete this task?',
      async () => {
        closeModal();
        try {
          await tasksAPI.delete(id);
          fetchData();
        } catch (error) {
          console.error('Error deleting task:', error);
          showAlert('Failed to delete task', 'Error');
        }
      },
      'Delete Task'
    );
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setActiveView('editProject');
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setActiveView('editTask');
  };

  const handleProjectSubmit = async () => {
    setEditingProject(null);
    setActiveView('dashboard');
    await fetchData();
  };

  const handleTaskSubmit = async () => {
    setEditingTask(null);
    setActiveView('dashboard');
    await fetchData();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Management System</h1>
        <nav className="dashboard-nav">
          <button
            className={activeView === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeView === 'newProject' ? 'active' : ''}
            onClick={() => {
              setEditingProject(null);
              setActiveView('newProject');
            }}
          >
            + New Project
          </button>
          <button
            className={activeView === 'newTask' ? 'active' : ''}
            onClick={() => {
              setEditingTask(null);
              setActiveView('newTask');
            }}
          >
            + New Task
          </button>
          <button
            className={activeView === 'users' ? 'active' : ''}
            onClick={() => setActiveView('users')}
          >
            Users
          </button>
        </nav>
      </header>

      <main className="dashboard-content">
        {activeView === 'dashboard' && (
          <div className="dashboard-overview">
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Total Projects</h3>
                <p className="stat-number">{projects.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Tasks</h3>
                <p className="stat-number">{tasks.length}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Tasks</h3>
                <p className="stat-number">
                  {tasks.filter((t) => t.status === 'pending').length}
                </p>
              </div>
              <div className="stat-card">
                <h3>Completed Tasks</h3>
                <p className="stat-number">
                  {tasks.filter((t) => t.status === 'completed').length}
                </p>
              </div>
            </div>

            <div className="dashboard-sections">
              <section className="dashboard-section">
                <h2>Projects</h2>
                <ProjectList
                  projects={projects}
                  onDelete={handleDeleteProject}
                  onEdit={handleEditProject}
                />
              </section>

              <section className="dashboard-section">
                <h2>Tasks</h2>
                <TaskList
                  tasks={tasks}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              </section>
            </div>
          </div>
        )}

        {(activeView === 'newProject' || activeView === 'editProject') && (
          <ProjectForm
            users={users}
            project={editingProject}
            onSubmit={handleProjectSubmit}
            onCancel={() => setActiveView('dashboard')}
          />
        )}

        {(activeView === 'newTask' || activeView === 'editTask') && (
          <TaskForm
            projects={projects}
            users={users}
            task={editingTask}
            onSubmit={handleTaskSubmit}
            onCancel={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'users' && (
          <UserManagement users={users} onUpdate={fetchData} />
        )}
      </main>

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

export default Dashboard;
