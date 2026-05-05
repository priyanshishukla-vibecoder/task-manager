const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  done: 'Done',
};

function TaskList({ tasks, onUpdateStatus, onDeleteTask }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h2>Your Tasks</h2>
          <p>{tasks.length} task{tasks.length === 1 ? '' : 's'} in this workspace</p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <strong>No tasks yet</strong>
          <span>Create your first task to start tracking work.</span>
        </div>
      ) : (
        <div className="task-card-list">
          {tasks.map((task) => (
            <article key={task.id} className="task-row-card">
              <div className="task-row-content">
                <h3>{task.title}</h3>
                <p>{task.description || 'No description added.'}</p>
              </div>

              <div className="task-row-actions">
                <select
                  className={`status-select status-${task.status}`}
                  value={task.status}
                  onChange={(event) => onUpdateStatus(task.id, event.target.value)}
                >
                  <option value="pending">{statusLabels.pending}</option>
                  <option value="in_progress">{statusLabels.in_progress}</option>
                  <option value="done">{statusLabels.done}</option>
                </select>

                <button
                  type="button"
                  className="danger-button compact-button"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;
