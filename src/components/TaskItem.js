import React, { useState } from 'react';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div>
        <h3>{task.title}</h3>
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isExpanded && (
        <div>
          <p>{task.description}</p>
          <p>Last updated: {new Date(task.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
