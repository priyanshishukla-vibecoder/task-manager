function TaskList({ tasks, onUpdateStatus, onDeleteTask }) {
  return (
    <section className="panel">
      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p className="empty">No tasks found.</p>
      ) : (
        <ul className="list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div>
                <strong>{task.title}</strong>
                <p>{task.description || 'No description'}</p>
                <span>User ID: {task.user_id}</span>
              </div>

              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(event) => onUpdateStatus(task.id, event.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="in_progress">in_progress</option>
                  <option value="done">done</option>
                </select>

                <button type="button" onClick={() => onDeleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
