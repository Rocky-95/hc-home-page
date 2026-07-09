import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../services/apiClient";
import authService from "../../services/authService";

const TABS = ["Products", "Media", "Sizes", "Cloth Types", "Care Instructions", "SEO"];

const emptyProduct = {
  product_name: "",
  product_slug: "",
  short_description: "",
  description: "",
  base_price: "",
  currency_code: "INR",
  isactive: true,
};

const emptyMedia = {
  product_id: "",
  media_type: "image",
  media_url: "",
  alt_text: "",
  display_order: 1,
  isprimary: false,
};

const emptySize = { size_name: "", size_type: "alpha", display_order: 1 };
const emptyCloth = { cloth_type_name: "", cloth_type_slug: "", description: "", display_order: 1 };
const emptyCare = { instruction_text: "", display_order: 1 };
const emptySeo = { product_id: "", seo_title: "", seo_description: "", seo_keywords: "", og_image_url: "" };

const RCU = "ADMIN_PORTAL";

const AdminProductsPage = () => {
  const [activeTab, setActiveTab] = useState("Products");

  // ── Products ──────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productLoading, setProductLoading] = useState(true);

  // ── Media ─────────────────────────────────────────────────
  const [mediaList, setMediaList] = useState([]);
  const [mediaForm, setMediaForm] = useState(emptyMedia);
  const [editingMedia, setEditingMedia] = useState(null);
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // ── Sizes ─────────────────────────────────────────────────
  const [sizes, setSizes] = useState([]);
  const [sizeForm, setSizeForm] = useState(emptySize);
  const [editingSize, setEditingSize] = useState(null);
  const [sizeLoading, setSizeLoading] = useState(true);

  // ── Cloth Types ────────────────────────────────────────────
  const [clothTypes, setClothTypes] = useState([]);
  const [clothForm, setClothForm] = useState(emptyCloth);
  const [editingCloth, setEditingCloth] = useState(null);
  const [clothLoading, setClothLoading] = useState(true);

  // ── Care Instructions ──────────────────────────────────────
  const [careList, setCareList] = useState([]);
  const [careForm, setCareForm] = useState(emptyCare);
  const [editingCare, setEditingCare] = useState(null);
  const [careLoading, setCareLoading] = useState(true);

  // ── SEO ────────────────────────────────────────────────────
  const [seoList, setSeoList] = useState([]);
  const [seoForm, setSeoForm] = useState(emptySeo);
  const [editingSeq, setEditingSeo] = useState(null);
  const [seoLoading, setSeoLoading] = useState(true);

  const [message, setMessage] = useState({ text: "", isError: false });
  const [search, setSearch] = useState("");

  const flash = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: "", isError: false }), 4000);
  };

  // ── Fetchers ───────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setProductLoading(true);
    try {
      const r = await apiClient.get("/Products");
      setProducts(r.data?.data || r.data || []);
    } catch { setProducts([]); } finally { setProductLoading(false); }
  }, []);

  const fetchMedia = useCallback(async () => {
    setMediaLoading(true);
    try {
      const r = await apiClient.get("/Products-Media");
      setMediaList(r.data?.data || r.data || []);
    } catch { setMediaList([]); } finally { setMediaLoading(false); }
  }, []);

  const fetchSizes = useCallback(async () => {
    setSizeLoading(true);
    try {
      const r = await apiClient.get("/Products-Sizes");
      setSizes(r.data?.data || r.data || []);
    } catch { setSizes([]); } finally { setSizeLoading(false); }
  }, []);

  const fetchClothTypes = useCallback(async () => {
    setClothLoading(true);
    try {
      const r = await apiClient.get("/Products-Cloth-Types");
      setClothTypes(r.data?.data || r.data || []);
    } catch { setClothTypes([]); } finally { setClothLoading(false); }
  }, []);

  const fetchCare = useCallback(async () => {
    setCareLoading(true);
    try {
      const r = await apiClient.get("/Products-Care-Instructions");
      setCareList(r.data?.data || r.data || []);
    } catch { setCareList([]); } finally { setCareLoading(false); }
  }, []);

  const fetchSeo = useCallback(async () => {
    setSeoLoading(true);
    try {
      const r = await apiClient.get("/Products-Seo");
      setSeoList(r.data?.data || r.data || []);
    } catch { setSeoList([]); } finally { setSeoLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(); fetchMedia(); fetchSizes(); fetchClothTypes(); fetchCare(); fetchSeo(); }, [fetchProducts, fetchMedia, fetchSizes, fetchClothTypes, fetchCare, fetchSeo]);

  // ── Product CRUD ───────────────────────────────────────────
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...productForm, base_price: parseFloat(productForm.base_price) || 0 };
      if (editingProduct) {
        await apiClient.put("/Products", { ...payload, product_id: editingProduct.product_id, luu: RCU });
        flash("Product updated.");
      } else {
        await apiClient.post("/Products", { ...payload, rcu: RCU });
        flash("Product created.");
      }
      setShowProductForm(false); setEditingProduct(null); setProductForm(emptyProduct);
      fetchProducts();
    } catch (err) { flash(err.response?.data?.message || "Failed to save product.", true); }
  };

  const handleProductDelete = async (p) => {
    if (!window.confirm(`Delete "${p.product_name}"?`)) return;
    try {
      await apiClient.delete("/Products", { data: { product_id: p.product_id, luu: RCU } });
      flash("Product deleted.");
      fetchProducts();
    } catch (err) { flash(err.response?.data?.message || "Delete failed.", true); }
  };

  const startEditProduct = (p) => {
    setEditingProduct(p);
    setProductForm({
      product_name: p.product_name || "",
      product_slug: p.product_slug || "",
      short_description: p.short_description || "",
      description: p.description || "",
      base_price: p.base_price || "",
      currency_code: p.currency_code || "INR",
      isactive: p.isactive !== false,
    });
    setShowProductForm(true);
  };

  // ── Media CRUD + File Upload ───────────────────────────────
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "PRODUCT_IMAGE");
      const res = await authService.uploadFile(fd);
      const url = res.data?.url || res.data?.data?.url || res.data?.fileUrl || "";
      setMediaForm((prev) => ({ ...prev, media_url: url || URL.createObjectURL(file) }));
      flash(url ? "Image uploaded." : "Upload done (using preview URL).");
    } catch { flash("Upload failed. Using local preview.", true); setMediaForm((prev) => ({ ...prev, media_url: URL.createObjectURL(file) })); }
    finally { setUploading(false); }
  };

  const handleMediaSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMedia) {
        await apiClient.put("/Products-Media", { ...mediaForm, product_media_id: editingMedia.product_media_id, luu: RCU });
        flash("Media updated.");
      } else {
        await apiClient.post("/Products-Media", { ...mediaForm, rcu: RCU });
        flash("Media added.");
      }
      setShowMediaForm(false); setEditingMedia(null); setMediaForm(emptyMedia);
      fetchMedia();
    } catch (err) { flash(err.response?.data?.message || "Failed to save media.", true); }
  };

  const handleMediaDelete = async (m) => {
    if (!window.confirm("Delete this media?")) return;
    try {
      await apiClient.delete("/Products-Media", { data: { product_media_id: m.product_media_id, luu: RCU } });
      flash("Media deleted."); fetchMedia();
    } catch (err) { flash("Delete failed.", true); }
  };

  // ── Sizes CRUD ─────────────────────────────────────────────
  const handleSizeSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSize) {
        await apiClient.put("/Products-Sizes", { ...sizeForm, size_id: editingSize.size_id, luu: RCU });
      } else {
        await apiClient.post("/Products-Sizes", { ...sizeForm, rcu: RCU });
      }
      flash(editingSize ? "Size updated." : "Size added.");
      setEditingSize(null); setSizeForm(emptySize); fetchSizes();
    } catch (err) { flash("Failed to save size.", true); }
  };

  const handleSizeDelete = async (s) => {
    if (!window.confirm(`Delete size "${s.size_name}"?`)) return;
    try { await apiClient.delete("/Products-Sizes", { data: { size_id: s.size_id, luu: RCU } }); flash("Deleted."); fetchSizes(); }
    catch { flash("Delete failed.", true); }
  };

  // ── Cloth Types CRUD ───────────────────────────────────────
  const handleClothSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCloth) {
        await apiClient.put("/Products-Cloth-Types", { ...clothForm, cloth_type_id: editingCloth.cloth_type_id, luu: RCU });
      } else {
        await apiClient.post("/Products-Cloth-Types", { ...clothForm, rcu: RCU });
      }
      flash(editingCloth ? "Cloth type updated." : "Cloth type added.");
      setEditingCloth(null); setClothForm(emptyCloth); fetchClothTypes();
    } catch { flash("Failed to save cloth type.", true); }
  };

  const handleClothDelete = async (c) => {
    if (!window.confirm(`Delete "${c.cloth_type_name}"?`)) return;
    try { await apiClient.delete("/Products-Cloth-Types", { data: { cloth_type_id: c.cloth_type_id, luu: RCU } }); flash("Deleted."); fetchClothTypes(); }
    catch { flash("Delete failed.", true); }
  };

  // ── Care Instructions CRUD ─────────────────────────────────
  const handleCareSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCare) {
        await apiClient.put("/Products-Care-Instructions", { ...careForm, care_instruction_id: editingCare.care_instruction_id, luu: RCU });
      } else {
        await apiClient.post("/Products-Care-Instructions", { ...careForm, rcu: RCU });
      }
      flash(editingCare ? "Instruction updated." : "Instruction added.");
      setEditingCare(null); setCareForm(emptyCare); fetchCare();
    } catch { flash("Failed.", true); }
  };

  const handleCareDelete = async (c) => {
    if (!window.confirm("Delete?")) return;
    try { await apiClient.delete("/Products-Care-Instructions", { data: { care_instruction_id: c.care_instruction_id, luu: RCU } }); flash("Deleted."); fetchCare(); }
    catch { flash("Delete failed.", true); }
  };

  // ── SEO CRUD ──────────────────────────────────────────────
  const handleSeoSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSeq) {
        await apiClient.put("/Products-Seo", { ...seoForm, product_seo_id: editingSeq.product_seo_id, luu: RCU });
      } else {
        await apiClient.post("/Products-Seo", { ...seoForm, rcu: RCU });
      }
      flash(editingSeq ? "SEO updated." : "SEO added.");
      setEditingSeo(null); setSeoForm(emptySeo); fetchSeo();
    } catch { flash("Failed.", true); }
  };

  const handleSeoDelete = async (s) => {
    if (!window.confirm("Delete SEO entry?")) return;
    try { await apiClient.delete("/Products-Seo", { data: { product_seo_id: s.product_seo_id, luu: RCU } }); flash("Deleted."); fetchSeo(); }
    catch { flash("Delete failed.", true); }
  };

  const filteredProducts = products.filter((p) =>
    p.product_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.product_slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="mb-4">Product Management</h3>
      {message.text && <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} py-2`}>{message.text}</div>}

      <ul className="nav nav-tabs mb-4">
        {TABS.map((t) => (
          <li className="nav-item" key={t}>
            <button className={`nav-link ${activeTab === t ? "active fw-semibold" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
          </li>
        ))}
      </ul>

      {/* ── PRODUCTS TAB ── */}
      {activeTab === "Products" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input className="form-control w-auto" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
            <button className="btn btn-dark" onClick={() => { setShowProductForm(true); setEditingProduct(null); setProductForm(emptyProduct); }}>+ Add Product</button>
          </div>

          {showProductForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5>{editingProduct ? "Edit Product" : "New Product"}</h5>
                <form onSubmit={handleProductSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6"><label className="form-label">Product Name *</label><input className="form-control" value={productForm.product_name} onChange={(e) => setProductForm((p) => ({ ...p, product_name: e.target.value }))} required /></div>
                    <div className="col-md-6"><label className="form-label">Slug</label><input className="form-control" value={productForm.product_slug} onChange={(e) => setProductForm((p) => ({ ...p, product_slug: e.target.value }))} /></div>
                    <div className="col-md-6"><label className="form-label">Price</label><input type="number" className="form-control" value={productForm.base_price} onChange={(e) => setProductForm((p) => ({ ...p, base_price: e.target.value }))} /></div>
                    <div className="col-md-3"><label className="form-label">Currency</label><select className="form-select" value={productForm.currency_code} onChange={(e) => setProductForm((p) => ({ ...p, currency_code: e.target.value }))}><option value="INR">INR</option><option value="USD">USD</option></select></div>
                    <div className="col-md-3 d-flex align-items-end"><div className="form-check mb-2"><input type="checkbox" className="form-check-input" checked={productForm.isactive} onChange={(e) => setProductForm((p) => ({ ...p, isactive: e.target.checked }))} id="prodActive" /><label className="form-check-label" htmlFor="prodActive">Active</label></div></div>
                    <div className="col-12"><label className="form-label">Short Description</label><input className="form-control" value={productForm.short_description} onChange={(e) => setProductForm((p) => ({ ...p, short_description: e.target.value }))} /></div>
                    <div className="col-12"><label className="form-label">Full Description</label><textarea className="form-control" rows={3} value={productForm.description} onChange={(e) => setProductForm((p) => ({ ...p, description: e.target.value }))} /></div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <button type="submit" className="btn btn-dark">{editingProduct ? "Update" : "Create"} Product</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowProductForm(false); setEditingProduct(null); }}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {productLoading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark"><tr><th>Name</th><th>Slug</th><th>Price</th><th>Currency</th><th>Active</th><th>Actions</th></tr></thead>
                <tbody>
                  {filteredProducts.length === 0 ? <tr><td colSpan={6} className="text-center text-muted">No products found.</td></tr> :
                    filteredProducts.map((p) => (
                      <tr key={p.product_id}>
                        <td><strong>{p.product_name}</strong><br /><small className="text-muted">{p.short_description}</small></td>
                        <td><code>{p.product_slug}</code></td>
                        <td>₹{p.base_price}</td>
                        <td>{(p.currency_code || "").toUpperCase()}</td>
                        <td><span className={`badge bg-${p.isactive ? "success" : "secondary"}`}>{p.isactive ? "Yes" : "No"}</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-dark me-1" onClick={() => startEditProduct(p)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleProductDelete(p)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── MEDIA TAB ── */}
      {activeTab === "Media" && (
        <div>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-dark" onClick={() => { setShowMediaForm(true); setEditingMedia(null); setMediaForm(emptyMedia); }}>+ Add Media</button>
          </div>
          {showMediaForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5>{editingMedia ? "Edit Media" : "Add Media"}</h5>
                <form onSubmit={handleMediaSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Product</label>
                      <select className="form-select" value={mediaForm.product_id} onChange={(e) => setMediaForm((m) => ({ ...m, product_id: e.target.value }))} required>
                        <option value="">-- Select Product --</option>
                        {products.map((p) => <option key={p.product_id} value={p.product_id}>{p.product_name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-3"><label className="form-label">Media Type</label><select className="form-select" value={mediaForm.media_type} onChange={(e) => setMediaForm((m) => ({ ...m, media_type: e.target.value }))}><option value="image">Image</option><option value="video">Video</option></select></div>
                    <div className="col-md-3 d-flex align-items-end"><div className="form-check mb-2"><input type="checkbox" className="form-check-input" checked={mediaForm.isprimary} onChange={(e) => setMediaForm((m) => ({ ...m, isprimary: e.target.checked }))} id="isPrimary" /><label className="form-check-label" htmlFor="isPrimary">Primary</label></div></div>
                    <div className="col-md-6">
                      <label className="form-label">Upload Image</label>
                      <input type="file" accept="image/*,video/*" className="form-control" onChange={handleFileUpload} disabled={uploading} />
                      {uploading && <div className="form-text">Uploading...</div>}
                    </div>
                    <div className="col-md-6"><label className="form-label">Or Enter URL</label><input className="form-control" value={mediaForm.media_url} onChange={(e) => setMediaForm((m) => ({ ...m, media_url: e.target.value }))} placeholder="https://..." /></div>
                    <div className="col-md-6"><label className="form-label">Alt Text</label><input className="form-control" value={mediaForm.alt_text} onChange={(e) => setMediaForm((m) => ({ ...m, alt_text: e.target.value }))} /></div>
                    <div className="col-md-3"><label className="form-label">Display Order</label><input type="number" className="form-control" value={mediaForm.display_order} onChange={(e) => setMediaForm((m) => ({ ...m, display_order: parseInt(e.target.value) || 1 }))} /></div>
                    {mediaForm.media_url && <div className="col-12"><img src={mediaForm.media_url} alt="preview" style={{ height: 80, objectFit: "cover", borderRadius: 6 }} onError={(e) => (e.target.style.display = "none")} /></div>}
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <button type="submit" className="btn btn-dark">{editingMedia ? "Update" : "Add"} Media</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowMediaForm(false); setEditingMedia(null); }}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {mediaLoading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
            <div className="row g-3">
              {mediaList.length === 0 ? <p className="text-muted">No media found.</p> :
                mediaList.map((m) => {
                  const prod = products.find((p) => p.product_id === m.product_id);
                  return (
                    <div key={m.product_media_id} className="col-md-3">
                      <div className="card h-100">
                        <img src={m.media_url} alt={m.alt_text || "media"} className="card-img-top" style={{ height: 140, objectFit: "cover" }} onError={(e) => { e.target.src = "https://via.placeholder.com/200x140?text=No+Image"; }} />
                        <div className="card-body p-2">
                          <small className="text-muted d-block">{prod?.product_name || m.product_id}</small>
                          <small>{m.alt_text}</small>
                          {m.isprimary && <span className="badge bg-warning text-dark ms-1">Primary</span>}
                        </div>
                        <div className="card-footer d-flex gap-1 p-2">
                          <button className="btn btn-sm btn-outline-dark flex-fill" onClick={() => { setEditingMedia(m); setMediaForm({ product_id: m.product_id, media_type: m.media_type, media_url: m.media_url, alt_text: m.alt_text || "", display_order: m.display_order || 1, isprimary: !!m.isprimary }); setShowMediaForm(true); }}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger flex-fill" onClick={() => handleMediaDelete(m)}>Del</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* ── SIZES TAB ── */}
      {activeTab === "Sizes" && (
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <h5>{editingSize ? "Edit Size" : "Add Size"}</h5>
              <form onSubmit={handleSizeSubmit}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-3"><label className="form-label">Size Name</label><input className="form-control" value={sizeForm.size_name} onChange={(e) => setSizeForm((s) => ({ ...s, size_name: e.target.value }))} required /></div>
                  <div className="col-md-3"><label className="form-label">Type</label><select className="form-select" value={sizeForm.size_type} onChange={(e) => setSizeForm((s) => ({ ...s, size_type: e.target.value }))}><option value="alpha">Alpha (S/M/L)</option><option value="numeric">Numeric (28/30)</option></select></div>
                  <div className="col-md-2"><label className="form-label">Order</label><input type="number" className="form-control" value={sizeForm.display_order} onChange={(e) => setSizeForm((s) => ({ ...s, display_order: parseInt(e.target.value) || 1 }))} /></div>
                  <div className="col-md-4 d-flex gap-2">
                    <button type="submit" className="btn btn-dark">{editingSize ? "Update" : "Add"}</button>
                    {editingSize && <button type="button" className="btn btn-outline-secondary" onClick={() => { setEditingSize(null); setSizeForm(emptySize); }}>Cancel</button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
          {sizeLoading ? <div className="spinner-border" /> : (
            <table className="table table-bordered align-middle">
              <thead className="table-dark"><tr><th>Name</th><th>Type</th><th>Order</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.size_id}>
                    <td>{s.size_name}</td><td>{s.size_type}</td><td>{s.display_order}</td>
                    <td><span className={`badge bg-${s.isactive ? "success" : "secondary"}`}>{s.isactive ? "Yes" : "No"}</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-dark me-1" onClick={() => { setEditingSize(s); setSizeForm({ size_name: s.size_name, size_type: s.size_type, display_order: s.display_order }); }}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleSizeDelete(s)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ── CLOTH TYPES TAB ── */}
      {activeTab === "Cloth Types" && (
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <h5>{editingCloth ? "Edit Cloth Type" : "Add Cloth Type"}</h5>
              <form onSubmit={handleClothSubmit}>
                <div className="row g-3">
                  <div className="col-md-4"><label className="form-label">Name *</label><input className="form-control" value={clothForm.cloth_type_name} onChange={(e) => setClothForm((c) => ({ ...c, cloth_type_name: e.target.value }))} required /></div>
                  <div className="col-md-4"><label className="form-label">Slug</label><input className="form-control" value={clothForm.cloth_type_slug} onChange={(e) => setClothForm((c) => ({ ...c, cloth_type_slug: e.target.value }))} /></div>
                  <div className="col-md-2"><label className="form-label">Order</label><input type="number" className="form-control" value={clothForm.display_order} onChange={(e) => setClothForm((c) => ({ ...c, display_order: parseInt(e.target.value) || 1 }))} /></div>
                  <div className="col-12"><label className="form-label">Description</label><input className="form-control" value={clothForm.description} onChange={(e) => setClothForm((c) => ({ ...c, description: e.target.value }))} /></div>
                  <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-dark">{editingCloth ? "Update" : "Add"}</button>
                    {editingCloth && <button type="button" className="btn btn-outline-secondary" onClick={() => { setEditingCloth(null); setClothForm(emptyCloth); }}>Cancel</button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
          {clothLoading ? <div className="spinner-border" /> : (
            <table className="table table-bordered align-middle">
              <thead className="table-dark"><tr><th>Name</th><th>Slug</th><th>Description</th><th>Order</th><th>Actions</th></tr></thead>
              <tbody>
                {clothTypes.map((c) => (
                  <tr key={c.cloth_type_id}>
                    <td>{c.cloth_type_name}</td><td><code>{c.cloth_type_slug}</code></td><td>{c.description}</td><td>{c.display_order}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-dark me-1" onClick={() => { setEditingCloth(c); setClothForm({ cloth_type_name: c.cloth_type_name, cloth_type_slug: c.cloth_type_slug || "", description: c.description || "", display_order: c.display_order }); }}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleClothDelete(c)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ── CARE INSTRUCTIONS TAB ── */}
      {activeTab === "Care Instructions" && (
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <h5>{editingCare ? "Edit Instruction" : "Add Care Instruction"}</h5>
              <form onSubmit={handleCareSubmit}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-8"><label className="form-label">Instruction Text *</label><textarea className="form-control" rows={2} value={careForm.instruction_text} onChange={(e) => setCareForm((c) => ({ ...c, instruction_text: e.target.value }))} required /></div>
                  <div className="col-md-2"><label className="form-label">Order</label><input type="number" className="form-control" value={careForm.display_order} onChange={(e) => setCareForm((c) => ({ ...c, display_order: parseInt(e.target.value) || 1 }))} /></div>
                  <div className="col-md-2 d-flex gap-2 align-items-end">
                    <button type="submit" className="btn btn-dark">{editingCare ? "Update" : "Add"}</button>
                    {editingCare && <button type="button" className="btn btn-outline-secondary" onClick={() => { setEditingCare(null); setCareForm(emptyCare); }}>✕</button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
          {careLoading ? <div className="spinner-border" /> : (
            <table className="table table-bordered align-middle">
              <thead className="table-dark"><tr><th>Instruction</th><th>Order</th><th>Actions</th></tr></thead>
              <tbody>
                {careList.map((c) => (
                  <tr key={c.care_instruction_id}>
                    <td>{c.instruction_text}</td><td>{c.display_order}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-dark me-1" onClick={() => { setEditingCare(c); setCareForm({ instruction_text: c.instruction_text, display_order: c.display_order }); }}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleCareDelete(c)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ── SEO TAB ── */}
      {activeTab === "SEO" && (
        <div>
          <div className="card mb-4">
            <div className="card-body">
              <h5>{editingSeq ? "Edit SEO" : "Add Product SEO"}</h5>
              <form onSubmit={handleSeoSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Product *</label>
                    <select className="form-select" value={seoForm.product_id} onChange={(e) => setSeoForm((s) => ({ ...s, product_id: e.target.value }))} required>
                      <option value="">-- Select Product --</option>
                      {products.map((p) => <option key={p.product_id} value={p.product_id}>{p.product_name}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6"><label className="form-label">SEO Title *</label><input className="form-control" value={seoForm.seo_title} onChange={(e) => setSeoForm((s) => ({ ...s, seo_title: e.target.value }))} required /></div>
                  <div className="col-12"><label className="form-label">SEO Description</label><textarea className="form-control" rows={2} value={seoForm.seo_description} onChange={(e) => setSeoForm((s) => ({ ...s, seo_description: e.target.value }))} /></div>
                  <div className="col-md-6"><label className="form-label">Keywords</label><input className="form-control" value={seoForm.seo_keywords} onChange={(e) => setSeoForm((s) => ({ ...s, seo_keywords: e.target.value }))} /></div>
                  <div className="col-md-6"><label className="form-label">OG Image URL</label><input className="form-control" value={seoForm.og_image_url} onChange={(e) => setSeoForm((s) => ({ ...s, og_image_url: e.target.value }))} /></div>
                  <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-dark">{editingSeq ? "Update" : "Add"} SEO</button>
                    {editingSeq && <button type="button" className="btn btn-outline-secondary" onClick={() => { setEditingSeo(null); setSeoForm(emptySeo); }}>Cancel</button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
          {seoLoading ? <div className="spinner-border" /> : (
            <table className="table table-bordered align-middle">
              <thead className="table-dark"><tr><th>Product</th><th>SEO Title</th><th>Keywords</th><th>Actions</th></tr></thead>
              <tbody>
                {seoList.map((s) => {
                  const prod = products.find((p) => p.product_id === s.product_id);
                  return (
                    <tr key={s.product_seo_id}>
                      <td>{prod?.product_name || s.product_id}</td>
                      <td>{s.seo_title}</td>
                      <td><small>{s.seo_keywords}</small></td>
                      <td>
                        <button className="btn btn-sm btn-outline-dark me-1" onClick={() => { setEditingSeo(s); setSeoForm({ product_id: s.product_id, seo_title: s.seo_title, seo_description: s.seo_description || "", seo_keywords: s.seo_keywords || "", og_image_url: s.og_image_url || "" }); }}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleSeoDelete(s)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
