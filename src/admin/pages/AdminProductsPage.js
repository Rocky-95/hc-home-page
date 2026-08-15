import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../services/api";
import authService from "../../services/authService";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";
import { validateMediaFile } from "../utils/mediaValidation";
import { resolveUploadUrl } from "../utils/resolveUploadUrl";
import UploadProgressBar from "../components/UploadProgressBar";
import ActiveToggle from "../components/ActiveToggle";

const RCU = "ADMIN_PORTAL";

const TOP_TABS = ["Products", "Sizes", "Cloth Types", "Care Instructions", "Attributes"];

const emptyProduct = {
  product_name: "",
  product_slug: "",
  short_description: "",
  description: "",
  base_price: "",
  currency_code: "INR",
  isactive: true,
};

const emptyVariant = { sku: "", variant_name: "", price: "", stock_qty: "", size_id: "", cloth_type_id: "", isdefault: false };
const emptyAttrValue = { attribute_id: "", attribute_value: "" };
const emptySeo = { seo_title: "", seo_description: "", seo_keywords: "", og_image_url: "" };

const emptySize = { size_name: "", size_type: "alpha", display_order: 1 };
const emptyCloth = { cloth_type_name: "", cloth_type_slug: "", description: "", display_order: 1 };
const emptyCare = { instruction_text: "", display_order: 1 };
const emptyAttribute = { attribute_name: "", attribute_slug: "", attribute_type: "text", display_order: 1 };

const unwrap = (res) => res.data?.data || res.data || [];

const AdminProductsPage = () => {
  const [topTab, setTopTab] = useState("Products");

  // ── shared reference data (used across the whole page) ─────
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [clothTypes, setClothTypes] = useState([]);
  const [careList, setCareList] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const toast = useToast();
  const confirm = useConfirm();

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try { setProducts(unwrap(await apiClient.get("/Products"))); }
    catch { setProducts([]); }
    finally { setLoadingProducts(false); }
  }, []);
  const fetchSizes = useCallback(async () => {
    try { setSizes(unwrap(await apiClient.get("/Products-Sizes"))); } catch { setSizes([]); }
  }, []);
  const fetchClothTypes = useCallback(async () => {
    try { setClothTypes(unwrap(await apiClient.get("/Products-Cloth-Types"))); } catch { setClothTypes([]); }
  }, []);
  const fetchCare = useCallback(async () => {
    try { setCareList(unwrap(await apiClient.get("/Products-Care-Instructions"))); } catch { setCareList([]); }
  }, []);
  const fetchAttributes = useCallback(async () => {
    try { setAttributes(unwrap(await apiClient.get("/Products-Attributes"))); } catch { setAttributes([]); }
  }, []);

  useEffect(() => {
    fetchProducts(); fetchSizes(); fetchClothTypes(); fetchCare(); fetchAttributes();
  }, [fetchProducts, fetchSizes, fetchClothTypes, fetchCare, fetchAttributes]);

  // ── Product Workspace (list vs. nested create/edit view) ────
  const [workspaceProduct, setWorkspaceProduct] = useState(null); // null = list view
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.product_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.product_slug?.toLowerCase().includes(search.toLowerCase())
  );

  const openNewProduct = () => setWorkspaceProduct({ ...emptyProduct, product_id: null });
  const openEditProduct = (p) => setWorkspaceProduct({ ...p });
  const closeWorkspace = () => { setWorkspaceProduct(null); fetchProducts(); };

  const toggleProductActive = async (p, nextActive) => {
    try {
      await apiClient.put("/Products", { product_id: p.product_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Product ${nextActive ? "activated" : "deactivated"}.`);
      fetchProducts();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  return (
    <div>
      <h3 className="mb-4">Product Management</h3>

      {!workspaceProduct && (
        <>
          <ul className="nav nav-tabs mb-4">
            {TOP_TABS.map((t) => (
              <li className="nav-item" key={t}>
                <button className={`nav-link ${topTab === t ? "active fw-semibold" : ""}`} onClick={() => setTopTab(t)}>{t}</button>
              </li>
            ))}
          </ul>

          {topTab === "Products" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input className="form-control w-auto" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
                <button className="btn btn-dark" onClick={openNewProduct}>+ Add Product</button>
              </div>
              {loadingProducts ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-dark"><tr><th>Name</th><th>Slug</th><th>Price</th><th>Active</th><th>Actions</th></tr></thead>
                    <tbody>
                      {filteredProducts.length === 0 ? <tr><td colSpan={5} className="text-center text-muted">No products found.</td></tr> :
                        filteredProducts.map((p) => (
                          <tr key={p.product_id}>
                            <td><strong>{p.product_name}</strong><br /><small className="text-muted">{p.short_description}</small></td>
                            <td><code>{p.product_slug}</code></td>
                            <td>₹{p.base_price}</td>
                            <td><ActiveToggle active={!!p.isactive} onToggle={(next) => toggleProductActive(p, next)} /></td>
                            <td><button className="btn btn-sm btn-outline-dark" onClick={() => openEditProduct(p)}>Open</button></td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {topTab === "Sizes" && (
            <SimpleMasterList
              title="Sizes" idField="size_id" endpoint="/Products-Sizes"
              empty={emptySize} list={sizes} refresh={fetchSizes} toast={toast} confirm={confirm}
              columns={[{ key: "size_name", label: "Name" }, { key: "size_type", label: "Type" }, { key: "display_order", label: "Order" }]}
              renderFields={(form, setForm) => (
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label">Size Name</label><input className="form-control" value={form.size_name} onChange={(e) => setForm((s) => ({ ...s, size_name: e.target.value }))} required /></div>
                  <div className="col-md-6"><label className="form-label">Type</label><select className="form-select" value={form.size_type} onChange={(e) => setForm((s) => ({ ...s, size_type: e.target.value }))}><option value="alpha">Alpha (S/M/L)</option><option value="numeric">Numeric (28/30)</option></select></div>
                  <div className="col-12"><label className="form-label">Order</label><input type="number" className="form-control" value={form.display_order} onChange={(e) => setForm((s) => ({ ...s, display_order: parseInt(e.target.value) || 1 }))} /></div>
                </div>
              )}
            />
          )}

          {topTab === "Cloth Types" && (
            <SimpleMasterList
              title="Cloth Types" idField="cloth_type_id" endpoint="/Products-Cloth-Types"
              empty={emptyCloth} list={clothTypes} refresh={fetchClothTypes} toast={toast} confirm={confirm}
              columns={[{ key: "cloth_type_name", label: "Name" }, { key: "cloth_type_slug", label: "Slug" }, { key: "display_order", label: "Order" }]}
              renderFields={(form, setForm) => (
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label">Name *</label><input className="form-control" value={form.cloth_type_name} onChange={(e) => setForm((c) => ({ ...c, cloth_type_name: e.target.value }))} required /></div>
                  <div className="col-md-6"><label className="form-label">Slug</label><input className="form-control" value={form.cloth_type_slug} onChange={(e) => setForm((c) => ({ ...c, cloth_type_slug: e.target.value }))} /></div>
                  <div className="col-12"><label className="form-label">Order</label><input type="number" className="form-control" value={form.display_order} onChange={(e) => setForm((c) => ({ ...c, display_order: parseInt(e.target.value) || 1 }))} /></div>
                  <div className="col-12"><label className="form-label">Description</label><input className="form-control" value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} /></div>
                </div>
              )}
            />
          )}

          {topTab === "Care Instructions" && (
            <SimpleMasterList
              title="Care Instructions" idField="care_instruction_id" endpoint="/Products-Care-Instructions"
              empty={emptyCare} list={careList} refresh={fetchCare} toast={toast} confirm={confirm}
              columns={[{ key: "instruction_text", label: "Instruction" }, { key: "display_order", label: "Order" }]}
              renderFields={(form, setForm) => (
                <div className="row g-3">
                  <div className="col-12"><label className="form-label">Instruction Text *</label><textarea className="form-control" rows={2} value={form.instruction_text} onChange={(e) => setForm((c) => ({ ...c, instruction_text: e.target.value }))} required /></div>
                  <div className="col-12"><label className="form-label">Order</label><input type="number" className="form-control" value={form.display_order} onChange={(e) => setForm((c) => ({ ...c, display_order: parseInt(e.target.value) || 1 }))} /></div>
                </div>
              )}
            />
          )}

          {topTab === "Attributes" && (
            <SimpleMasterList
              title="Attributes" idField="attribute_id" endpoint="/Products-Attributes"
              empty={emptyAttribute} list={attributes} refresh={fetchAttributes} toast={toast} confirm={confirm}
              columns={[{ key: "attribute_name", label: "Name" }, { key: "attribute_type", label: "Type" }, { key: "display_order", label: "Order" }]}
              renderFields={(form, setForm) => (
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label">Name *</label><input className="form-control" value={form.attribute_name} onChange={(e) => setForm((a) => ({ ...a, attribute_name: e.target.value }))} required /></div>
                  <div className="col-md-6"><label className="form-label">Slug</label><input className="form-control" value={form.attribute_slug} onChange={(e) => setForm((a) => ({ ...a, attribute_slug: e.target.value }))} /></div>
                  <div className="col-md-6"><label className="form-label">Type</label><select className="form-select" value={form.attribute_type} onChange={(e) => setForm((a) => ({ ...a, attribute_type: e.target.value }))}><option value="text">Text</option><option value="dropdown">Dropdown</option><option value="number">Number</option></select></div>
                  <div className="col-md-6"><label className="form-label">Order</label><input type="number" className="form-control" value={form.display_order} onChange={(e) => setForm((a) => ({ ...a, display_order: parseInt(e.target.value) || 1 }))} /></div>
                </div>
              )}
            />
          )}
        </>
      )}

      {workspaceProduct && (
        <ProductWorkspace
          product={workspaceProduct}
          sizes={sizes}
          clothTypes={clothTypes}
          attributes={attributes}
          onClose={closeWorkspace}
          toast={toast} confirm={confirm}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// A simple reference-data manager (Sizes / Cloth Types / Care Instructions / Attributes).
// Create/Edit happens in a popup; the page behind it just shows the list.
// ─────────────────────────────────────────────────────────────
const SimpleMasterList = ({ title, idField, endpoint, empty, list, refresh, toast, confirm, columns, renderFields }) => {
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const singular = title.slice(0, -1);

  const openNew = () => { setEditing(null); setForm(empty); setShowModal(true); };
  const openEdit = (row) => { setEditing(row); setForm({ ...empty, ...row }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiClient.put(endpoint, { ...form, [idField]: editing[idField], luu: RCU });
        toast.success(`${singular} updated.`);
      } else {
        await apiClient.post(endpoint, { ...form, rcu: RCU });
        toast.success(`${singular} added.`);
      }
      setShowModal(false); setEditing(null); setForm(empty); refresh();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save."); }
  };

  const handleDelete = async (row) => {
    const ok = await confirm({ title: `Delete this ${singular.toLowerCase()}?`, message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try {
      await apiClient.delete(endpoint, { data: { [idField]: row[idField], luu: RCU } });
      toast.success("Deleted."); refresh();
    } catch { toast.error("Delete failed."); }
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-dark" onClick={openNew}>+ Add {singular}</button>
      </div>
      <table className="table table-bordered align-middle">
        <thead className="table-dark"><tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}<th>Actions</th></tr></thead>
        <tbody>
          {list.length === 0 ? <tr><td colSpan={columns.length + 1} className="text-center text-muted">No records found.</td></tr> :
            list.map((row) => (
              <tr key={row[idField]}>
                {columns.map((c) => <td key={c.key}>{String(row[c.key] ?? "")}</td>)}
                <td>
                  <button className="btn btn-sm btn-outline-dark me-1" onClick={() => openEdit(row)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(row)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && (
        <Modal title={editing ? `Edit ${singular}` : `Add ${singular}`} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            {renderFields(form, setForm)}
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark">{editing ? "Update" : "Add"}</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Nested Product Workspace — everything about ONE product (core fields,
// variants, media, attribute values, SEO) lives on one screen. Every
// child record automatically carries this product's product_id; nothing
// needs to be typed or copy-pasted by the admin. Core details and Variants
// are edited in a popup; Media/Attributes/SEO stay as compact inline rows.
// ─────────────────────────────────────────────────────────────
const ProductWorkspace = ({ product, sizes, clothTypes, attributes, onClose, toast, confirm }) => {
  const [core, setCore] = useState({
    product_name: product.product_name || "",
    product_slug: product.product_slug || "",
    short_description: product.short_description || "",
    description: product.description || "",
    base_price: product.base_price || "",
    currency_code: product.currency_code || "INR",
    isactive: product.isactive !== false,
  });
  const [productId, setProductId] = useState(product.product_id || null);
  const [saving, setSaving] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(!productId);

  const [variants, setVariants] = useState([]);
  const [variantForm, setVariantForm] = useState(emptyVariant);
  const [editingVariant, setEditingVariant] = useState(null);
  const [showVariantModal, setShowVariantModal] = useState(false);

  const [media, setMedia] = useState([]);
  const [mediaAlt, setMediaAlt] = useState("");
  const [mediaPrimary, setMediaPrimary] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaPreview, setMediaPreview] = useState(null);

  const [attrValues, setAttrValues] = useState([]);
  const [attrForm, setAttrForm] = useState(emptyAttrValue);

  const [seo, setSeo] = useState(emptySeo);
  const [seoId, setSeoId] = useState(null);

  // NOTE: only /Products-Media supports server-side ?product_id= filtering on the
  // backend today. /Products-Variants, /Products-Attributes-Values and /Products-Seo
  // return the full table, so those three are filtered client-side here.
  const loadChildren = useCallback(async (pid) => {
    if (!pid) return;
    try {
      const all = unwrap(await apiClient.get("/Products-Variants"));
      setVariants(Array.isArray(all) ? all.filter((r) => r.product_id === pid) : []);
    } catch { setVariants([]); }

    try { setMedia(unwrap(await apiClient.get("/Products-Media", { params: { product_id: pid } }))); } catch { setMedia([]); }

    try {
      const all = unwrap(await apiClient.get("/Products-Attributes-Values"));
      setAttrValues(Array.isArray(all) ? all.filter((r) => r.product_id === pid) : []);
    } catch { setAttrValues([]); }

    try {
      const all = unwrap(await apiClient.get("/Products-Seo"));
      const row = Array.isArray(all) ? all.find((r) => r.product_id === pid) : null;
      if (row) { setSeo({ seo_title: row.seo_title || "", seo_description: row.seo_description || "", seo_keywords: row.seo_keywords || "", og_image_url: row.og_image_url || "" }); setSeoId(row.product_seo_id); }
    } catch { /* no SEO row yet */ }
  }, []);

  useEffect(() => { if (productId) loadChildren(productId); }, [productId, loadChildren]);

  // ── Step 1: save the core product; this is what unlocks the nested sections ──
  const saveCore = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...core, base_price: parseFloat(core.base_price) || 0 };
      if (productId) {
        await apiClient.put("/Products", { ...payload, product_id: productId, luu: RCU });
        toast.success("Product updated.");
        setShowCoreModal(false);
      } else {
        const res = await apiClient.post("/Products", { ...payload, rcu: RCU });
        const newId = res.data?.data?.product_id || res.data?.product_id;
        if (!newId) throw new Error("Product created but no product_id was returned.");
        setProductId(newId);
        setShowCoreModal(false);
        toast.success("Product created — now add variants, images, attributes and SEO below.");
      }
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save product."); }
    finally { setSaving(false); }
  };

  // ── Variants: size/cloth-type pickers, product_id auto-attached ──
  const openNewVariant = () => { setEditingVariant(null); setVariantForm(emptyVariant); setShowVariantModal(true); };
  const openEditVariant = (v) => { setEditingVariant(v); setVariantForm({ sku: v.sku, variant_name: v.variant_name || "", price: v.price || "", stock_qty: v.stock_qty || "", size_id: v.size_id || "", cloth_type_id: v.cloth_type_id || "", isdefault: !!v.isdefault }); setShowVariantModal(true); };

  const submitVariant = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...variantForm, price: parseFloat(variantForm.price) || 0, stock_qty: parseInt(variantForm.stock_qty) || 0, product_id: productId };
      if (editingVariant) {
        await apiClient.put("/Products-Variants", { ...payload, product_variant_id: editingVariant.product_variant_id, luu: RCU });
        toast.success("Variant updated.");
      } else {
        await apiClient.post("/Products-Variants", { ...payload, rcu: RCU });
        toast.success("Variant added.");
      }
      setShowVariantModal(false); setEditingVariant(null); setVariantForm(emptyVariant); loadChildren(productId);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save variant."); }
  };
  const deleteVariant = async (v) => {
    const ok = await confirm({ title: `Delete variant "${v.sku}"?`, message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Products-Variants", { data: { product_variant_id: v.product_variant_id, luu: RCU } }); toast.success("Variant deleted."); loadChildren(productId); }
    catch { toast.error("Delete failed."); }
  };

  // ── Media: upload happens first internally, then the record is created with the returned URL — no manual URL/product_id entry ──
  const handleMediaFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !productId) return;

    const { valid, error } = validateMediaFile(file);
    if (!valid) { toast.error(error); e.target.value = ""; return; }

    const previewUrl = URL.createObjectURL(file);
    setMediaPreview({ url: previewUrl, isVideo: file.type.startsWith("video") });

    setUploading(true);
    setUploadProgress(0);
    try {
      const fd = new FormData();
      fd.append("path", "PRODUCT_IMAGE");
      fd.append("file", file);
      const uploadRes = await authService.uploadFile(fd, setUploadProgress);
      const raw = uploadRes.data?.url || uploadRes.data?.data?.url || uploadRes.data?.virtualPath || "";
      const url = resolveUploadUrl(raw);
      if (!url) throw new Error("Upload succeeded but no file URL was returned.");

      await apiClient.post("/Products-Media", {
        product_id: productId,
        media_type: file.type.startsWith("video") ? "video" : "image",
        media_url: url,
        alt_text: mediaAlt,
        display_order: media.length + 1,
        isprimary: mediaPrimary,
        rcu: RCU,
      });
      toast.success("Image uploaded and attached to product.");
      setMediaAlt(""); setMediaPrimary(false);
      loadChildren(productId);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Upload failed.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      URL.revokeObjectURL(previewUrl);
      setMediaPreview(null);
      e.target.value = "";
    }
  };
  const deleteMedia = async (m) => {
    const ok = await confirm({ title: "Delete this image?", message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Products-Media", { data: { product_media_id: m.product_media_id, luu: RCU } }); toast.success("Image deleted."); loadChildren(productId); }
    catch { toast.error("Delete failed."); }
  };

  // ── Attribute values: attribute picker, product_id auto-attached ──
  const submitAttrValue = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/Products-Attributes-Values", { ...attrForm, product_id: productId, rcu: RCU });
      toast.success("Attribute value added.");
      setAttrForm(emptyAttrValue); loadChildren(productId);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save attribute value."); }
  };
  const deleteAttrValue = async (av) => {
    const ok = await confirm({ title: "Delete this attribute value?", message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Products-Attributes-Values", { data: { product_attribute_value_id: av.product_attribute_value_id, luu: RCU } }); toast.success("Deleted."); loadChildren(productId); }
    catch { toast.error("Delete failed."); }
  };

  // ── SEO: single row per product, product_id auto-attached ──
  const submitSeo = async (e) => {
    e.preventDefault();
    try {
      if (seoId) {
        await apiClient.put("/Products-Seo", { ...seo, product_seo_id: seoId, product_id: productId, luu: RCU });
      } else {
        const res = await apiClient.post("/Products-Seo", { ...seo, product_id: productId, rcu: RCU });
        setSeoId(res.data?.data?.product_seo_id || res.data?.product_seo_id || null);
      }
      toast.success("SEO saved.");
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save SEO."); }
  };

  const sizeName = (id) => sizes.find((s) => s.size_id === id)?.size_name || "—";
  const clothName = (id) => clothTypes.find((c) => c.cloth_type_id === id)?.cloth_type_name || "—";
  const attrName = (id) => attributes.find((a) => a.attribute_id === id)?.attribute_name || "—";

  const coreForm = (
    <form onSubmit={saveCore}>
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label">Product Name *</label><input className="form-control" value={core.product_name} onChange={(e) => setCore((p) => ({ ...p, product_name: e.target.value }))} required /></div>
        <div className="col-md-6"><label className="form-label">Slug</label><input className="form-control" value={core.product_slug} onChange={(e) => setCore((p) => ({ ...p, product_slug: e.target.value }))} /></div>
        <div className="col-md-6"><label className="form-label">Price</label><input type="number" className="form-control" value={core.base_price} onChange={(e) => setCore((p) => ({ ...p, base_price: e.target.value }))} /></div>
        <div className="col-md-3"><label className="form-label">Currency</label><select className="form-select" value={core.currency_code} onChange={(e) => setCore((p) => ({ ...p, currency_code: e.target.value }))}><option value="INR">INR</option><option value="USD">USD</option></select></div>
        <div className="col-md-3 d-flex align-items-end"><div className="form-check mb-2"><input type="checkbox" className="form-check-input" checked={core.isactive} onChange={(e) => setCore((p) => ({ ...p, isactive: e.target.checked }))} id="prodActive" /><label className="form-check-label" htmlFor="prodActive">Active</label></div></div>
        <div className="col-12"><label className="form-label">Short Description</label><input className="form-control" value={core.short_description} onChange={(e) => setCore((p) => ({ ...p, short_description: e.target.value }))} /></div>
        <div className="col-12"><label className="form-label">Full Description</label><textarea className="form-control" rows={3} value={core.description} onChange={(e) => setCore((p) => ({ ...p, description: e.target.value }))} /></div>
      </div>
      <div className="mt-3 d-flex gap-2">
        <button type="submit" className="btn btn-dark" disabled={saving}>{saving ? "Saving..." : productId ? "Update Product" : "Create Product & Continue"}</button>
        {productId && <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCoreModal(false)}>Cancel</button>}
      </div>
    </form>
  );

  return (
    <div>
      <button className="btn btn-link px-0 mb-3" onClick={onClose}>&larr; Back to Products</button>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">{core.product_name || "New Product"}</h5>
            <div className="text-muted small">{core.product_slug} {core.base_price ? `· ₹${core.base_price}` : ""}</div>
          </div>
          {productId && <button className="btn btn-outline-dark btn-sm" onClick={() => setShowCoreModal(true)}>Edit Details</button>}
        </div>
      </div>

      {showCoreModal && (
        <Modal title={productId ? "Edit Product" : "New Product"} onClose={() => { if (productId) setShowCoreModal(false); }} size="lg">
          {coreForm}
        </Modal>
      )}

      {!productId && !showCoreModal && (
        <div className="alert alert-info">Save the product first — variants, images, attributes and SEO unlock automatically once it's created.</div>
      )}

      {productId && (
        <>
          {/* ── VARIANTS ── */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Variants</h5>
                <button className="btn btn-dark btn-sm" onClick={openNewVariant}>+ Add Variant</button>
              </div>
              <table className="table table-sm table-bordered align-middle mb-0">
                <thead className="table-light"><tr><th>SKU</th><th>Name</th><th>Size</th><th>Cloth Type</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
                <tbody>
                  {variants.length === 0 ? <tr><td colSpan={7} className="text-center text-muted">No variants yet.</td></tr> :
                    variants.map((v) => (
                      <tr key={v.product_variant_id}>
                        <td>{v.sku}</td><td>{v.variant_name}</td><td>{sizeName(v.size_id)}</td><td>{clothName(v.cloth_type_id)}</td><td>₹{v.price}</td><td>{v.stock_qty}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-dark me-1" onClick={() => openEditVariant(v)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => deleteVariant(v)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {showVariantModal && (
            <Modal title={editingVariant ? "Edit Variant" : "Add Variant"} onClose={() => setShowVariantModal(false)}>
              <form onSubmit={submitVariant}>
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label">SKU</label><input className="form-control" value={variantForm.sku} onChange={(e) => setVariantForm((v) => ({ ...v, sku: e.target.value }))} required /></div>
                  <div className="col-md-6"><label className="form-label">Variant Name</label><input className="form-control" value={variantForm.variant_name} onChange={(e) => setVariantForm((v) => ({ ...v, variant_name: e.target.value }))} /></div>
                  <div className="col-md-6">
                    <label className="form-label">Size</label>
                    <select className="form-select" value={variantForm.size_id} onChange={(e) => setVariantForm((v) => ({ ...v, size_id: e.target.value }))}>
                      <option value="">-- none --</option>
                      {sizes.map((s) => <option key={s.size_id} value={s.size_id}>{s.size_name}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Cloth Type</label>
                    <select className="form-select" value={variantForm.cloth_type_id} onChange={(e) => setVariantForm((v) => ({ ...v, cloth_type_id: e.target.value }))}>
                      <option value="">-- none --</option>
                      {clothTypes.map((c) => <option key={c.cloth_type_id} value={c.cloth_type_id}>{c.cloth_type_name}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6"><label className="form-label">Price</label><input type="number" className="form-control" value={variantForm.price} onChange={(e) => setVariantForm((v) => ({ ...v, price: e.target.value }))} /></div>
                  <div className="col-md-6"><label className="form-label">Stock</label><input type="number" className="form-control" value={variantForm.stock_qty} onChange={(e) => setVariantForm((v) => ({ ...v, stock_qty: e.target.value }))} /></div>
                </div>
                <div className="mt-3 d-flex gap-2">
                  <button type="submit" className="btn btn-dark">{editingVariant ? "Update" : "Add"}</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowVariantModal(false)}>Cancel</button>
                </div>
              </form>
            </Modal>
          )}

          {/* ── MEDIA ── */}
          <div className="card mb-4">
            <div className="card-body">
              <h5>Images / Media</h5>
              <div className="row g-3 align-items-end mb-3">
                <div className="col-md-4"><label className="form-label">Alt Text</label><input className="form-control" value={mediaAlt} onChange={(e) => setMediaAlt(e.target.value)} /></div>
                <div className="col-md-3"><div className="form-check mt-4"><input type="checkbox" className="form-check-input" checked={mediaPrimary} onChange={(e) => setMediaPrimary(e.target.checked)} id="isPrimary" /><label className="form-check-label" htmlFor="isPrimary">Set as primary</label></div></div>
                <div className="col-md-5">
                  <label className="form-label">Upload Image (uploads &amp; attaches automatically)</label>
                  <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime" className="form-control" onChange={handleMediaFileChange} disabled={uploading} />
                  <div className="form-text">JPG, PNG, WEBP, GIF images or MP4, WEBM, MOV videos.</div>
                  {mediaPreview && (
                    <div className="mt-2">
                      {mediaPreview.isVideo ? (
                        <video src={mediaPreview.url} style={{ height: 90, borderRadius: 6 }} muted autoPlay loop />
                      ) : (
                        <img src={mediaPreview.url} alt="preview" style={{ height: 90, borderRadius: 6, objectFit: "cover" }} />
                      )}
                    </div>
                  )}
                  {uploading && <UploadProgressBar percent={uploadProgress} />}
                </div>
              </div>
              <div className="row g-3">
                {media.length === 0 ? <p className="text-muted">No images yet.</p> :
                  media.map((m) => (
                    <div key={m.product_media_id} className="col-md-3">
                      <div className="card h-100">
                        <img src={m.media_url} alt={m.alt_text || "media"} className="card-img-top" style={{ height: 140, objectFit: "cover" }} onError={(e) => { e.target.src = "https://via.placeholder.com/200x140?text=No+Image"; }} />
                        <div className="card-body p-2">
                          <small>{m.alt_text}</small>
                          {m.isprimary && <span className="badge bg-warning text-dark ms-1">Primary</span>}
                        </div>
                        <div className="card-footer p-2">
                          <button className="btn btn-sm btn-outline-danger w-100" onClick={() => deleteMedia(m)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* ── ATTRIBUTE VALUES ── */}
          <div className="card mb-4">
            <div className="card-body">
              <h5>Attributes</h5>
              <form onSubmit={submitAttrValue} className="row g-3 align-items-end mb-3">
                <div className="col-md-4">
                  <label className="form-label">Attribute</label>
                  <select className="form-select" value={attrForm.attribute_id} onChange={(e) => setAttrForm((a) => ({ ...a, attribute_id: e.target.value }))} required>
                    <option value="">-- select attribute --</option>
                    {attributes.map((a) => <option key={a.attribute_id} value={a.attribute_id}>{a.attribute_name}</option>)}
                  </select>
                </div>
                <div className="col-md-4"><label className="form-label">Value</label><input className="form-control" value={attrForm.attribute_value} onChange={(e) => setAttrForm((a) => ({ ...a, attribute_value: e.target.value }))} required /></div>
                <div className="col-md-2"><button type="submit" className="btn btn-dark btn-sm">+ Add</button></div>
              </form>
              <table className="table table-sm table-bordered align-middle mb-0">
                <thead className="table-light"><tr><th>Attribute</th><th>Value</th><th>Actions</th></tr></thead>
                <tbody>
                  {attrValues.length === 0 ? <tr><td colSpan={3} className="text-center text-muted">No attribute values yet.</td></tr> :
                    attrValues.map((av) => (
                      <tr key={av.product_attribute_value_id}>
                        <td>{attrName(av.attribute_id)}</td><td>{av.attribute_value}</td>
                        <td><button className="btn btn-sm btn-outline-danger" onClick={() => deleteAttrValue(av)}>Delete</button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── SEO ── */}
          <div className="card mb-4">
            <div className="card-body">
              <h5>SEO</h5>
              <form onSubmit={submitSeo}>
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label">SEO Title</label><input className="form-control" value={seo.seo_title} onChange={(e) => setSeo((s) => ({ ...s, seo_title: e.target.value }))} /></div>
                  <div className="col-md-6"><label className="form-label">Keywords</label><input className="form-control" value={seo.seo_keywords} onChange={(e) => setSeo((s) => ({ ...s, seo_keywords: e.target.value }))} /></div>
                  <div className="col-12"><label className="form-label">SEO Description</label><textarea className="form-control" rows={2} value={seo.seo_description} onChange={(e) => setSeo((s) => ({ ...s, seo_description: e.target.value }))} /></div>
                  <div className="col-12"><label className="form-label">OG Image URL</label><input className="form-control" value={seo.og_image_url} onChange={(e) => setSeo((s) => ({ ...s, og_image_url: e.target.value }))} /></div>
                </div>
                <div className="mt-3"><button type="submit" className="btn btn-dark">{seoId ? "Update SEO" : "Save SEO"}</button></div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProductsPage;
