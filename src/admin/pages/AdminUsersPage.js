import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../services/apiClient";

const RCU = "ADMIN_PORTAL";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({});
  const [assigningRole, setAssigningRole] = useState({});
  const [selectedRole, setSelectedRole] = useState({});
  const [message, setMessage] = useState({ text: "", isError: false });

  const flash = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: "", isError: false }), 4000);
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes, userRolesRes] = await Promise.allSettled([
        apiClient.get("/Users"),
        apiClient.get("/Roles"),
        apiClient.get("/User-Roles"),
      ]);
      const extract = (r) => r.status === "fulfilled" ? (r.value.data?.data || r.value.data || []) : [];
      setUsers(extract(usersRes));
      setRoles(extract(rolesRes));
      setUserRoles(extract(userRolesRes));
    } catch { } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const getRolesForUser = (userId) =>
    userRoles.filter((ur) => ur.user_id === userId);

  const handleToggle = (userId) =>
    setExpanded((prev) => ({ ...prev, [userId]: !prev[userId] }));

  const handleAssignRole = async (userId) => {
    const roleId = selectedRole[userId];
    if (!roleId) { flash("Select a role first.", true); return; }
    setAssigningRole((prev) => ({ ...prev, [userId]: true }));
    try {
      const role = roles.find((r) => r.role_id === roleId);
      await apiClient.post("/User-Roles/add", {
        user_id: userId,
        role_id: roleId,
        rcu: RCU,
        role_name: role?.role_name,
        role_code: role?.role_code,
      });
      flash("Role assigned.");
      fetchAll();
    } catch (err) {
      flash(err.response?.data?.message || "Failed to assign role.", true);
    } finally { setAssigningRole((prev) => ({ ...prev, [userId]: false })); }
  };

  const handleRemoveRole = async (userRoleId) => {
    if (!window.confirm("Remove this role from user?")) return;
    try {
      await apiClient.delete("/User-Roles/remove", {
        data: { user_role_id: userRoleId, luu: RCU },
      });
      flash("Role removed.");
      fetchAll();
    } catch (err) { flash("Failed to remove role.", true); }
  };

  const handleToggleActive = async (user) => {
    try {
      await apiClient.put("/Users", {
        user_id: user.user_id,
        isactive: !user.isactive,
        luu: RCU,
      });
      flash(`User ${!user.isactive ? "activated" : "deactivated"}.`);
      fetchAll();
    } catch { flash("Failed to update user.", true); }
  };

  const filtered = users.filter((u) =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email_id?.toLowerCase().includes(search.toLowerCase()) ||
    u.mobile_number?.includes(search)
  );

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">User Management</h3>
        <span className="badge bg-secondary fs-6">{users.length} users</span>
      </div>

      {message.text && (
        <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} py-2`}>
          {message.text}
        </div>
      )}

      <input
        className="form-control mb-3"
        placeholder="Search by name, email or mobile..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 360 }}
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Roles</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center text-muted">No users found.</td></tr>
            ) : filtered.map((user) => {
              const assignedRoles = getRolesForUser(user.user_id);
              const assignedRoleIds = new Set(assignedRoles.map((r) => r.role_id));
              const availableRoles = roles.filter((r) => !assignedRoleIds.has(r.role_id));
              return (
                <React.Fragment key={user.user_id}>
                  <tr>
                    <td>
                      <strong>{user.full_name || "—"}</strong>
                      <br />
                      <small className="text-muted">{user.user_id?.slice(0, 8)}...</small>
                    </td>
                    <td>{user.email_id}</td>
                    <td>{user.mobile_number || "—"}</td>
                    <td>
                      {assignedRoles.length === 0
                        ? <span className="text-muted">No roles</span>
                        : assignedRoles.map((r) => (
                          <span key={r.user_role_id} className="badge bg-dark me-1">
                            {r.role_name || r.role_code}
                          </span>
                        ))}
                    </td>
                    <td>
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={!!user.isactive}
                          onChange={() => handleToggleActive(user)}
                        />
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => handleToggle(user.user_id)}
                      >
                        {expanded[user.user_id] ? "▲ Hide" : "▼ Manage"}
                      </button>
                    </td>
                  </tr>
                  {expanded[user.user_id] && (
                    <tr>
                      <td colSpan={6} className="bg-light">
                        <div className="p-3">
                          <h6 className="fw-semibold mb-3">Role Management for {user.full_name}</h6>

                          {/* Current roles */}
                          <div className="mb-3">
                            <strong>Current Roles:</strong>
                            <div className="mt-2 d-flex flex-wrap gap-2">
                              {assignedRoles.length === 0
                                ? <span className="text-muted">None assigned</span>
                                : assignedRoles.map((r) => (
                                  <span key={r.user_role_id} className="badge bg-dark d-flex align-items-center gap-1" style={{ fontSize: "0.8rem" }}>
                                    {r.role_name || r.role_code}
                                    <button
                                      className="btn-close btn-close-white"
                                      style={{ fontSize: "0.6rem" }}
                                      onClick={() => handleRemoveRole(r.user_role_id)}
                                      title="Remove role"
                                    />
                                  </span>
                                ))}
                            </div>
                          </div>

                          {/* Assign new role */}
                          {availableRoles.length > 0 && (
                            <div className="d-flex align-items-center gap-2">
                              <select
                                className="form-select form-select-sm w-auto"
                                value={selectedRole[user.user_id] || ""}
                                onChange={(e) =>
                                  setSelectedRole((prev) => ({ ...prev, [user.user_id]: e.target.value }))
                                }
                              >
                                <option value="">-- Assign Role --</option>
                                {availableRoles.map((r) => (
                                  <option key={r.role_id} value={r.role_id}>
                                    {r.role_name} ({r.role_code})
                                  </option>
                                ))}
                              </select>
                              <button
                                className="btn btn-dark btn-sm"
                                disabled={assigningRole[user.user_id]}
                                onClick={() => handleAssignRole(user.user_id)}
                              >
                                {assigningRole[user.user_id] ? "Assigning..." : "Assign"}
                              </button>
                            </div>
                          )}

                          {/* User details */}
                          <div className="mt-3 row">
                            <div className="col-md-6">
                              <small className="text-muted">
                                <strong>Joined:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}<br />
                                <strong>User ID:</strong> {user.user_id}
                              </small>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
