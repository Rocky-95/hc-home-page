import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const RCU = "ADMIN_PORTAL";

const emptySetting = {
  setting_key: "",
  setting_value: "",
  setting_type: "",
  isactive: true,
};

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState([]);
  const [form, setForm] = useState(emptySetting);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ text: "", isError: false });

  const flash = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: "", isError: false }), 4000);
  };

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get("/Settings");
      setSettings(r.data?.data || r.data || []);
    } catch {
      setSettings([]);
      flash("Failed to load settings.", true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        isactive: form.isactive ? 1 : 0,
      };
      if (editing) {
        const idField = editing.setting_id ? "setting_id" : "id";
        await api.put("/Settings", { ...payload, [idField]: editing[idField], luu: RCU });
        flash("Setting updated.");
      } else {
        await api.post("/Settings", { ...payload, rcu: RCU });
        flash("Setting created.");
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptySetting);
      fetchSettings();
    } catch (err) {
      flash(err.response?.data?.message || "Failed to save setting.", true);
    }
  };

  const handleDelete = async (s) => {
    if (!window.confirm(`Delete "${s.setting_key}"?`)) return;
    try {
      const idField = s.setting_id ? "setting_id" : "id";
      await api.delete("/Settings", { data: { [idField]: s[idField], luu: RCU } });
      flash("Setting deleted.");
      fetchSettings();
    } catch (err) {
      flash(err.response?.data?.message || "Delete failed.", true);
    }
  };

  const startEdit = (s) => {
    setEditing(s);
    setForm({
      setting_key: s.setting_key || "",
      setting_value: s.setting_value || "",
      setting_type: s.setting_type || "",
      isactive: s.isactive !== false && s.isactive !== 0,
    });
    setShowForm(true);
  };

  const filtered = settings.filter((s) =>
    s.setting_key?.toLowerCase().includes(search.toLowerCase()) ||
    s.setting_value?.toLowerCase().includes(search.toLowerCase()) ||
    s.setting_type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-4">Settings Management</h3>
      {message.text && <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} py-2`}>{message.text}</div>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input className="form-control w-auto" placeholder="Search settings..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
        <button className="btn btn-dark" onClick={() => { setShowForm(true); setEditing(null); setForm(emptySetting); }}>
          + Add Setting
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>{editing ? "Edit Setting" : "New Setting"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Key *</label>
                  <input className="form-control" value={form.setting_key} onChange={(e) => setForm((p) => ({ ...p, setting_key: e.target.value }))} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Type</label>
                  <input className="form-control" value={form.setting_type} onChange={(e) => setForm((p) => ({ ...p, setting_type: e.target.value }))} placeholder="e.g., json, text" />
                </div>
                <div className="col-md-3 d-flex align-items-end">
                  <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" checked={form.isactive} onChange={(e) => setForm((p) => ({ ...p, isactive: e.target.checked }))} id="settingActive" />
                    <label className="form-check-label" htmlFor="settingActive">Active</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Value *</label>
                  <textarea className="form-control" rows={4} value={form.setting_value} onChange={(e) => setForm((p) => ({ ...p, setting_value: e.target.value }))} required />
                  <div className="form-text">For arrays/objects, paste a valid JSON string.</div>
                </div>
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-dark">{editing ? "Update" : "Create"} Setting</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowForm(false); setEditing(null); setForm(emptySetting); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-4"><div className="spinner-border" /></div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr><th>Key</th><th>Type</th><th>Value</th><th>Active</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted">No settings found.</td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.setting_id || s.id}>
                    <td><code>{s.setting_key}</code></td>
                    <td>{s.setting_type || "-"}</td>
                    <td style={{ maxWidth: 500, whiteSpace: "pre-wrap" }}>{s.setting_value}</td>
                    <td><span className={`badge bg-${s.isactive ? "success" : "secondary"}`}>{s.isactive ? "Yes" : "No"}</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-dark me-1" onClick={() => startEdit(s)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
