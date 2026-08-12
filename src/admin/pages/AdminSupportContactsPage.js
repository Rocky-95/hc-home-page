import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../services/apiClient";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";
import ActiveToggle from "../components/ActiveToggle";

const RCU = "ADMIN_PORTAL";
const unwrap = (res) => res.data?.data || res.data || [];

const emptyContact = {
  contact_title: "",
  contact_name: "",
  contact_email: "",
  contact_number: "",
  whatsapp_number: "",
  address_text: "",
  working_hours: "",
  isactive: true,
};

// tbl_support_contacts is a flat list of real named columns (title/name/email/phone/
// whatsapp/address/hours) — previously modeled as a fictional "contact_type / contact_value"
// key-value pair, which doesn't exist on the real table at all and couldn't save.
const AdminSupportContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState(emptyContact);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const toast = useToast();
  const confirm = useConfirm();

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try { setContacts(unwrap(await apiClient.get("/Support-Contacts"))); }
    catch { setContacts([]); toast.error("Failed to load support contacts."); }
    finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, isactive: form.isactive ? 1 : 0 };
      if (editing) {
        await apiClient.put("/Support-Contacts", { ...payload, support_contact_id: editing.support_contact_id, luu: RCU });
        toast.success("Contact updated.");
      } else {
        await apiClient.post("/Support-Contacts", { ...payload, rcu: RCU });
        toast.success("Contact created.");
      }
      setShowForm(false); setEditing(null); setForm(emptyContact); fetchContacts();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save contact."); }
  };

  const handleDelete = async (c) => {
    const ok = await confirm({ title: `Delete "${c.contact_title}"?`, message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Support-Contacts", { data: { support_contact_id: c.support_contact_id, luu: RCU } }); toast.success("Contact deleted."); fetchContacts(); }
    catch (err) { toast.error(err.response?.data?.message || "Delete failed."); }
  };

  const toggleContactActive = async (c, nextActive) => {
    try {
      await apiClient.put("/Support-Contacts", { support_contact_id: c.support_contact_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Contact ${nextActive ? "activated" : "deactivated"}.`);
      fetchContacts();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  const startEdit = (c) => {
    setEditing(c);
    setForm({
      contact_title: c.contact_title || "",
      contact_name: c.contact_name || "",
      contact_email: c.contact_email || "",
      contact_number: c.contact_number || "",
      whatsapp_number: c.whatsapp_number || "",
      address_text: c.address_text || "",
      working_hours: c.working_hours || "",
      isactive: c.isactive !== false && c.isactive !== 0,
    });
    setShowForm(true);
  };

  const filtered = contacts.filter((c) =>
    c.contact_title?.toLowerCase().includes(search.toLowerCase()) ||
    c.contact_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.contact_email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-4">Support Contacts</h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input className="form-control w-auto" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
        <button className="btn btn-dark" onClick={() => { setShowForm(true); setEditing(null); setForm(emptyContact); }}>+ Add Contact</button>
      </div>

      {showForm && (
        <Modal title={editing ? "Edit Contact" : "New Contact"} onClose={() => { setShowForm(false); setEditing(null); setForm(emptyContact); }} size="lg">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Title *</label><input className="form-control" value={form.contact_title} onChange={(e) => setForm((p) => ({ ...p, contact_title: e.target.value }))} placeholder="e.g. Customer Support" required /></div>
              <div className="col-md-6"><label className="form-label">Contact Name</label><input className="form-control" value={form.contact_name} onChange={(e) => setForm((p) => ({ ...p, contact_name: e.target.value }))} /></div>
              <div className="col-md-6"><label className="form-label">Email</label><input type="email" className="form-control" value={form.contact_email} onChange={(e) => setForm((p) => ({ ...p, contact_email: e.target.value }))} /></div>
              <div className="col-md-3"><label className="form-label">Phone</label><input className="form-control" value={form.contact_number} onChange={(e) => setForm((p) => ({ ...p, contact_number: e.target.value }))} /></div>
              <div className="col-md-3"><label className="form-label">WhatsApp</label><input className="form-control" value={form.whatsapp_number} onChange={(e) => setForm((p) => ({ ...p, whatsapp_number: e.target.value }))} /></div>
              <div className="col-md-8"><label className="form-label">Address</label><input className="form-control" value={form.address_text} onChange={(e) => setForm((p) => ({ ...p, address_text: e.target.value }))} /></div>
              <div className="col-md-4"><label className="form-label">Working Hours</label><input className="form-control" value={form.working_hours} onChange={(e) => setForm((p) => ({ ...p, working_hours: e.target.value }))} placeholder="Mon-Sat, 10am-7pm" /></div>
              <div className="col-12"><div className="form-check"><input type="checkbox" className="form-check-input" checked={form.isactive} onChange={(e) => setForm((p) => ({ ...p, isactive: e.target.checked }))} id="contactActive" /><label className="form-check-label" htmlFor="contactActive">Active</label></div></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark">{editing ? "Update" : "Create"} Contact</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyContact); }}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}

      {loading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
        <table className="table table-hover align-middle">
          <thead className="table-dark"><tr><th>Title</th><th>Name</th><th>Email</th><th>Phone</th><th>Active</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={6} className="text-center text-muted">No contacts found.</td></tr> :
              filtered.map((c) => (
                <tr key={c.support_contact_id}>
                  <td><strong>{c.contact_title}</strong></td>
                  <td>{c.contact_name}</td>
                  <td>{c.contact_email}</td>
                  <td>{c.contact_number}</td>
                  <td><ActiveToggle active={!!c.isactive} onToggle={(next) => toggleContactActive(c, next)} /></td>
                  <td>
                    <button className="btn btn-sm btn-outline-dark me-1" onClick={() => startEdit(c)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSupportContactsPage;
