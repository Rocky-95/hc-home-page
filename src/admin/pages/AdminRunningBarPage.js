import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../services/api";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";
import ActiveToggle from "../components/ActiveToggle";

const RCU = "ADMIN_PORTAL";
const unwrap = (res) => res.data?.data || res.data || [];

const emptyBar = { running_bar_name: "", isactive: true };
const emptyItem = { itemsdata: "", duration_seconds: 5, display_order: 1, isactive: true };

// A Running Bar owns a set of scrolling Items. Previously picking which bar an item
// belonged to was a dropdown on a separate page; now items are managed directly
// underneath the bar you're already working on.
const AdminRunningBarPage = () => {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState(null);
  const toast = useToast();
  const confirm = useConfirm();

  const fetchBars = useCallback(async () => {
    setLoading(true);
    try { setBars(unwrap(await apiClient.get("/Running-Bar"))); }
    catch { setBars([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchBars(); }, [fetchBars]);

  const openNew = () => setWorkspace({ ...emptyBar, running_bar_id: null });
  const openEdit = (b) => setWorkspace({ ...b });
  const closeWorkspace = () => { setWorkspace(null); fetchBars(); };

  const toggleBarActive = async (b, nextActive) => {
    try {
      await apiClient.put("/Running-Bar", { running_bar_id: b.running_bar_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Running bar ${nextActive ? "activated" : "deactivated"}.`);
      fetchBars();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  return (
    <div>
      <h3 className="mb-4">Running Bars</h3>

      {!workspace && (
        <div>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-dark" onClick={openNew}>+ Add Running Bar</button>
          </div>
          {loading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
            <table className="table table-hover align-middle">
              <thead className="table-dark"><tr><th>Name</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {bars.length === 0 ? <tr><td colSpan={3} className="text-center text-muted">No running bars found.</td></tr> :
                  bars.map((b) => (
                    <tr key={b.running_bar_id}>
                      <td><strong>{b.running_bar_name}</strong></td>
                      <td><ActiveToggle active={!!b.isactive} onToggle={(next) => toggleBarActive(b, next)} /></td>
                      <td><button className="btn btn-sm btn-outline-dark" onClick={() => openEdit(b)}>Open</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {workspace && <RunningBarWorkspace bar={workspace} onClose={closeWorkspace} toast={toast} confirm={confirm} />}
    </div>
  );
};

const RunningBarWorkspace = ({ bar, onClose, toast, confirm }) => {
  const [core, setCore] = useState({ running_bar_name: bar.running_bar_name || "", isactive: bar.isactive !== false });
  const [barId, setBarId] = useState(bar.running_bar_id || null);
  const [saving, setSaving] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(!barId);

  const [items, setItems] = useState([]);
  const [itemForm, setItemForm] = useState(emptyItem);
  const [editingItem, setEditingItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  const loadItems = useCallback(async (id) => {
    if (!id) return;
    try {
      const all = unwrap(await apiClient.get("/Running-Bar-Items"));
      setItems(Array.isArray(all) ? all.filter((i) => i.running_bar_id === id) : []);
    } catch { setItems([]); }
  }, []);

  useEffect(() => { if (barId) loadItems(barId); }, [barId, loadItems]);

  const saveCore = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (barId) {
        await apiClient.put("/Running-Bar", { ...core, running_bar_id: barId, luu: RCU });
        toast.success("Running bar updated.");
      } else {
        const res = await apiClient.post("/Running-Bar", { ...core, rcu: RCU });
        const newId = res.data?.data?.running_bar_id || res.data?.running_bar_id;
        if (!newId) throw new Error("Running bar created but no id was returned.");
        setBarId(newId);
        setShowCoreModal(false);
        toast.success("Running bar created — now add items below.");
      }
      setShowCoreModal(false);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save running bar."); }
    finally { setSaving(false); }
  };

  const openNewItem = () => { setEditingItem(null); setItemForm(emptyItem); setShowItemModal(true); };
  const openEditItem = (i) => { setEditingItem(i); setItemForm({ itemsdata: i.itemsdata, duration_seconds: i.duration_seconds || 5, display_order: i.display_order || 1, isactive: i.isactive !== false }); setShowItemModal(true); };

  const submitItem = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...itemForm, running_bar_id: barId, duration_seconds: parseInt(itemForm.duration_seconds) || 5, display_order: parseInt(itemForm.display_order) || items.length + 1 };
      if (editingItem) {
        await apiClient.put("/Running-Bar-Items", { ...payload, running_bar_item_id: editingItem.running_bar_item_id, luu: RCU });
        toast.success("Item updated.");
      } else {
        await apiClient.post("/Running-Bar-Items", { ...payload, rcu: RCU });
        toast.success("Item added.");
      }
      setShowItemModal(false); setEditingItem(null); setItemForm(emptyItem); loadItems(barId);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save item."); }
  };
  const deleteItem = async (i) => {
    const ok = await confirm({ title: "Delete this item?", message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Running-Bar-Items", { data: { running_bar_item_id: i.running_bar_item_id, luu: RCU } }); toast.success("Item deleted."); loadItems(barId); }
    catch { toast.error("Delete failed."); }
  };
  const toggleItemActive = async (i, nextActive) => {
    try {
      await apiClient.put("/Running-Bar-Items", { running_bar_item_id: i.running_bar_item_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Item ${nextActive ? "activated" : "deactivated"}.`);
      loadItems(barId);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  return (
    <div>
      <button className="btn btn-link px-0 mb-3" onClick={onClose}>&larr; Back to Running Bars</button>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div><h5 className="mb-0">{core.running_bar_name || "New Running Bar"}</h5></div>
          {barId && <button className="btn btn-outline-dark btn-sm" onClick={() => setShowCoreModal(true)}>Edit Details</button>}
        </div>
      </div>

      {showCoreModal && (
        <Modal title={barId ? "Edit Running Bar" : "New Running Bar"} onClose={() => { if (barId) setShowCoreModal(false); }}>
          <form onSubmit={saveCore}>
            <div className="row g-3">
              <div className="col-md-8"><label className="form-label">Name *</label><input className="form-control" value={core.running_bar_name} onChange={(e) => setCore((c) => ({ ...c, running_bar_name: e.target.value }))} required /></div>
              <div className="col-md-4 d-flex align-items-end"><div className="form-check mb-2"><input type="checkbox" className="form-check-input" checked={core.isactive} onChange={(e) => setCore((c) => ({ ...c, isactive: e.target.checked }))} id="barActive" /><label className="form-check-label" htmlFor="barActive">Active</label></div></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={saving}>{saving ? "Saving..." : barId ? "Update" : "Create & Continue"}</button>
              {barId && <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCoreModal(false)}>Cancel</button>}
            </div>
          </form>
        </Modal>
      )}

      {!barId && !showCoreModal && <div className="alert alert-info">Save the running bar first — items unlock automatically once it's created.</div>}

      {barId && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Items</h5>
              <button className="btn btn-dark btn-sm" onClick={openNewItem}>+ Add Item</button>
            </div>
            <table className="table table-sm table-bordered align-middle mb-0">
              <thead className="table-light"><tr><th>Text</th><th>Duration</th><th>Order</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {items.length === 0 ? <tr><td colSpan={5} className="text-center text-muted">No items yet.</td></tr> :
                  items.map((i) => (
                    <tr key={i.running_bar_item_id}>
                      <td>{i.itemsdata}</td><td>{i.duration_seconds}s</td><td>{i.display_order}</td>
                      <td><ActiveToggle active={!!i.isactive} onToggle={(next) => toggleItemActive(i, next)} /></td>
                      <td>
                        <button className="btn btn-sm btn-outline-dark me-1" onClick={() => openEditItem(i)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(i)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showItemModal && (
        <Modal title={editingItem ? "Edit Item" : "Add Item"} onClose={() => setShowItemModal(false)}>
          <form onSubmit={submitItem}>
            <div className="row g-3">
              <div className="col-12"><label className="form-label">Text *</label><input className="form-control" value={itemForm.itemsdata} onChange={(e) => setItemForm((i) => ({ ...i, itemsdata: e.target.value }))} required /></div>
              <div className="col-md-6"><label className="form-label">Duration (sec)</label><input type="number" className="form-control" value={itemForm.duration_seconds} onChange={(e) => setItemForm((i) => ({ ...i, duration_seconds: e.target.value }))} /></div>
              <div className="col-md-6"><label className="form-label">Order</label><input type="number" className="form-control" value={itemForm.display_order} onChange={(e) => setItemForm((i) => ({ ...i, display_order: e.target.value }))} /></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark">{editingItem ? "Update" : "Add"}</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowItemModal(false)}>Cancel</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminRunningBarPage;
