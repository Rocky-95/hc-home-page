import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../services/apiClient";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";
import ActiveToggle from "../components/ActiveToggle";

const RCU = "ADMIN_PORTAL";
const unwrap = (res) => res.data?.data || res.data || [];

const emptyDate = { slot_date: "", slot_duration_minutes: 30, isavailable: true, notes: "" };
const emptyTime = { slot_start_time: "", slot_end_time: "", isavailable: true, notes: "" };
const emptyBlock = { block_start_time: "", block_end_time: "", block_reason: "", blocked_by: "" };

// Appointment booking availability is set up here: a Date Slot (a day that's open for
// booking), and under it, Time Slots (the bookable windows that day) and Slot Blocks
// (lunch/holiday/maintenance blackout windows). Both used to be raw generic CRUD screens
// where staff had to type the parent Date Slot's UUID by hand to link them — now they're
// nested under the date you're already working on. Actual customer bookings are still
// managed on the separate Appointments page.
const AdminAppointmentSlotsPage = () => {
  const [dateSlots, setDateSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState(null);
  const toast = useToast();
  const confirm = useConfirm();

  const fetchDateSlots = useCallback(async () => {
    setLoading(true);
    try { setDateSlots(unwrap(await apiClient.get("/Appointment-Date-Slots"))); }
    catch { setDateSlots([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchDateSlots(); }, [fetchDateSlots]);

  const openNew = () => setWorkspace({ ...emptyDate, appointment_date_slot_id: null });
  const openEdit = (d) => setWorkspace({ ...d });
  const closeWorkspace = () => { setWorkspace(null); fetchDateSlots(); };

  const toggleDateAvailable = async (d, nextAvailable) => {
    try {
      await apiClient.put("/Appointment-Date-Slots", { appointment_date_slot_id: d.appointment_date_slot_id, isavailable: nextAvailable ? 1 : 0, luu: RCU });
      toast.success(`Date ${nextAvailable ? "marked available" : "marked unavailable"}.`);
      fetchDateSlots();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  return (
    <div>
      <h3 className="mb-4">Appointment Availability</h3>

      {!workspace && (
        <div>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-dark" onClick={openNew}>+ Open a Date for Booking</button>
          </div>
          {loading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
            <table className="table table-hover align-middle">
              <thead className="table-dark"><tr><th>Date</th><th>Slot Length</th><th>Available</th><th>Notes</th><th>Actions</th></tr></thead>
              <tbody>
                {dateSlots.length === 0 ? <tr><td colSpan={5} className="text-center text-muted">No dates opened for booking yet.</td></tr> :
                  dateSlots.map((d) => (
                    <tr key={d.appointment_date_slot_id}>
                      <td><strong>{d.slot_date}</strong></td>
                      <td>{d.slot_duration_minutes} min</td>
                      <td><ActiveToggle active={!!d.isavailable} onToggle={(next) => toggleDateAvailable(d, next)} /></td>
                      <td>{d.notes}</td>
                      <td><button className="btn btn-sm btn-outline-dark" onClick={() => openEdit(d)}>Open</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {workspace && <DateSlotWorkspace dateSlot={workspace} onClose={closeWorkspace} toast={toast} confirm={confirm} />}
    </div>
  );
};

const DateSlotWorkspace = ({ dateSlot, onClose, toast, confirm }) => {
  const [core, setCore] = useState({
    slot_date: dateSlot.slot_date ? dateSlot.slot_date.slice(0, 10) : "",
    slot_duration_minutes: dateSlot.slot_duration_minutes || 30,
    isavailable: dateSlot.isavailable !== false,
    notes: dateSlot.notes || "",
  });
  const [dateSlotId, setDateSlotId] = useState(dateSlot.appointment_date_slot_id || null);
  const [saving, setSaving] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(!dateSlotId);

  const [timeSlots, setTimeSlots] = useState([]);
  const [timeForm, setTimeForm] = useState(emptyTime);

  const [blocks, setBlocks] = useState([]);
  const [blockForm, setBlockForm] = useState(emptyBlock);

  const loadChildren = useCallback(async (id) => {
    if (!id) return;
    try {
      const all = unwrap(await apiClient.get("/Appointment-Time-Slots"));
      setTimeSlots(Array.isArray(all) ? all.filter((t) => t.appointment_date_slot_id === id) : []);
    } catch { setTimeSlots([]); }
    try {
      const all = unwrap(await apiClient.get("/Appointment-Slot-Blocks"));
      setBlocks(Array.isArray(all) ? all.filter((b) => b.appointment_date_slot_id === id) : []);
    } catch { setBlocks([]); }
  }, []);

  useEffect(() => { if (dateSlotId) loadChildren(dateSlotId); }, [dateSlotId, loadChildren]);

  const saveCore = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (dateSlotId) {
        await apiClient.put("/Appointment-Date-Slots", { ...core, appointment_date_slot_id: dateSlotId, luu: RCU });
        toast.success("Date updated.");
      } else {
        const res = await apiClient.post("/Appointment-Date-Slots", { ...core, rcu: RCU });
        const newId = res.data?.data?.appointment_date_slot_id || res.data?.appointment_date_slot_id;
        if (!newId) throw new Error("Date slot created but no id was returned.");
        setDateSlotId(newId);
        setShowCoreModal(false);
        toast.success("Date opened — now add time slots below.");
      }
      setShowCoreModal(false);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save date."); }
    finally { setSaving(false); }
  };

  const submitTimeSlot = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/Appointment-Time-Slots", { ...timeForm, appointment_date_slot_id: dateSlotId, display_order: timeSlots.length + 1, rcu: RCU });
      toast.success("Time slot added.");
      setTimeForm(emptyTime); loadChildren(dateSlotId);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to add time slot."); }
  };
  const deleteTimeSlot = async (t) => {
    if (t.isbooked) { toast.error("This slot already has a booking — cancel the appointment first."); return; }
    const ok = await confirm({ title: `Delete the ${t.slot_start_time}–${t.slot_end_time} slot?`, message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Appointment-Time-Slots", { data: { appointment_time_slot_id: t.appointment_time_slot_id, luu: RCU } }); toast.success("Time slot deleted."); loadChildren(dateSlotId); }
    catch { toast.error("Delete failed."); }
  };

  const submitBlock = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/Appointment-Slot-Blocks", { ...blockForm, appointment_date_slot_id: dateSlotId, rcu: RCU });
      toast.success("Block-out added.");
      setBlockForm(emptyBlock); loadChildren(dateSlotId);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to add block-out."); }
  };
  const deleteBlock = async (b) => {
    const ok = await confirm({ title: "Remove this block-out?", confirmLabel: "Remove", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Appointment-Slot-Blocks", { data: { appointment_slot_block_id: b.appointment_slot_block_id, luu: RCU } }); toast.success("Block-out removed."); loadChildren(dateSlotId); }
    catch { toast.error("Delete failed."); }
  };

  return (
    <div>
      <button className="btn btn-link px-0 mb-3" onClick={onClose}>&larr; Back to Dates</button>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">{core.slot_date || "New Date"}</h5>
            <div className="text-muted small">{core.slot_duration_minutes} min slots</div>
          </div>
          {dateSlotId && <button className="btn btn-outline-dark btn-sm" onClick={() => setShowCoreModal(true)}>Edit Details</button>}
        </div>
      </div>

      {showCoreModal && (
        <Modal title={dateSlotId ? "Edit Date" : "Open a New Date"} onClose={() => { if (dateSlotId) setShowCoreModal(false); }}>
          <form onSubmit={saveCore}>
            <div className="row g-3">
              <div className="col-md-4"><label className="form-label">Date *</label><input type="date" className="form-control" value={core.slot_date} onChange={(e) => setCore((c) => ({ ...c, slot_date: e.target.value }))} required /></div>
              <div className="col-md-3"><label className="form-label">Default Slot Length (min)</label><select className="form-select" value={core.slot_duration_minutes} onChange={(e) => setCore((c) => ({ ...c, slot_duration_minutes: parseInt(e.target.value) }))}><option value={30}>30</option><option value={60}>60</option></select></div>
              <div className="col-md-3 d-flex align-items-end"><div className="form-check mb-2"><input type="checkbox" className="form-check-input" checked={core.isavailable} onChange={(e) => setCore((c) => ({ ...c, isavailable: e.target.checked }))} id="dateAvail" /><label className="form-check-label" htmlFor="dateAvail">Available for booking</label></div></div>
              <div className="col-12"><label className="form-label">Notes</label><input className="form-control" value={core.notes} onChange={(e) => setCore((c) => ({ ...c, notes: e.target.value }))} /></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={saving}>{saving ? "Saving..." : dateSlotId ? "Update Date" : "Open Date & Continue"}</button>
              {dateSlotId && <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCoreModal(false)}>Cancel</button>}
            </div>
          </form>
        </Modal>
      )}

      {!dateSlotId && !showCoreModal && <div className="alert alert-info">Save the date first — time slots and block-outs unlock automatically once it's created.</div>}

      {dateSlotId && (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <h5>Time Slots</h5>
              <form onSubmit={submitTimeSlot} className="row g-3 align-items-end mb-3">
                <div className="col-md-3"><label className="form-label">Start Time</label><input type="time" className="form-control" value={timeForm.slot_start_time} onChange={(e) => setTimeForm((t) => ({ ...t, slot_start_time: e.target.value }))} required /></div>
                <div className="col-md-3"><label className="form-label">End Time</label><input type="time" className="form-control" value={timeForm.slot_end_time} onChange={(e) => setTimeForm((t) => ({ ...t, slot_end_time: e.target.value }))} required /></div>
                <div className="col-md-4"><label className="form-label">Notes</label><input className="form-control" value={timeForm.notes} onChange={(e) => setTimeForm((t) => ({ ...t, notes: e.target.value }))} /></div>
                <div className="col-md-2"><button type="submit" className="btn btn-dark btn-sm w-100">+ Add</button></div>
              </form>
              <table className="table table-sm table-bordered align-middle mb-0">
                <thead className="table-light"><tr><th>Start</th><th>End</th><th>Booked?</th><th>Actions</th></tr></thead>
                <tbody>
                  {timeSlots.length === 0 ? <tr><td colSpan={4} className="text-center text-muted">No time slots yet.</td></tr> :
                    timeSlots.map((t) => (
                      <tr key={t.appointment_time_slot_id}>
                        <td>{t.slot_start_time}</td><td>{t.slot_end_time}</td>
                        <td><span className={`badge bg-${t.isbooked ? "warning text-dark" : "success"}`}>{t.isbooked ? "Booked" : "Open"}</span></td>
                        <td><button className="btn btn-sm btn-outline-danger" onClick={() => deleteTimeSlot(t)}>Delete</button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5>Block-outs (lunch / holiday / maintenance)</h5>
              <form onSubmit={submitBlock} className="row g-3 align-items-end mb-3">
                <div className="col-md-2"><label className="form-label">Start</label><input type="time" className="form-control" value={blockForm.block_start_time} onChange={(e) => setBlockForm((b) => ({ ...b, block_start_time: e.target.value }))} required /></div>
                <div className="col-md-2"><label className="form-label">End</label><input type="time" className="form-control" value={blockForm.block_end_time} onChange={(e) => setBlockForm((b) => ({ ...b, block_end_time: e.target.value }))} required /></div>
                <div className="col-md-4"><label className="form-label">Reason</label><input className="form-control" value={blockForm.block_reason} onChange={(e) => setBlockForm((b) => ({ ...b, block_reason: e.target.value }))} /></div>
                <div className="col-md-3"><label className="form-label">Blocked By</label><input className="form-control" value={blockForm.blocked_by} onChange={(e) => setBlockForm((b) => ({ ...b, blocked_by: e.target.value }))} /></div>
                <div className="col-md-1"><button type="submit" className="btn btn-dark btn-sm w-100">+</button></div>
              </form>
              <table className="table table-sm table-bordered align-middle mb-0">
                <thead className="table-light"><tr><th>Start</th><th>End</th><th>Reason</th><th>Blocked By</th><th>Actions</th></tr></thead>
                <tbody>
                  {blocks.length === 0 ? <tr><td colSpan={5} className="text-center text-muted">No block-outs.</td></tr> :
                    blocks.map((b) => (
                      <tr key={b.appointment_slot_block_id}>
                        <td>{b.block_start_time}</td><td>{b.block_end_time}</td><td>{b.block_reason}</td><td>{b.blocked_by}</td>
                        <td><button className="btn btn-sm btn-outline-danger" onClick={() => deleteBlock(b)}>Delete</button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAppointmentSlotsPage;
