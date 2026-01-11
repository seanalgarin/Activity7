function ProjectList({ projects, onDelete, onEdit }) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <p>No projects yet. Create your first project!</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <div className="project-header">
            <h3>{project.name}</h3>
            <div className="project-actions">
              <button
                className="btn-edit"
                onClick={() => onEdit(project)}
                title="Edit project"
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => onDelete(project.id)}
                title="Delete project"
              >
                Delete
              </button>
            </div>
          </div>
          
          {project.description && (
            <p className="project-description">{project.description}</p>
          )}
          
          <div className="project-meta">
            <span className="project-owner">
              {project.user?.name || 'Unknown'}
            </span>
            <span className="project-tasks">
              {project.tasks?.length || 0} tasks
            </span>
          </div>
          
          <div className="project-date">
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
