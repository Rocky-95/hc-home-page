import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appointmentService from "../../services/appointmentService";
import userService from "../../services/userService";
import "bootstrap/dist/css/bootstrap.min.css";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [dateSlots, setDateSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, dateSlotsRes, timeSlotsRes, profileRes] = await Promise.all([
          appointmentService.getCustomAppointments(),
          appointmentService.getDateSlots(),
          appointmentService.getTimeSlots(),
          userService.getProfile().catch(() => ({ data: null })),
        ]);

        const profile = profileRes.data?.data || profileRes.data;
        const uid = profile?.user_id;
        if (uid) setUserId(uid);

        const allAppointments = appointmentsRes.data?.data || appointmentsRes.data || [];
        const userAppointments = uid
          ? allAppointments.filter((a) => a.user_id === uid)
          : allAppointments;
        setAppointments(userAppointments);
        setDateSlots(dateSlotsRes.data?.data || dateSlotsRes.data || []);
        setTimeSlots(timeSlotsRes.data?.data || timeSlotsRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getSlotDate = (slotId) => {
    const slot = dateSlots.find((s) => s.appointment_date_slot_id === slotId);
    return slot?.slot_date;
  };

  const getSlotTime = (slotId) => {
    const slot = timeSlots.find((s) => s.appointment_time_slot_id === slotId);
    if (!slot) return "";
    return `${slot.slot_start_time || ""} - ${slot.slot_end_time || ""}`;
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      await appointmentService.deleteCustomAppointment({
        appointment_id: appointmentId,
        luu: "website",
      });
      setAppointments((prev) => prev.filter((a) => a.appointment_id !== appointmentId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel appointment");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading appointments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>No appointments yet</h2>
        <p className="text-muted">Book a custom appointment to see it here.</p>
        <Link to="/" className="btn btn-dark mt-3">
          Book Appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Appointments</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {appointments.map((appt) => (
          <div className="col" key={appt.appointment_id}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{appt.name || "Appointment"}</h5>
                  <span className={`badge bg-${appt.appointment_status?.toLowerCase() === "approved" ? "success" : "secondary"}`}>
                    {appt.appointment_status || "Pending"}
                  </span>
                </div>
                <p className="card-text text-muted mb-1">
                  <strong>Date:</strong> {getSlotDate(appt.appointment_date_slot_id) || "N/A"}
                </p>
                <p className="card-text text-muted mb-1">
                  <strong>Time:</strong> {getSlotTime(appt.appointment_time_slot_id) || "N/A"}
                </p>
                <p className="card-text text-muted mb-1">
                  <strong>City:</strong> {appt.city || "N/A"}
                </p>
                <p className="card-text text-muted mb-1">
                  <strong>Occasion:</strong> {appt.occasion || "N/A"}
                </p>
                <p className="card-text text-muted mb-1">
                  <strong>Preferred Delivery:</strong> {appt.preferred_delivery_date || "N/A"}
                </p>
                {appt.appointment_notes && (
                  <p className="card-text text-muted mb-1">
                    <strong>Notes:</strong> {appt.appointment_notes}
                  </p>
                )}
                <button
                  className="btn btn-outline-danger btn-sm mt-3"
                  onClick={() => handleCancel(appt.appointment_id)}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;
