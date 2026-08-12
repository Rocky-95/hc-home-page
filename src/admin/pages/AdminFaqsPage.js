import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";
import ActiveToggle from "../components/ActiveToggle";

const RCU = "ADMIN_PORTAL";

const emptyFaq = {
  question: "",
  answer: "",
  display_order: 1,
  isactive: true,
};

const AdminFaqsPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState(emptyFaq);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const toast = useToast();
  const confirm = useConfirm();

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get("/FAQs");
      setFaqs(r.data?.data || r.data || []);
    } catch {
      setFaqs([]);
      toast.error("Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        display_order: parseInt(form.display_order) || 1,
        isactive: form.isactive ? 1 : 0,
      };
      if (editing) {
        await api.put("/FAQs", { ...payload, faq_id: editing.faq_id, luu: RCU });
        toast.success("FAQ updated.");
      } else {
        await api.post("/FAQs", { ...payload, rcu: RCU });
        toast.success("FAQ created.");
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyFaq);
      fetchFaqs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save FAQ.");
    }
  };

  const toggleFaqActive = async (f, nextActive) => {
    try {
      await api.put("/FAQs", { faq_id: f.faq_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`FAQ ${nextActive ? "activated" : "deactivated"}.`);
      fetchFaqs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    }
  };

  const handleDelete = async (f) => {
    const ok = await confirm({ title: `Delete "${f.question}"?`, message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try {
      await api.delete("/FAQs", { data: { faq_id: f.faq_id, luu: RCU } });
      toast.success("FAQ deleted.");
      fetchFaqs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed.");
    }
  };

  const startEdit = (f) => {
    setEditing(f);
    setForm({
      question: f.question || "",
      answer: f.answer || "",
      display_order: f.display_order || 1,
      isactive: f.isactive !== false && f.isactive !== 0,
    });
    setShowForm(true);
  };

  const filtered = faqs.filter((f) =>
    f.question?.toLowerCase().includes(search.toLowerCase()) ||
    f.answer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-4">FAQ Management</h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input className="form-control w-auto" placeholder="Search FAQs..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
        <button className="btn btn-dark" onClick={() => { setShowForm(true); setEditing(null); setForm(emptyFaq); }}>
          + Add FAQ
        </button>
      </div>

      {showForm && (
        <Modal title={editing ? "Edit FAQ" : "New FAQ"} onClose={() => { setShowForm(false); setEditing(null); setForm(emptyFaq); }} size="lg">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Question *</label>
                <input className="form-control" value={form.question} onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))} required />
              </div>
              <div className="col-md-12">
                <label className="form-label">Answer * (HTML allowed)</label>
                <textarea className="form-control" rows={4} value={form.answer} onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Display Order</label>
                <input type="number" className="form-control" value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: e.target.value }))} />
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <div className="form-check mb-2">
                  <input type="checkbox" className="form-check-input" checked={form.isactive} onChange={(e) => setForm((p) => ({ ...p, isactive: e.target.checked }))} id="faqActive" />
                  <label className="form-check-label" htmlFor="faqActive">Active</label>
                </div>
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark">{editing ? "Update" : "Create"} FAQ</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyFaq); }}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}

      {loading ? (
        <div className="text-center py-4"><div className="spinner-border" /></div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr><th>Question</th><th>Answer</th><th>Order</th><th>Active</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted">No FAQs found.</td></tr>
              ) : (
                filtered.map((f) => (
                  <tr key={f.faq_id}>
                    <td><strong>{f.question}</strong></td>
                    <td style={{ maxWidth: 400, whiteSpace: "pre-wrap" }}>{f.answer}</td>
                    <td>{f.display_order}</td>
                    <td><ActiveToggle active={!!f.isactive} onToggle={(next) => toggleFaqActive(f, next)} /></td>
                    <td>
                      <button className="btn btn-sm btn-outline-dark me-1" onClick={() => startEdit(f)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(f)}>Delete</button>
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

export default AdminFaqsPage;
