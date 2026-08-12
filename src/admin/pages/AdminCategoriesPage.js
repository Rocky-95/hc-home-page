import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../services/apiClient";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";
import ActiveToggle from "../components/ActiveToggle";

const RCU = "ADMIN_PORTAL";
const unwrap = (res) => res.data?.data || res.data || [];

const emptyCategory = { menu_category_name: "", menu_category_slug: "", display_order: 1, isactive: true };
const emptySubCategory = { menu_subcategory_name: "", menu_subcategory_slug: "", redirect_link: "", display_order: 1, isactive: true };

// Categories own Subcategories. Previously these were two separate pages, and creating
// a subcategory meant picking its parent category from a dropdown by hand. Now: click a
// category row, and its subcategories are managed directly underneath it — no dropdown,
// no ID, the parent is just whichever category you already opened.
const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [workspace, setWorkspace] = useState(null);
  const toast = useToast();
  const confirm = useConfirm();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try { setCategories(unwrap(await apiClient.get("/Menu-Category"))); }
    catch { setCategories([]); toast.error("Failed to load categories."); }
    finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const openNew = () => setWorkspace({ ...emptyCategory, menu_category_id: null });
  const openEdit = (c) => setWorkspace({ ...c });
  const closeWorkspace = () => { setWorkspace(null); fetchCategories(); };

  const toggleCategoryActive = async (c, nextActive) => {
    try {
      await apiClient.put("/Menu-Category", { menu_category_id: c.menu_category_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Category ${nextActive ? "activated" : "deactivated"}.`);
      fetchCategories();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  const filtered = categories.filter((c) =>
    c.menu_category_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.menu_category_slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-4">Categories &amp; Subcategories</h3>

      {!workspace && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input className="form-control w-auto" placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
            <button className="btn btn-dark" onClick={openNew}>+ Add Category</button>
          </div>
          {loading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
            <table className="table table-hover align-middle">
              <thead className="table-dark"><tr><th>Name</th><th>Slug</th><th>Order</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 ? <tr><td colSpan={5} className="text-center text-muted">No categories found.</td></tr> :
                  filtered.map((c) => (
                    <tr key={c.menu_category_id}>
                      <td><strong>{c.menu_category_name}</strong></td>
                      <td><code>{c.menu_category_slug}</code></td>
                      <td>{c.display_order}</td>
                      <td><ActiveToggle active={!!c.isactive} onToggle={(next) => toggleCategoryActive(c, next)} /></td>
                      <td><button className="btn btn-sm btn-outline-dark" onClick={() => openEdit(c)}>Open</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {workspace && <CategoryWorkspace category={workspace} onClose={closeWorkspace} toast={toast} confirm={confirm} />}
    </div>
  );
};

const CategoryWorkspace = ({ category, onClose, toast, confirm }) => {
  const [core, setCore] = useState({
    menu_category_name: category.menu_category_name || "",
    menu_category_slug: category.menu_category_slug || "",
    display_order: category.display_order || 1,
    isactive: category.isactive !== false,
  });
  const [categoryId, setCategoryId] = useState(category.menu_category_id || null);
  const [saving, setSaving] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(!categoryId);

  const [subs, setSubs] = useState([]);
  const [subForm, setSubForm] = useState(emptySubCategory);
  const [editingSub, setEditingSub] = useState(null);
  const [showSubModal, setShowSubModal] = useState(false);

  const loadSubs = useCallback(async (id) => {
    if (!id) return;
    try {
      const all = unwrap(await apiClient.get("/Menu-Sub-Category"));
      setSubs(Array.isArray(all) ? all.filter((s) => s.menu_category_id === id) : []);
    } catch { setSubs([]); }
  }, []);

  useEffect(() => { if (categoryId) loadSubs(categoryId); }, [categoryId, loadSubs]);

  const saveCore = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...core, display_order: parseInt(core.display_order) || 1, isactive: core.isactive ? 1 : 0 };
      if (categoryId) {
        await apiClient.put("/Menu-Category", { ...payload, menu_category_id: categoryId, luu: RCU });
        toast.success("Category updated.");
      } else {
        const res = await apiClient.post("/Menu-Category", { ...payload, rcu: RCU });
        const newId = res.data?.data?.menu_category_id || res.data?.menu_category_id;
        if (!newId) throw new Error("Category created but no id was returned.");
        setCategoryId(newId);
        setShowCoreModal(false);
        toast.success("Category created — now add subcategories below.");
      }
      setShowCoreModal(false);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save category."); }
    finally { setSaving(false); }
  };

  const openNewSub = () => { setEditingSub(null); setSubForm(emptySubCategory); setShowSubModal(true); };
  const openEditSub = (s) => { setEditingSub(s); setSubForm({ menu_subcategory_name: s.menu_subcategory_name, menu_subcategory_slug: s.menu_subcategory_slug || "", redirect_link: s.redirect_link || "", display_order: s.display_order || 1, isactive: s.isactive !== false }); setShowSubModal(true); };

  const submitSub = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...subForm, menu_category_id: categoryId, display_order: parseInt(subForm.display_order) || 1, isactive: subForm.isactive ? 1 : 0 };
      if (editingSub) {
        await apiClient.put("/Menu-Sub-Category", { ...payload, menu_subcategory_id: editingSub.menu_subcategory_id, luu: RCU });
        toast.success("Subcategory updated.");
      } else {
        await apiClient.post("/Menu-Sub-Category", { ...payload, rcu: RCU });
        toast.success("Subcategory added.");
      }
      setShowSubModal(false); setEditingSub(null); setSubForm(emptySubCategory); loadSubs(categoryId);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save subcategory."); }
  };
  const deleteSub = async (s) => {
    const ok = await confirm({ title: `Delete "${s.menu_subcategory_name}"?`, message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Menu-Sub-Category", { data: { menu_subcategory_id: s.menu_subcategory_id, luu: RCU } }); toast.success("Subcategory deleted."); loadSubs(categoryId); }
    catch { toast.error("Delete failed."); }
  };
  const toggleSubActive = async (s, nextActive) => {
    try {
      await apiClient.put("/Menu-Sub-Category", { menu_subcategory_id: s.menu_subcategory_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Subcategory ${nextActive ? "activated" : "deactivated"}.`);
      loadSubs(categoryId);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  return (
    <div>
      <button className="btn btn-link px-0 mb-3" onClick={onClose}>&larr; Back to Categories</button>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">{core.menu_category_name || "New Category"}</h5>
            <div className="text-muted small">{core.menu_category_slug}</div>
          </div>
          {categoryId && <button className="btn btn-outline-dark btn-sm" onClick={() => setShowCoreModal(true)}>Edit Details</button>}
        </div>
      </div>

      {showCoreModal && (
        <Modal title={categoryId ? "Edit Category" : "New Category"} onClose={() => { if (categoryId) setShowCoreModal(false); }}>
          <form onSubmit={saveCore}>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Category Name *</label><input className="form-control" value={core.menu_category_name} onChange={(e) => setCore((c) => ({ ...c, menu_category_name: e.target.value }))} required /></div>
              <div className="col-md-6"><label className="form-label">Slug</label><input className="form-control" value={core.menu_category_slug} onChange={(e) => setCore((c) => ({ ...c, menu_category_slug: e.target.value }))} /></div>
              <div className="col-md-3"><label className="form-label">Display Order</label><input type="number" className="form-control" value={core.display_order} onChange={(e) => setCore((c) => ({ ...c, display_order: e.target.value }))} /></div>
              <div className="col-md-3 d-flex align-items-end"><div className="form-check mb-2"><input type="checkbox" className="form-check-input" checked={core.isactive} onChange={(e) => setCore((c) => ({ ...c, isactive: e.target.checked }))} id="catActive" /><label className="form-check-label" htmlFor="catActive">Active</label></div></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={saving}>{saving ? "Saving..." : categoryId ? "Update Category" : "Create Category & Continue"}</button>
              {categoryId && <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCoreModal(false)}>Cancel</button>}
            </div>
          </form>
        </Modal>
      )}

      {!categoryId && !showCoreModal && <div className="alert alert-info">Save the category first — subcategories unlock automatically once it's created.</div>}

      {categoryId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Subcategories</h5>
              <button className="btn btn-dark btn-sm" onClick={openNewSub}>+ Add Subcategory</button>
            </div>
            <table className="table table-sm table-bordered align-middle mb-0">
              <thead className="table-light"><tr><th>Name</th><th>Slug</th><th>Order</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {subs.length === 0 ? <tr><td colSpan={5} className="text-center text-muted">No subcategories yet.</td></tr> :
                  subs.map((s) => (
                    <tr key={s.menu_subcategory_id}>
                      <td>{s.menu_subcategory_name}</td><td><code>{s.menu_subcategory_slug}</code></td><td>{s.display_order}</td>
                      <td><ActiveToggle active={!!s.isactive} onToggle={(next) => toggleSubActive(s, next)} /></td>
                      <td>
                        <button className="btn btn-sm btn-outline-dark me-1" onClick={() => openEditSub(s)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteSub(s)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showSubModal && (
        <Modal title={editingSub ? "Edit Subcategory" : "Add Subcategory"} onClose={() => setShowSubModal(false)}>
          <form onSubmit={submitSub}>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Name *</label><input className="form-control" value={subForm.menu_subcategory_name} onChange={(e) => setSubForm((s) => ({ ...s, menu_subcategory_name: e.target.value }))} required /></div>
              <div className="col-md-6"><label className="form-label">Slug</label><input className="form-control" value={subForm.menu_subcategory_slug} onChange={(e) => setSubForm((s) => ({ ...s, menu_subcategory_slug: e.target.value }))} /></div>
              <div className="col-md-8"><label className="form-label">Redirect Link</label><input className="form-control" value={subForm.redirect_link} onChange={(e) => setSubForm((s) => ({ ...s, redirect_link: e.target.value }))} /></div>
              <div className="col-md-4"><label className="form-label">Order</label><input type="number" className="form-control" value={subForm.display_order} onChange={(e) => setSubForm((s) => ({ ...s, display_order: e.target.value }))} /></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark">{editingSub ? "Update" : "Add"}</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowSubModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
