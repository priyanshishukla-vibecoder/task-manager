function UserList({ users }) {
  return (
    <section className="panel">
      <h2>Users</h2>

      {users.length === 0 ? (
        <p className="empty">No users created yet.</p>
      ) : (
        <ul className="list">
          {users.map((user) => (
            <li key={user.id} className="list-item">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UserList;
