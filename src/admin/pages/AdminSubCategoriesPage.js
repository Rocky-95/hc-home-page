import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import authService from "../../services/authService";

const RCU = "ADMIN_PORTAL";

const emptySubCategory = {
  menu_subcategory_name: "",
  menu_subcategory_slug: "",
  menu_category_id: "",
  menu_subcategory_image_url: "",
  redirect_link: "",
  display_order: 1,
  isactive: true,
};

const AdminSubCategoriesPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptySubCategory);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  const flash = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: "", isError: false }), 4000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [subRes, catRes] = await Promise.all([
        api.get("/Menu-Sub-Category"),
        api.get("/Menu-Category"),
      ]);
      setSubCategories(subRes.data?.data || subRes.data || []);
      setCategories(catRes.data?.data || catRes.data || []);
    } catch {
      flash("Failed to load data.", true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "SUBCATEGORY_IMAGE");
      const res = await authService.uploadFile(fd);
      const url = res.data?.url || res.data?.data?.url || res.data?.fileUrl || "";
      setForm((prev) => ({ ...prev, menu_subcategory_image_url: url || URL.createObjectURL(file) }));
      flash(url ? "Image uploaded." : "Upload done (using preview URL).");
    } catch {
      flash("Upload failed. Using local preview.", true);
      setForm((prev) => ({ ...prev, menu_subcategory_image_url: URL.createObjectURL(file) }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.menu_category_id) {
      flash("Please select a category.", true);
      return;
    }
    try {
      const payload = {
        ...form,
        menu_category_id: form.menu_category_id,
        display_order: parseInt(form.display_order) || 1,
        isactive: form.isactive ? 1 : 0,
      };
      if (editing) {
        await api.put("/Menu-Sub-Category", { ...payload, menu_subcategory_id: editing.menu_subcategory_id, luu: RCU });
        flash("Subcategory updated.");
      } else {
        await api.post("/Menu-Sub-Category", { ...payload, rcu: RCU });
        flash("Subcategory created.");
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptySubCategory);
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Failed to save subcategory.", true);
    }
  };

  const handleDelete = async (s) => {
    if (!window.confirm(`Delete "${s.menu_subcategory_name}"?`)) return;
    try {
      await api.delete("/Menu-Sub-Category", { data: { menu_subcategory_id: s.menu_subcategory_id, luu: RCU } });
      flash("Subcategory deleted.");
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Delete failed.", true);
    }
  };

  const startEdit = (s) => {
    setEditing(s);
    setForm({
      menu_subcategory_name: s.menu_subcategory_name || "",
      menu_subcategory_slug: s.menu_subcategory_slug || "",
      menu_category_id: s.menu_category_id || "",
      menu_subcategory_image_url: s.menu_subcategory_image_url || "",
      redirect_link: s.redirect_link || "",
      display_order: s.display_order || 1,
      isactive: s.isactive !== false && s.isactive !== 0,
    });
    setShowForm(true);
  };

  const getCategoryName = (id) => categories.find((c) => c.menu_category_id === id)?.menu_category_name || id;

  const filtered = subCategories.filter((s) =>
    s.menu_subcategory_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.menu_subcategory_slug?.toLowerCase().includes(search.toLowerCase()) ||
    getCategoryName(s.menu_category_id).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-4">Subcategory Management</h3>
      {message.text && <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} py-2`}>{message.text}</div>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input className="form-control w-auto" placeholder="Search subcategories..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
        <button className="btn btn-dark" onClick={() => { setShowForm(true); setEditing(null); setForm(emptySubCategory); }}>
          + Add Subcategory
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>{editing ? "Edit Subcategory" : "New Subcategory"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Subcategory Name *</label>
                  <input className="form-control" value={form.menu_subcategory_name} onChange={(e) => setForm((p) => ({ ...p, menu_subcategory_name: e.target.value }))} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Slug</label>
                  <input className="form-control" value={form.menu_subcategory_slug} onChange={(e) => setForm((p) => ({ ...p, menu_subcategory_slug: e.target.value }))} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Parent Category *</label>
                  <select className="form-select" value={form.menu_category_id} onChange={(e) => setForm((p) => ({ ...p, menu_category_id: e.target.value }))} required>
                    <option value="">-- Select Category --</option>
                    {categories.map((c) => (
                      <option key={c.menu_category_id} value={c.menu_category_id}>{c.menu_category_name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Redirect Link</label>
                  <input className="form-control" value={form.redirect_link} onChange={(e) => setForm((p) => ({ ...p, redirect_link: e.target.value }))} placeholder="/..." />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Display Order</label>
                  <input type="number" className="form-control" value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: e.target.value }))} />
                </div>
                <div className="col-md-3 d-flex align-items-end">
                  <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" checked={form.isactive} onChange={(e) => setForm((p) => ({ ...p, isactive: e.target.checked }))} id="subCatActive" />
                    <label className="form-check-label" htmlFor="subCatActive">Active</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Upload Image</label>
                  <input type="file" accept="image/*" className="form-control" onChange={handleFileUpload} disabled={uploading} />
                  {uploading && <div className="form-text">Uploading...</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Or Enter Image URL</label>
                  <input className="form-control" value={form.menu_subcategory_image_url} onChange={(e) => setForm((p) => ({ ...p, menu_subcategory_image_url: e.target.value }))} placeholder="https://..." />
                </div>
                {form.menu_subcategory_image_url && (
                  <div className="col-12">
                    <img src={form.menu_subcategory_image_url} alt="preview" style={{ height: 80, objectFit: "cover", borderRadius: 6 }} onError={(e) => (e.target.style.display = "none")} />
                  </div>
                )}
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-dark">{editing ? "Update" : "Create"} Subcategory</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowForm(false); setEditing(null); setForm(emptySubCategory); }}>Cancel</button>
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
              <tr><th>Name</th><th>Slug</th><th>Category</th><th>Order</th><th>Active</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted">No subcategories found.</td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.menu_subcategory_id}>
                    <td>
                      <strong>{s.menu_subcategory_name}</strong>
                      {s.menu_subcategory_image_url && <br />}
                      {s.menu_subcategory_image_url && <img src={s.menu_subcategory_image_url} alt="" style={{ height: 40, objectFit: "cover", borderRadius: 4 }} onError={(e) => (e.target.style.display = "none")} />}
                    </td>
                    <td><code>{s.menu_subcategory_slug}</code></td>
                    <td>{getCategoryName(s.menu_category_id)}</td>
                    <td>{s.display_order}</td>
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

export default AdminSubCategoriesPage;
