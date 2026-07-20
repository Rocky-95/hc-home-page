import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const RCU = "ADMIN_PORTAL";

const emptyHeader = {
  page_type: "",
  page_title: "",
  intro_text: "",
  effective_date: "",
  isactive: true,
};

const emptySection = {
  page_type: "",
  section_title: "",
  content: "",
  section_order: 1,
  isactive: true,
};

const AdminLegalPagesPage = () => {
  const [headers, setHeaders] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [headerForm, setHeaderForm] = useState(emptyHeader);
  const [sectionForm, setSectionForm] = useState(emptySection);
  const [editingHeader, setEditingHeader] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [showHeaderForm, setShowHeaderForm] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", isError: false });

  const flash = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: "", isError: false }), 4000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [headersRes, sectionsRes] = await Promise.all([
        api.get("/Legal-Page-Headers"),
        api.get("/Legal-Page-Sections"),
      ]);
      const h = headersRes.data?.data || headersRes.data || [];
      const s = sectionsRes.data?.data || sectionsRes.data || [];
      setHeaders(h);
      setSections(s);
      if (h.length > 0 && !selectedHeader) {
        setSelectedHeader(h[0]);
      }
    } catch {
      flash("Failed to load legal pages.", true);
    } finally {
      setLoading(false);
    }
  }, [selectedHeader]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredSections = selectedHeader
    ? sections
        .filter((s) => s.page_type?.toLowerCase() === selectedHeader.page_type?.toLowerCase())
        .sort((a, b) => (a.section_order || 0) - (b.section_order || 0))
    : [];

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...headerForm,
        isactive: headerForm.isactive ? 1 : 0,
      };
      if (editingHeader) {
        const idField = editingHeader.legal_page_header_id ? "legal_page_header_id" : "id";
        await api.put("/Legal-Page-Headers", { ...payload, [idField]: editingHeader[idField], luu: RCU });
        flash("Page header updated.");
      } else {
        await api.post("/Legal-Page-Headers", { ...payload, rcu: RCU });
        flash("Page header created.");
      }
      setShowHeaderForm(false);
      setEditingHeader(null);
      setHeaderForm(emptyHeader);
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Failed to save header.", true);
    }
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHeader) return;
    try {
      const payload = {
        ...sectionForm,
        page_type: selectedHeader.page_type,
        section_order: parseInt(sectionForm.section_order) || 1,
        isactive: sectionForm.isactive ? 1 : 0,
      };
      if (editingSection) {
        const idField = editingSection.legal_page_section_id ? "legal_page_section_id" : "id";
        await api.put("/Legal-Page-Sections", { ...payload, [idField]: editingSection[idField], luu: RCU });
        flash("Section updated.");
      } else {
        await api.post("/Legal-Page-Sections", { ...payload, rcu: RCU });
        flash("Section created.");
      }
      setShowSectionForm(false);
      setEditingSection(null);
      setSectionForm(emptySection);
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Failed to save section.", true);
    }
  };

  const handleDeleteHeader = async (h) => {
    if (!window.confirm(`Delete "${h.page_title}"? All its sections will remain but may be orphaned.`)) return;
    try {
      const idField = h.legal_page_header_id ? "legal_page_header_id" : "id";
      await api.delete("/Legal-Page-Headers", { data: { [idField]: h[idField], luu: RCU } });
      flash("Header deleted.");
      if (selectedHeader?.[idField] === h[idField]) setSelectedHeader(null);
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Delete failed.", true);
    }
  };

  const handleDeleteSection = async (s) => {
    if (!window.confirm(`Delete "${s.section_title}"?`)) return;
    try {
      const idField = s.legal_page_section_id ? "legal_page_section_id" : "id";
      await api.delete("/Legal-Page-Sections", { data: { [idField]: s[idField], luu: RCU } });
      flash("Section deleted.");
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Delete failed.", true);
    }
  };

  const startEditHeader = (h) => {
    setEditingHeader(h);
    setHeaderForm({
      page_type: h.page_type || "",
      page_title: h.page_title || "",
      intro_text: h.intro_text || "",
      effective_date: h.effective_date ? h.effective_date.split("T")[0] : "",
      isactive: h.isactive !== false && h.isactive !== 0,
    });
    setShowHeaderForm(true);
  };

  const startEditSection = (s) => {
    setEditingSection(s);
    setSectionForm({
      page_type: s.page_type || "",
      section_title: s.section_title || "",
      content: s.content || "",
      section_order: s.section_order || 1,
      isactive: s.isactive !== false && s.isactive !== 0,
    });
    setShowSectionForm(true);
  };

  const startNewSection = () => {
    if (!selectedHeader) return;
    setEditingSection(null);
    setSectionForm({
      ...emptySection,
      page_type: selectedHeader.page_type,
    });
    setShowSectionForm(true);
  };

  return (
    <div>
      <h3 className="mb-4">Legal Pages Management</h3>
      {message.text && <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} py-2`}>{message.text}</div>}

      {loading ? (
        <div className="text-center py-4"><div className="spinner-border" /></div>
      ) : (
        <div className="row g-4">
          {/* Headers */}
          <div className="col-lg-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Page Headers</h5>
              <button className="btn btn-dark btn-sm" onClick={() => { setShowHeaderForm(true); setEditingHeader(null); setHeaderForm(emptyHeader); }}>+ Add</button>
            </div>

            {showHeaderForm && (
              <div className="card mb-3">
                <div className="card-body">
                  <h6>{editingHeader ? "Edit Header" : "New Header"}</h6>
                  <form onSubmit={handleHeaderSubmit}>
                    <div className="mb-2">
                      <label className="form-label">Page Type *</label>
                      <input className="form-control" value={headerForm.page_type} onChange={(e) => setHeaderForm((p) => ({ ...p, page_type: e.target.value }))} placeholder="e.g., privacy, terms" required />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Page Title *</label>
                      <input className="form-control" value={headerForm.page_title} onChange={(e) => setHeaderForm((p) => ({ ...p, page_title: e.target.value }))} required />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Intro Text</label>
                      <textarea className="form-control" rows={2} value={headerForm.intro_text} onChange={(e) => setHeaderForm((p) => ({ ...p, intro_text: e.target.value }))} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Effective Date</label>
                      <input type="date" className="form-control" value={headerForm.effective_date} onChange={(e) => setHeaderForm((p) => ({ ...p, effective_date: e.target.value }))} />
                    </div>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" checked={headerForm.isactive} onChange={(e) => setHeaderForm((p) => ({ ...p, isactive: e.target.checked }))} id="headerActive" />
                      <label className="form-check-label" htmlFor="headerActive">Active</label>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-dark btn-sm">{editingHeader ? "Update" : "Create"}</button>
                      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { setShowHeaderForm(false); setEditingHeader(null); setHeaderForm(emptyHeader); }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="list-group">
              {headers.length === 0 ? (
                <div className="list-group-item text-muted">No headers found.</div>
              ) : (
                headers.map((h) => (
                  <button
                    key={h.legal_page_header_id || h.id}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${selectedHeader?.page_type === h.page_type ? "active" : ""}`}
                    onClick={() => setSelectedHeader(h)}
                  >
                    <div>
                      <div className="fw-bold">{h.page_title}</div>
                      <small>{h.page_type} {h.isactive ? "• Active" : "• Inactive"}</small>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-outline-light me-1" onClick={(e) => { e.stopPropagation(); startEditHeader(h); }}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); handleDeleteHeader(h); }}>Delete</button>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Sections */}
          <div className="col-lg-7">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                Sections {selectedHeader && <span className="text-muted">— {selectedHeader.page_title}</span>}
              </h5>
              <button className="btn btn-dark btn-sm" onClick={startNewSection} disabled={!selectedHeader}>+ Add Section</button>
            </div>

            {!selectedHeader && <div className="alert alert-info">Select a page header to manage its sections.</div>}

            {showSectionForm && selectedHeader && (
              <div className="card mb-3">
                <div className="card-body">
                  <h6>{editingSection ? "Edit Section" : "New Section"}</h6>
                  <form onSubmit={handleSectionSubmit}>
                    <div className="mb-2">
                      <label className="form-label">Section Title *</label>
                      <input className="form-control" value={sectionForm.section_title} onChange={(e) => setSectionForm((p) => ({ ...p, section_title: e.target.value }))} required />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Content *</label>
                      <textarea className="form-control" rows={6} value={sectionForm.content} onChange={(e) => setSectionForm((p) => ({ ...p, content: e.target.value }))} required />
                      <div className="form-text">HTML is allowed.</div>
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Order</label>
                      <input type="number" className="form-control" value={sectionForm.section_order} onChange={(e) => setSectionForm((p) => ({ ...p, section_order: e.target.value }))} />
                    </div>
                    <div className="form-check mb-2">
                      <input type="checkbox" className="form-check-input" checked={sectionForm.isactive} onChange={(e) => setSectionForm((p) => ({ ...p, isactive: e.target.checked }))} id="sectionActive" />
                      <label className="form-check-label" htmlFor="sectionActive">Active</label>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-dark btn-sm">{editingSection ? "Update" : "Create"}</button>
                      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { setShowSectionForm(false); setEditingSection(null); setSectionForm(emptySection); }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="accordion">
              {filteredSections.length === 0 ? (
                <div className="alert alert-light">No sections for this page.</div>
              ) : (
                filteredSections.map((s) => (
                  <div className="accordion-item" key={s.legal_page_section_id || s.id}>
                    <h2 className="accordion-header d-flex justify-content-between align-items-center px-3 py-2 bg-light">
                      <span className="fw-semibold">{s.section_title} <small className="text-muted">(Order: {s.section_order})</small></span>
                      <div>
                        <button className="btn btn-sm btn-outline-dark me-1" onClick={() => startEditSection(s)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteSection(s)}>Delete</button>
                      </div>
                    </h2>
                    <div className="accordion-body">
                      <div dangerouslySetInnerHTML={{ __html: s.content }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLegalPagesPage;
