import { useEffect, useState } from "react";
import api from "../../services/api";
import "./ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);

      alert("User deleted successfully");

      loadUsers();
    } catch (error) {
      console.error(error);

      alert("Unable to delete user");
    }
  };
  const toggleStatus = async (id) => {
    try {
      await api.put(`/users/${id}/toggle-status`);

      alert("Status Updated");

      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Unable to update status");
    }
  };
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="manage-users">
      <h1>👥 Manage Users</h1>
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          <option value="ALL">All Users</option>

          <option value="CUSTOMER">Customers</option>

          <option value="ARTIST">Artists</option>

          <option value="ADMIN">Admins</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>#{user.id}</td>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>
                <span className={`role ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>

              <td>
                {user.role === "CUSTOMER" ? (
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                ) : user.role === "ARTIST" ? (
                  <span style={{ color: "#ff9800" }}>
                    <button
                      className={user.active ? "disable-btn" : "enable-btn"}
                      onClick={() => toggleStatus(user.id)}
                    >
                      {user.active ? "Disable" : "Enable"}
                    </button>
                  </span>
                ) : (
                  <span style={{ color: "#4caf50" }}>Protected</span>
                )}
              </td>
              <td>{user.active ? "🟢 Active" : "🔴 Disabled"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
