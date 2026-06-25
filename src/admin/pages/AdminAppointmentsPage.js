import React, { useEffect, useMemo, useState } from "react";
import appointmentService from "../../services/appointmentService";
import userService from "../../services/userService";

const statusOptions = ["Pending", "Approved", "Completed", "Cancelled"];

const AdminAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [dateSlots, setDateSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState({});
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, dateSlotsRes, timeSlotsRes, usersRes] = await Promise.all([
          appointmentService.getCustomAppointments(),
          appointmentService.getDateSlots(),
          appointmentService.getTimeSlots(),
          userService.getUsers(),
        ]);
        setAppointments(appointmentsRes.data?.data || appointmentsRes.data || []);
        setDateSlots(dateSlotsRes.data?.data || dateSlotsRes.data || []);
        setTimeSlots(timeSlotsRes.data?.data || timeSlotsRes.data || []);
        setUsers(usersRes.data?.data || usersRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.user_id === userId || u.id === userId);
    return user?.full_name || user?.email_id || "Guest";
  };

  const getSlotDate = (slotId) => {
    const slot = dateSlots.find((s) => s.appointment_date_slot_id === slotId);
    return slot?.slot_date;
  };

  const getSlotTime = (slotId) => {
    const slot = timeSlots.find((s) => s.appointment_time_slot_id === slotId);
    if (!slot) return "";
    return `${slot.slot_start_time || ""} - ${slot.slot_end_time || ""}`;
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await appointmentService.updateCustomAppointment({
        appointment_id: appointmentId,
        appointment_status: newStatus.toLowerCase(),
        approved_at: newStatus.toLowerCase() === "approved" ? new Date().toISOString() : null,
        luu: "admin",
      });
      const res = await appointmentService.getCustomAppointments();
      setAppointments(res.data?.data || res.data || []);
      setMessage(`Appointment ${newStatus.toLowerCase()}.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update appointment status.");
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await appointmentService.deleteCustomAppointment({
        appointment_id: appointmentId,
        luu: "admin",
      });
      const res = await appointmentService.getCustomAppointments();
      setAppointments(res.data?.data || res.data || []);
      setMessage("Appointment cancelled.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel appointment.");
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort(
      (a, b) => new Date(b.created_at || b.appointment_date || 0) - new Date(a.created_at || a.appointment_date || 0)
    );
  }, [appointments]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading appointments...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4">Appointment Management</h3>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {sortedAppointments.length === 0 ? (
        <p className="text-muted">No appointments found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Customer</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.map((appt) => (
                <React.Fragment key={appt.appointment_id}>
                  <tr onClick={() => toggleExpand(appt.appointment_id)} style={{ cursor: "pointer" }}>
                    <td>{getUserName(appt.user_id)}</td>
                    <td>{appt.name || "N/A"}</td>
                    <td>{getSlotDate(appt.appointment_date_slot_id) || "N/A"}</td>
                    <td>{getSlotTime(appt.appointment_time_slot_id) || "N/A"}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          appt.appointment_status?.toLowerCase() === "approved"
                            ? "success"
                            : appt.appointment_status?.toLowerCase() === "cancelled"
                            ? "danger"
                            : appt.appointment_status?.toLowerCase() === "completed"
                            ? "dark"
                            : "warning"
                        }`}
                      >
                        {appt.appointment_status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancel(appt.appointment_id);
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                  {expanded[appt.appointment_id] && (
                    <tr>
                      <td colSpan="6" className="bg-light">
                        <div className="p-3">
                          <div className="row">
                            <div className="col-md-4">
                              <p className="mb-1">
                                <strong>City:</strong> {appt.city || "N/A"}
                              </p>
                              <p className="mb-1">
                                <strong>Occasion:</strong> {appt.occasion || "N/A"}
                              </p>
                              <p className="mb-1">
                                <strong>Preferred Delivery:</strong> {appt.preferred_delivery_date || "N/A"}
                              </p>
                            </div>
                            <div className="col-md-8">
                              <p className="mb-1">
                                <strong>Notes:</strong> {appt.appointment_notes || "N/A"}
                              </p>
                              <div className="d-flex align-items-center gap-2 mt-3">
                                <span className="fw-semibold">Update Status:</span>
                                <select
                                  className="form-select w-auto"
                                  value={statusUpdates[appt.appointment_id] || appt.appointment_status || "Pending"}
                                  onChange={(e) =>
                                    setStatusUpdates((prev) => ({
                                      ...prev,
                                      [appt.appointment_id]: e.target.value,
                                    }))
                                  }
                                >
                                  {statusOptions.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  className="btn btn-dark btn-sm"
                                  onClick={() =>
                                    handleStatusChange(
                                      appt.appointment_id,
                                      statusUpdates[appt.appointment_id] || appt.appointment_status || "Pending"
                                    )
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentsPage;
