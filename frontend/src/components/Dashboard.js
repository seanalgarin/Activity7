import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [projectsRes, tasksRes] = await Promise.all([
        api.getProjects(),
        api.getTasks(),
      ]);

      const projectsData = projectsRes.data;
      const tasksData = tasksRes.data;

      setProjects(projectsData);
      setTasks(tasksData);

      setStats({
        totalProjects: projectsData.length,
        totalTasks: tasksData.length,
        pendingTasks: tasksData.filter((t) => t.status === 'pending').length,
        completedTasks: tasksData.filter((t) => t.status === 'completed').length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      alert('Failed to load dashboard data. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalProjects}</h3>
          <p>Total Projects</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalTasks}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="stat-card">
          <h3>{stats.pendingTasks}</h3>
          <p>Pending Tasks</p>
        </div>
        <div className="stat-card">
          <h3>{stats.completedTasks}</h3>
          <p>Completed Tasks</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Projects</h3>
            <button onClick={() => onNavigate('projects')}>View All</button>
          </div>
          {projects.length === 0 ? (
            <p className="empty-state">No projects yet. Create your first project!</p>
          ) : (
            <div className="project-cards">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="project-card-mini">
                  <h4>{project.name}</h4>
                  <p>{project.description || 'No description'}</p>
                  <span className="task-count">
                    {project.tasks?.length || 0} tasks
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Tasks</h3>
            <button onClick={() => onNavigate('tasks')}>View All</button>
          </div>
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks yet. Create your first task!</p>
          ) : (
            <div className="task-list-mini">
              {tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="task-item-mini">
                  <div>
                    <strong>{task.title}</strong>
                    <span className={`status-badge ${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                  <small>Due: {new Date(task.deadline).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
