import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProjectForm from './ProjectForm';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, usersRes] = await Promise.all([
        api.getProjects(),
        api.getUsers(),
      ]);
      setProjects(projectsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.deleteProject(id);
        setProjects(projects.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchData();
  };

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <h2>Projects</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + New Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          users={users}
          onClose={handleFormClose}
        />
      )}

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet. Create your first project!</p>
        </div>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <div className="project-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(project)}
                    title="Edit project"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(project.id)}
                    title="Delete project"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {project.description && (
                <p className="project-description">{project.description}</p>
              )}

              <div className="project-meta">
                <span className="project-owner">
                  👤 {project.user?.name || 'Unknown'}
                </span>
                <span className="project-tasks">
                  📝 {project.tasks?.length || 0} tasks
                </span>
              </div>

              <div className="project-date">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
