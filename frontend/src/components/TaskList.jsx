function TaskList({ tasks, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Create your first task!</p>
      </div>
    );
  }

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
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'pending':
      default:
        return 'Pending';
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

  return (
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
                  onClick={() => onEdit(task)}
                  title="Edit task"
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(task.id)}
                  title="Delete task"
                >
                  Delete
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
                {formatDeadline(task.deadline)}
              </span>
            </div>

            <div className="task-details">
              <span className="task-project">
                {task.project?.name || 'No project'}
              </span>
              {task.assignedUser && (
                <span className="task-assignee">
                  {task.assignedUser.name}
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
  );
}

export default TaskList;
