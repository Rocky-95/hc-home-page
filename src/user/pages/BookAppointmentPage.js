import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appointmentService from "../../services/appointmentService";
import "bootstrap/dist/css/bootstrap.min.css";

const emptyForm = {
  name: "",
  mobile_number: "",
  emailid: "",
  city: "",
  occasion: "",
  preferred_delivery_date: "",
  appointment_notes: "",
  appointment_date_slot_id: "",
  appointment_time_slot_id: "",
};

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const [dateSlots, setDateSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", isError: false });

  useEffect(() => {
    const token = localStorage.getItem("hc_token");
    const session = localStorage.getItem("hc_session");
    if (!token && !session) {
      navigate("/login", { state: { from: "/book-appointment" } });
      return;
    }

    const user = JSON.parse(localStorage.getItem("hc_user") || "{}");
    setForm((prev) => ({
      ...prev,
      name: user.full_name || "",
      emailid: user.email_id || "",
      mobile_number: user.mobile_number || "",
    }));

    const fetchSlots = async () => {
      try {
        const [dateRes, timeRes] = await Promise.all([
          appointmentService.getDateSlots(),
          appointmentService.getTimeSlots(),
        ]);
        const dates = dateRes.data?.data || dateRes.data || [];
        const times = timeRes.data?.data || timeRes.data || [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const activeSlots = dates.filter((d) => {
          if (!d.isactive && d.isactive !== undefined) return false;
          if (d.slot_date) return new Date(d.slot_date) >= today;
          return true;
        });
        setDateSlots(activeSlots);
        setTimeSlots(times.filter((t) => t.isactive !== false && t.isactive !== 0));
      } catch {
        setMessage({ text: "Could not load appointment slots.", isError: true });
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.appointment_date_slot_id || !form.appointment_time_slot_id) {
      setMessage({ text: "Please select a date and time slot.", isError: true });
      return;
    }
    setSubmitting(true);
    setMessage({ text: "", isError: false });
    try {
      const user = JSON.parse(localStorage.getItem("hc_user") || "{}");
      const userId = user.user_id || user.id;
      await appointmentService.createCustomAppointment({
        ...form,
        user_id: userId || null,
        appointment_status: "Pending",
        rcu: "website",
      });
      setMessage({ text: "Appointment booked successfully! We'll confirm shortly.", isError: false });
      setForm(emptyForm);
      setTimeout(() => navigate("/appointments"), 2500);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to book appointment. Please try again.",
        isError: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 700 }}>
      <h2 className="mb-2 fw-bold">Book an Appointment</h2>
      <p className="text-muted mb-4">Schedule a personal styling session with our expert tailors.</p>

      {message.text && (
        <div className={`alert ${message.isError ? "alert-danger" : "alert-success"}`}>
          {message.text}
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <h5 className="fw-semibold mb-3">Personal Details</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label">Full Name *</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile Number *</label>
                <input
                  className="form-control"
                  name="mobile_number"
                  value={form.mobile_number}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="emailid"
                  value={form.emailid}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">City *</label>
                <input
                  className="form-control"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Chennai"
                />
              </div>
            </div>

            <h5 className="fw-semibold mb-3">Appointment Details</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label">Occasion *</label>
                <select className="form-select" name="occasion" value={form.occasion} onChange={handleChange} required>
                  <option value="">-- Select Occasion --</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Business">Business</option>
                  <option value="Party">Party / Event</option>
                  <option value="Casual">Casual Styling</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Preferred Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="preferred_delivery_date"
                  value={form.preferred_delivery_date}
                  onChange={handleChange}
                  min={new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0]}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Appointment Date *</label>
                {dateSlots.length === 0 ? (
                  <div className="alert alert-warning py-2 mb-0">No available dates. Please check back soon.</div>
                ) : (
                  <select
                    className="form-select"
                    name="appointment_date_slot_id"
                    value={form.appointment_date_slot_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Date --</option>
                    {dateSlots.map((d) => (
                      <option key={d.appointment_date_slot_id} value={d.appointment_date_slot_id}>
                        {d.slot_date
                          ? new Date(d.slot_date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
                          : d.slot_label || d.appointment_date_slot_id}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Appointment Time *</label>
                {timeSlots.length === 0 ? (
                  <div className="alert alert-warning py-2 mb-0">No time slots available.</div>
                ) : (
                  <select
                    className="form-select"
                    name="appointment_time_slot_id"
                    value={form.appointment_time_slot_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Time --</option>
                    {timeSlots.map((t) => (
                      <option key={t.appointment_time_slot_id} value={t.appointment_time_slot_id}>
                        {t.slot_start_time && t.slot_end_time
                          ? `${t.slot_start_time} – ${t.slot_end_time}`
                          : t.slot_label || t.appointment_time_slot_id}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">Notes / Requests</label>
                <textarea
                  className="form-control"
                  name="appointment_notes"
                  value={form.appointment_notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific requirements, measurements, style preferences..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-2 fw-semibold"
              disabled={submitting}
            >
              {submitting ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
