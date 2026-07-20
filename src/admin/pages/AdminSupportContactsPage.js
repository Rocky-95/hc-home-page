import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const RCU = "ADMIN_PORTAL";

const contactTypeOptions = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "address", label: "Address" },
  { value: "working_hours", label: "Working Hours" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "support_email", label: "Support Email" },
];

const emptyContact = {
  contact_type: "phone",
  contact_value: "",
  display_order: 1,
  isactive: true,
};

const AdminSupportContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState(emptyContact);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ text: "", isError: false });

  const flash = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: "", isError: false }), 4000);
  };

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get("/Support-Contacts");
      setContacts(r.data?.data || r.data || []);
    } catch {
      setContacts([]);
      flash("Failed to load support contacts.", true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        display_order: parseInt(form.display_order) || 1,
        isactive: form.isactive ? 1 : 0,
      };
      if (editing) {
        const idField = editing.support_contact_id ? "support_contact_id" : "id";
        await api.put("/Support-Contacts", { ...payload, [idField]: editing[idField], luu: RCU });
        flash("Contact updated.");
      } else {
        await api.post("/Support-Contacts", { ...payload, rcu: RCU });
        flash("Contact created.");
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyContact);
      fetchContacts();
    } catch (err) {
      flash(err.response?.data?.message || "Failed to save contact.", true);
    }
  };

  const handleDelete = async (c) => {
    if (!window.confirm(`Delete "${c.contact_type}" contact?`)) return;
    try {
      const idField = c.support_contact_id ? "support_contact_id" : "id";
      await api.delete("/Support-Contacts", { data: { [idField]: c[idField], luu: RCU } });
      flash("Contact deleted.");
      fetchContacts();
    } catch (err) {
      flash(err.response?.data?.message || "Delete failed.", true);
    }
  };

  const startEdit = (c) => {
    setEditing(c);
    setForm({
      contact_type: c.contact_type || "phone",
      contact_value: c.contact_value || "",
      display_order: c.display_order || 1,
      isactive: c.isactive !== false && c.isactive !== 0,
    });
    setShowForm(true);
  };

  const filtered = contacts.filter((c) =>
    c.contact_type?.toLowerCase().includes(search.toLowerCase()) ||
    c.contact_value?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-4">Support Contacts Management</h3>
      {message.text && <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} py-2`}>{message.text}</div>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input className="form-control w-auto" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
        <button className="btn btn-dark" onClick={() => { setShowForm(true); setEditing(null); setForm(emptyContact); }}>
          + Add Contact
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>{editing ? "Edit Contact" : "New Contact"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Contact Type *</label>
                  <select className="form-select" value={form.contact_type} onChange={(e) => setForm((p) => ({ ...p, contact_type: e.target.value }))} required>
                    {contactTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="col-md-8">
                  <label className="form-label">Value *</label>
                  <input className="form-control" value={form.contact_value} onChange={(e) => setForm((p) => ({ ...p, contact_value: e.target.value }))} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Display Order</label>
                  <input type="number" className="form-control" value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: e.target.value }))} />
                </div>
                <div className="col-md-3 d-flex align-items-end">
                  <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" checked={form.isactive} onChange={(e) => setForm((p) => ({ ...p, isactive: e.target.checked }))} id="contactActive" />
                    <label className="form-check-label" htmlFor="contactActive">Active</label>
                  </div>
                </div>
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-dark">{editing ? "Update" : "Create"} Contact</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyContact); }}>Cancel</button>
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
              <tr><th>Type</th><th>Value</th><th>Order</th><th>Active</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted">No contacts found.</td></tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.support_contact_id || c.id}>
                    <td><span className="text-capitalize">{c.contact_type?.replace("_", " ")}</span></td>
                    <td>{c.contact_value}</td>
                    <td>{c.display_order}</td>
                    <td><span className={`badge bg-${c.isactive ? "success" : "secondary"}`}>{c.isactive ? "Yes" : "No"}</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-dark me-1" onClick={() => startEdit(c)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c)}>Delete</button>
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

export default AdminSupportContactsPage;
