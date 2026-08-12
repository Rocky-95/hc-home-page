import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../services/apiClient";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";
import ActiveToggle from "../components/ActiveToggle";

const RCU = "ADMIN_PORTAL";
const unwrap = (res) => res.data?.data || res.data || [];

const emptyHeader = { page_type: "", page_title: "", intro_text: "", effective_date: "", version_number: "", updated_by: "", isactive: true };
const emptySection = { section_title: "", content: "", section_order: 1, isactive: true };

// A Legal Page Header (privacy policy, terms, etc.) owns a set of Sections. Sections are
// linked to their header by page_type — previously staff had to type the same page_type
// string into the section form themselves, which is fragile (a typo silently orphans the
// section). Now: open a header from the list, and its sections are managed directly
// underneath it, with page_type carried over automatically.
const AdminLegalPagesPage = () => {
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [workspace, setWorkspace] = useState(null);
  const toast = useToast();
  const confirm = useConfirm();

  const fetchHeaders = useCallback(async () => {
    setLoading(true);
    try { setHeaders(unwrap(await apiClient.get("/Legal-Page-Headers"))); }
    catch { setHeaders([]); toast.error("Failed to load legal pages."); }
    finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fetchHeaders(); }, [fetchHeaders]);

  const openNew = () => setWorkspace({ ...emptyHeader, id: null });
  const openEdit = (h) => setWorkspace({ ...h });
  const closeWorkspace = () => { setWorkspace(null); fetchHeaders(); };

  const toggleHeaderActive = async (h, nextActive) => {
    try {
      await apiClient.put("/Legal-Page-Headers", { id: h.id, is_active: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Page ${nextActive ? "activated" : "deactivated"}.`);
      fetchHeaders();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  const filtered = headers.filter((h) => `${h.page_title || ""} ${h.page_type || ""}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h3 className="mb-4">Legal Pages</h3>

      {!workspace && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input className="form-control w-auto" placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
            <button className="btn btn-dark" onClick={openNew}>+ Add Page</button>
          </div>
          {loading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
            <table className="table table-hover align-middle">
              <thead className="table-dark"><tr><th>Title</th><th>Page Type</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 ? <tr><td colSpan={4} className="text-center text-muted">No pages found.</td></tr> :
                  filtered.map((h) => (
                    <tr key={h.id}>
                      <td><strong>{h.page_title}</strong></td>
                      <td><code>{h.page_type}</code></td>
                      <td><ActiveToggle active={!!h.is_active} onToggle={(next) => toggleHeaderActive(h, next)} /></td>
                      <td><button className="btn btn-sm btn-outline-dark" onClick={() => openEdit(h)}>Open</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {workspace && <LegalPageWorkspace header={workspace} onClose={closeWorkspace} toast={toast} confirm={confirm} />}
    </div>
  );
};

const LegalPageWorkspace = ({ header, onClose, toast, confirm }) => {
  const [core, setCore] = useState({
    page_type: header.page_type || "",
    page_title: header.page_title || "",
    intro_text: header.intro_text || "",
    effective_date: header.effective_date ? header.effective_date.split("T")[0] : "",
    version_number: header.version_number || "",
    updated_by: header.updated_by || "",
    isactive: header.is_active !== false,
  });
  const [headerId, setHeaderId] = useState(header.id || null);
  const [saving, setSaving] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(!headerId);

  const [sections, setSections] = useState([]);
  const [sectionForm, setSectionForm] = useState(emptySection);
  const [editingSection, setEditingSection] = useState(null);
  const [showSectionModal, setShowSectionModal] = useState(false);

  const loadSections = useCallback(async (pageType) => {
    if (!pageType) return;
    try {
      const all = unwrap(await apiClient.get("/Legal-Page-Sections"));
      setSections(Array.isArray(all)
        ? all.filter((s) => s.page_type?.toLowerCase() === pageType.toLowerCase()).sort((a, b) => (a.section_order || 0) - (b.section_order || 0))
        : []);
    } catch { setSections([]); }
  }, []);

  useEffect(() => { if (headerId) loadSections(core.page_type); }, [headerId, core.page_type, loadSections]);

  const saveCore = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...core, is_active: core.isactive ? 1 : 0 };
      if (headerId) {
        await apiClient.put("/Legal-Page-Headers", { ...payload, id: headerId, luu: RCU });
        toast.success("Page updated.");
      } else {
        const res = await apiClient.post("/Legal-Page-Headers", { ...payload, rcu: RCU });
        const newId = res.data?.data?.id ?? res.data?.id;
        if (newId == null) throw new Error("Page created but no id was returned.");
        setHeaderId(newId);
        setShowCoreModal(false);
        toast.success("Page created — now add sections below.");
      }
      setShowCoreModal(false);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save page."); }
    finally { setSaving(false); }
  };

  const openNewSection = () => { setEditingSection(null); setSectionForm(emptySection); setShowSectionModal(true); };
  const openEditSection = (s) => { setEditingSection(s); setSectionForm({ section_title: s.section_title, content: s.content || "", section_order: s.section_order || 1, isactive: s.is_active !== false }); setShowSectionModal(true); };

  const submitSection = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...sectionForm, page_type: core.page_type, section_order: parseInt(sectionForm.section_order) || 1, is_active: sectionForm.isactive ? 1 : 0 };
      if (editingSection) {
        await apiClient.put("/Legal-Page-Sections", { ...payload, id: editingSection.id, luu: RCU });
        toast.success("Section updated.");
      } else {
        await apiClient.post("/Legal-Page-Sections", { ...payload, rcu: RCU });
        toast.success("Section added.");
      }
      setShowSectionModal(false); setEditingSection(null); setSectionForm(emptySection); loadSections(core.page_type);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save section."); }
  };
  const deleteSection = async (s) => {
    const ok = await confirm({ title: `Delete "${s.section_title}"?`, message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Legal-Page-Sections", { data: { id: s.id, luu: RCU } }); toast.success("Section deleted."); loadSections(core.page_type); }
    catch { toast.error("Delete failed."); }
  };
  const toggleSectionActive = async (s, nextActive) => {
    try {
      await apiClient.put("/Legal-Page-Sections", { id: s.id, is_active: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Section ${nextActive ? "activated" : "deactivated"}.`);
      loadSections(core.page_type);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  return (
    <div>
      <button className="btn btn-link px-0 mb-3" onClick={onClose}>&larr; Back to Legal Pages</button>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">{core.page_title || "New Page"}</h5>
            <div className="text-muted small">{core.page_type}</div>
          </div>
          {headerId && <button className="btn btn-outline-dark btn-sm" onClick={() => setShowCoreModal(true)}>Edit Details</button>}
        </div>
      </div>

      {showCoreModal && (
        <Modal title={headerId ? "Edit Page" : "New Page"} onClose={() => { if (headerId) setShowCoreModal(false); }} size="lg">
          <form onSubmit={saveCore}>
            <div className="row g-3">
              <div className="col-md-4"><label className="form-label">Page Type *</label><input className="form-control" value={core.page_type} onChange={(e) => setCore((c) => ({ ...c, page_type: e.target.value }))} placeholder="e.g. privacy, terms" required disabled={!!headerId} /></div>
              <div className="col-md-8"><label className="form-label">Page Title *</label><input className="form-control" value={core.page_title} onChange={(e) => setCore((c) => ({ ...c, page_title: e.target.value }))} required /></div>
              <div className="col-md-4"><label className="form-label">Effective Date</label><input type="date" className="form-control" value={core.effective_date} onChange={(e) => setCore((c) => ({ ...c, effective_date: e.target.value }))} /></div>
              <div className="col-md-4"><label className="form-label">Version Number</label><input className="form-control" value={core.version_number} onChange={(e) => setCore((c) => ({ ...c, version_number: e.target.value }))} /></div>
              <div className="col-md-4"><label className="form-label">Updated By</label><input className="form-control" value={core.updated_by} onChange={(e) => setCore((c) => ({ ...c, updated_by: e.target.value }))} /></div>
              <div className="col-12"><label className="form-label">Intro Text</label><textarea className="form-control" rows={2} value={core.intro_text} onChange={(e) => setCore((c) => ({ ...c, intro_text: e.target.value }))} /></div>
              <div className="col-12"><div className="form-check"><input type="checkbox" className="form-check-input" checked={core.isactive} onChange={(e) => setCore((c) => ({ ...c, isactive: e.target.checked }))} id="headerActive" /><label className="form-check-label" htmlFor="headerActive">Active</label></div></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={saving}>{saving ? "Saving..." : headerId ? "Update Page" : "Create Page & Continue"}</button>
              {headerId && <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCoreModal(false)}>Cancel</button>}
            </div>
          </form>
        </Modal>
      )}

      {!headerId && !showCoreModal && <div className="alert alert-info">Save the page first — sections unlock automatically once it's created.</div>}

      {headerId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Sections</h5>
              <button className="btn btn-dark btn-sm" onClick={openNewSection}>+ Add Section</button>
            </div>
            <div className="accordion">
              {sections.length === 0 ? <div className="alert alert-light">No sections yet.</div> :
                sections.map((s) => (
                  <div className="accordion-item" key={s.id}>
                    <h2 className="accordion-header d-flex justify-content-between align-items-center px-3 py-2 bg-light">
                      <span className="fw-semibold">{s.section_title} <small className="text-muted">(Order: {s.section_order})</small></span>
                      <div className="d-flex align-items-center gap-2">
                        <ActiveToggle active={!!s.is_active} onToggle={(next) => toggleSectionActive(s, next)} />
                        <button className="btn btn-sm btn-outline-dark me-1" onClick={() => openEditSection(s)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteSection(s)}>Delete</button>
                      </div>
                    </h2>
                    <div className="accordion-body">
                      <div dangerouslySetInnerHTML={{ __html: s.content }} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {showSectionModal && (
        <Modal title={editingSection ? "Edit Section" : "Add Section"} onClose={() => setShowSectionModal(false)} size="lg">
          <form onSubmit={submitSection}>
            <div className="row g-3">
              <div className="col-md-8"><label className="form-label">Section Title *</label><input className="form-control" value={sectionForm.section_title} onChange={(e) => setSectionForm((s) => ({ ...s, section_title: e.target.value }))} required /></div>
              <div className="col-md-4"><label className="form-label">Order</label><input type="number" className="form-control" value={sectionForm.section_order} onChange={(e) => setSectionForm((s) => ({ ...s, section_order: e.target.value }))} /></div>
              <div className="col-12"><label className="form-label">Content * (HTML allowed)</label><textarea className="form-control" rows={6} value={sectionForm.content} onChange={(e) => setSectionForm((s) => ({ ...s, content: e.target.value }))} required /></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark">{editingSection ? "Update" : "Add"}</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowSectionModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminLegalPagesPage;
