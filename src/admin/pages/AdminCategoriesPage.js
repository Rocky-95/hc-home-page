import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import authService from "../../services/authService";

const RCU = "ADMIN_PORTAL";

const emptyCategory = {
  menu_category_name: "",
  menu_category_slug: "",
  menu_category_image_url: "",
  display_order: 1,
  isactive: true,
};

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyCategory);
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

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const r = await api.get("/Menu-Category");
      setCategories(r.data?.data || r.data || []);
    } catch {
      setCategories([]);
      flash("Failed to load categories.", true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "CATEGORY_IMAGE");
      const res = await authService.uploadFile(fd);
      const url = res.data?.url || res.data?.data?.url || res.data?.fileUrl || "";
      setForm((prev) => ({ ...prev, menu_category_image_url: url || URL.createObjectURL(file) }));
      flash(url ? "Image uploaded." : "Upload done (using preview URL).");
    } catch {
      flash("Upload failed. Using local preview.", true);
      setForm((prev) => ({ ...prev, menu_category_image_url: URL.createObjectURL(file) }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        display_order: parseInt(form.display_order) || 1,
        isactive: form.isactive ? 1 : 0,
      };
      if (editing) {
        await api.put("/Menu-Category", { ...payload, menu_category_id: editing.menu_category_id, luu: RCU });
        flash("Category updated.");
      } else {
        await api.post("/Menu-Category", { ...payload, rcu: RCU });
        flash("Category created.");
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyCategory);
      fetchCategories();
    } catch (err) {
      flash(err.response?.data?.message || "Failed to save category.", true);
    }
  };

  const handleDelete = async (c) => {
    if (!window.confirm(`Delete "${c.menu_category_name}"?`)) return;
    try {
      await api.delete("/Menu-Category", { data: { menu_category_id: c.menu_category_id, luu: RCU } });
      flash("Category deleted.");
      fetchCategories();
    } catch (err) {
      flash(err.response?.data?.message || "Delete failed.", true);
    }
  };

  const startEdit = (c) => {
    setEditing(c);
    setForm({
      menu_category_name: c.menu_category_name || "",
      menu_category_slug: c.menu_category_slug || "",
      menu_category_image_url: c.menu_category_image_url || "",
      display_order: c.display_order || 1,
      isactive: c.isactive !== false && c.isactive !== 0,
    });
    setShowForm(true);
  };

  const filtered = categories.filter((c) =>
    c.menu_category_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.menu_category_slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-4">Category Management</h3>
      {message.text && <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} py-2`}>{message.text}</div>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input className="form-control w-auto" placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
        <button className="btn btn-dark" onClick={() => { setShowForm(true); setEditing(null); setForm(emptyCategory); }}>
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>{editing ? "Edit Category" : "New Category"}</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Category Name *</label>
                  <input className="form-control" value={form.menu_category_name} onChange={(e) => setForm((p) => ({ ...p, menu_category_name: e.target.value }))} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Slug</label>
                  <input className="form-control" value={form.menu_category_slug} onChange={(e) => setForm((p) => ({ ...p, menu_category_slug: e.target.value }))} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Display Order</label>
                  <input type="number" className="form-control" value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: e.target.value }))} />
                </div>
                <div className="col-md-3 d-flex align-items-end">
                  <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" checked={form.isactive} onChange={(e) => setForm((p) => ({ ...p, isactive: e.target.checked }))} id="catActive" />
                    <label className="form-check-label" htmlFor="catActive">Active</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Upload Image</label>
                  <input type="file" accept="image/*" className="form-control" onChange={handleFileUpload} disabled={uploading} />
                  {uploading && <div className="form-text">Uploading...</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Or Enter Image URL</label>
                  <input className="form-control" value={form.menu_category_image_url} onChange={(e) => setForm((p) => ({ ...p, menu_category_image_url: e.target.value }))} placeholder="https://..." />
                </div>
                {form.menu_category_image_url && (
                  <div className="col-12">
                    <img src={form.menu_category_image_url} alt="preview" style={{ height: 80, objectFit: "cover", borderRadius: 6 }} onError={(e) => (e.target.style.display = "none")} />
                  </div>
                )}
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-dark">{editing ? "Update" : "Create"} Category</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyCategory); }}>Cancel</button>
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
              <tr><th>Name</th><th>Slug</th><th>Order</th><th>Active</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted">No categories found.</td></tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.menu_category_id}>
                    <td>
                      <strong>{c.menu_category_name}</strong>
                      {c.menu_category_image_url && <br />}
                      {c.menu_category_image_url && <img src={c.menu_category_image_url} alt="" style={{ height: 40, objectFit: "cover", borderRadius: 4 }} onError={(e) => (e.target.style.display = "none")} />}
                    </td>
                    <td><code>{c.menu_category_slug}</code></td>
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

export default AdminCategoriesPage;
