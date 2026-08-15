import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../services/api";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";
import ActiveToggle from "../components/ActiveToggle";

const RCU = "ADMIN_PORTAL";
const unwrap = (res) => res.data?.data || res.data || [];

const emptyDiscount = {
  discount_name: "",
  description: "",
  discount_type: "percent",
  discount_value: "",
  start_date: "",
  end_date: "",
  max_discount_amount: "",
  usage_limit: "",
  discount_priority: 1,
};

const TARGET_TYPES = [
  { value: "all", label: "Entire store" },
  { value: "product", label: "Specific product" },
  { value: "product_variant", label: "Specific product variant" },
  { value: "menu_category", label: "Category" },
  { value: "menu_subcategory", label: "Sub-category" },
];

// Discount Targets is a polymorphic link table (target_type + target_id can point at a
// product, a variant, a category, or a subcategory). It used to be a raw generic CRUD
// screen where staff typed both the parent Discount's UUID and the target's UUID by
// hand, with no idea what a pasted-in UUID even referred to. This nests target
// management under the discount, and swaps the target_id text box for the correct
// dropdown based on the chosen target type.
const AdminDiscountsPage = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState(null);
  const toast = useToast();
  const confirm = useConfirm();

  const fetchDiscounts = useCallback(async () => {
    setLoading(true);
    try { setDiscounts(unwrap(await apiClient.get("/Discounts"))); }
    catch { setDiscounts([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchDiscounts(); }, [fetchDiscounts]);

  const openNew = () => setWorkspace({ ...emptyDiscount, discount_id: null });
  const openEdit = (d) => setWorkspace({ ...d });
  const closeWorkspace = () => { setWorkspace(null); fetchDiscounts(); };

  const toggleDiscountActive = async (d, nextActive) => {
    try {
      await apiClient.put("/Discounts", { discount_id: d.discount_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Discount ${nextActive ? "activated" : "deactivated"}.`);
      fetchDiscounts();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  return (
    <div>
      <h3 className="mb-4">Discounts</h3>

      {!workspace && (
        <div>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-dark" onClick={openNew}>+ Add Discount</button>
          </div>
          {loading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
            <table className="table table-hover align-middle">
              <thead className="table-dark"><tr><th>Name</th><th>Type</th><th>Value</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {discounts.length === 0 ? <tr><td colSpan={5} className="text-center text-muted">No discounts found.</td></tr> :
                  discounts.map((d) => (
                    <tr key={d.discount_id}>
                      <td><strong>{d.discount_name}</strong></td>
                      <td>{d.discount_type}</td>
                      <td>{d.discount_type?.toLowerCase().startsWith("percent") ? `${d.discount_value}%` : `₹${d.discount_value}`}</td>
                      <td><ActiveToggle active={!!d.isactive} onToggle={(next) => toggleDiscountActive(d, next)} /></td>
                      <td><button className="btn btn-sm btn-outline-dark" onClick={() => openEdit(d)}>Open</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {workspace && <DiscountWorkspace discount={workspace} onClose={closeWorkspace} toast={toast} confirm={confirm} />}
    </div>
  );
};

const DiscountWorkspace = ({ discount, onClose, toast, confirm }) => {
  const [core, setCore] = useState({
    discount_name: discount.discount_name || "",
    description: discount.description || "",
    discount_type: discount.discount_type || "percent",
    discount_value: discount.discount_value || "",
    start_date: discount.start_date ? discount.start_date.slice(0, 10) : "",
    end_date: discount.end_date ? discount.end_date.slice(0, 10) : "",
    max_discount_amount: discount.max_discount_amount || "",
    usage_limit: discount.usage_limit || "",
    discount_priority: discount.discount_priority || 1,
  });
  const [discountId, setDiscountId] = useState(discount.discount_id || null);
  const [saving, setSaving] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(!discountId);

  const [targets, setTargets] = useState([]);
  const [targetForm, setTargetForm] = useState({ target_type: "all", target_id: "" });

  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const loadTargets = useCallback(async (id) => {
    if (!id) return;
    try {
      const all = unwrap(await apiClient.get("/Discount-Targets"));
      setTargets(Array.isArray(all) ? all.filter((t) => t.discount_id === id) : []);
    } catch { setTargets([]); }
  }, []);

  useEffect(() => {
    if (!discountId) return;
    loadTargets(discountId);
    apiClient.get("/Products").then((r) => setProducts(unwrap(r))).catch(() => setProducts([]));
    apiClient.get("/Products-Variants").then((r) => setVariants(unwrap(r))).catch(() => setVariants([]));
    apiClient.get("/Menu-Category").then((r) => setCategories(unwrap(r))).catch(() => setCategories([]));
    apiClient.get("/Menu-Sub-Category").then((r) => setSubcategories(unwrap(r))).catch(() => setSubcategories([]));
  }, [discountId, loadTargets]);

  const saveCore = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...core,
        discount_value: parseFloat(core.discount_value) || 0,
        max_discount_amount: core.max_discount_amount ? parseFloat(core.max_discount_amount) : null,
        usage_limit: core.usage_limit ? parseInt(core.usage_limit) : null,
        discount_priority: parseInt(core.discount_priority) || 1,
      };
      if (discountId) {
        await apiClient.put("/Discounts", { ...payload, discount_id: discountId, luu: RCU });
        toast.success("Discount updated.");
      } else {
        const res = await apiClient.post("/Discounts", { ...payload, rcu: RCU });
        const newId = res.data?.data?.discount_id || res.data?.discount_id;
        if (!newId) throw new Error("Discount created but no id was returned.");
        setDiscountId(newId);
        setShowCoreModal(false);
        toast.success("Discount created — now choose what it applies to below.");
      }
      setShowCoreModal(false);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save discount."); }
    finally { setSaving(false); }
  };

  const submitTarget = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/Discount-Targets", {
        discount_id: discountId,
        target_type: targetForm.target_type,
        target_id: targetForm.target_type === "all" ? null : targetForm.target_id,
        display_order: targets.length + 1,
        rcu: RCU,
      });
      toast.success("Target added.");
      setTargetForm({ target_type: "all", target_id: "" });
      loadTargets(discountId);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to add target."); }
  };
  const deleteTarget = async (t) => {
    const ok = await confirm({ title: "Remove this target?", confirmLabel: "Remove", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Discount-Targets", { data: { discount_target_id: t.discount_target_id, luu: RCU } }); toast.success("Target removed."); loadTargets(discountId); }
    catch { toast.error("Delete failed."); }
  };

  const targetLabel = (t) => {
    if (t.target_type === "all") return "Entire store";
    if (t.target_type === "product") return products.find((p) => p.product_id === t.target_id)?.product_name || "Unknown product";
    if (t.target_type === "product_variant") return variants.find((v) => v.product_variant_id === t.target_id)?.sku || "Unknown variant";
    if (t.target_type === "menu_category") return categories.find((c) => c.menu_category_id === t.target_id)?.menu_category_name || "Unknown category";
    if (t.target_type === "menu_subcategory") return subcategories.find((s) => s.menu_subcategory_id === t.target_id)?.menu_subcategory_name || "Unknown subcategory";
    return "—";
  };

  const targetOptions = () => {
    switch (targetForm.target_type) {
      case "product": return products.map((p) => ({ value: p.product_id, label: p.product_name }));
      case "product_variant": return variants.map((v) => ({ value: v.product_variant_id, label: v.sku || v.variant_name }));
      case "menu_category": return categories.map((c) => ({ value: c.menu_category_id, label: c.menu_category_name }));
      case "menu_subcategory": return subcategories.map((s) => ({ value: s.menu_subcategory_id, label: s.menu_subcategory_name }));
      default: return [];
    }
  };

  return (
    <div>
      <button className="btn btn-link px-0 mb-3" onClick={onClose}>&larr; Back to Discounts</button>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">{core.discount_name || "New Discount"}</h5>
            <div className="text-muted small">{core.discount_type === "percent" ? `${core.discount_value || 0}%` : `₹${core.discount_value || 0}`}</div>
          </div>
          {discountId && <button className="btn btn-outline-dark btn-sm" onClick={() => setShowCoreModal(true)}>Edit Details</button>}
        </div>
      </div>

      {showCoreModal && (
        <Modal title={discountId ? "Edit Discount" : "New Discount"} onClose={() => { if (discountId) setShowCoreModal(false); }} size="lg">
          <form onSubmit={saveCore}>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Discount Name *</label><input className="form-control" value={core.discount_name} onChange={(e) => setCore((c) => ({ ...c, discount_name: e.target.value }))} required /></div>
              <div className="col-md-6"><label className="form-label">Description</label><input className="form-control" value={core.description} onChange={(e) => setCore((c) => ({ ...c, description: e.target.value }))} /></div>
              <div className="col-md-3"><label className="form-label">Type</label><select className="form-select" value={core.discount_type} onChange={(e) => setCore((c) => ({ ...c, discount_type: e.target.value }))}><option value="percent">Percent</option><option value="flat">Flat Amount</option></select></div>
              <div className="col-md-3"><label className="form-label">Value *</label><input type="number" className="form-control" value={core.discount_value} onChange={(e) => setCore((c) => ({ ...c, discount_value: e.target.value }))} required /></div>
              <div className="col-md-3"><label className="form-label">Start Date</label><input type="date" className="form-control" value={core.start_date} onChange={(e) => setCore((c) => ({ ...c, start_date: e.target.value }))} /></div>
              <div className="col-md-3"><label className="form-label">End Date</label><input type="date" className="form-control" value={core.end_date} onChange={(e) => setCore((c) => ({ ...c, end_date: e.target.value }))} /></div>
              <div className="col-md-4"><label className="form-label">Max Discount Amount</label><input type="number" className="form-control" value={core.max_discount_amount} onChange={(e) => setCore((c) => ({ ...c, max_discount_amount: e.target.value }))} /></div>
              <div className="col-md-4"><label className="form-label">Usage Limit</label><input type="number" className="form-control" value={core.usage_limit} onChange={(e) => setCore((c) => ({ ...c, usage_limit: e.target.value }))} /></div>
              <div className="col-md-4"><label className="form-label">Priority</label><input type="number" className="form-control" value={core.discount_priority} onChange={(e) => setCore((c) => ({ ...c, discount_priority: e.target.value }))} /></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={saving}>{saving ? "Saving..." : discountId ? "Update Discount" : "Create Discount & Continue"}</button>
              {discountId && <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCoreModal(false)}>Cancel</button>}
            </div>
          </form>
        </Modal>
      )}

      {!discountId && !showCoreModal && <div className="alert alert-info">Save the discount first — targets unlock automatically once it's created.</div>}

      {discountId && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>Applies To</h5>
            <form onSubmit={submitTarget} className="row g-3 align-items-end mb-3">
              <div className="col-md-4">
                <label className="form-label">Target Type</label>
                <select className="form-select" value={targetForm.target_type} onChange={(e) => setTargetForm({ target_type: e.target.value, target_id: "" })}>
                  {TARGET_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              {targetForm.target_type !== "all" && (
                <div className="col-md-5">
                  <label className="form-label">Which one?</label>
                  <select className="form-select" value={targetForm.target_id} onChange={(e) => setTargetForm((t) => ({ ...t, target_id: e.target.value }))} required>
                    <option value="">-- select --</option>
                    {targetOptions().map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              )}
              <div className="col-md-3"><button type="submit" className="btn btn-dark btn-sm">+ Add Target</button></div>
            </form>
            <table className="table table-sm table-bordered align-middle mb-0">
              <thead className="table-light"><tr><th>Applies To</th><th>Target</th><th>Actions</th></tr></thead>
              <tbody>
                {targets.length === 0 ? <tr><td colSpan={3} className="text-center text-muted">No targets yet — this discount won't apply anywhere until one is added.</td></tr> :
                  targets.map((t) => (
                    <tr key={t.discount_target_id}>
                      <td>{TARGET_TYPES.find((x) => x.value === t.target_type)?.label || t.target_type}</td>
                      <td>{targetLabel(t)}</td>
                      <td><button className="btn btn-sm btn-outline-danger" onClick={() => deleteTarget(t)}>Delete</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDiscountsPage;
