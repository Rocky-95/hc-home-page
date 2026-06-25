import React, { useEffect, useState } from "react";
import "../styles/CIconModal.css";
import appointmentService from "../../services/appointmentService";

const initialFormData = {
  name: "",
  city: "",
  deliveryDate: "",
  occasion: "",
  dateSlotId: "",
  timeSlotId: "",
};

const CIconModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dateSlots, setDateSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const fetchSlots = async () => {
      try {
        const [dateRes, timeRes] = await Promise.all([
          appointmentService.getDateSlots(),
          appointmentService.getTimeSlots(),
        ]);
        const dates = dateRes.data?.data || dateRes.data || [];
        const times = timeRes.data?.data || timeRes.data || [];
        setDateSlots(dates.filter((d) => d.isavailable !== false && d.isactive !== false));
        setTimeSlots(times.filter((t) => t.isavailable !== false && t.isactive !== false));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load appointment slots.");
      }
    };
    fetchSlots();
  }, [isOpen]);

  useEffect(() => {
    if (!showSuccess) {
      return undefined;
    }

    const timer = window.setTimeout(() => setShowSuccess(false), 5000);
    return () => window.clearTimeout(timer);
  }, [showSuccess]);

  const handleChange = (e) => {
    setFormData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const storedUser = localStorage.getItem("hc_user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      await appointmentService.createCustomAppointment({
        user_id: user?.user_id || user?.id || null,
        appointment_date_slot_id: formData.dateSlotId || null,
        appointment_time_slot_id: formData.timeSlotId || null,
        name: formData.name,
        city: formData.city,
        preferred_delivery_date: formData.deliveryDate,
        occasion: formData.occasion,
        appointment_status: "Pending",
        appointment_notes: `Requested date slot ${formData.dateSlotId}, time slot ${formData.timeSlotId}`,
        rcu: "customer",
      });

      setFormData(initialFormData);
      handleClose();
      setShowSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to send your details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="appointment-modal-backdrop"
          role="presentation"
          onMouseDown={() => !isSubmitting && handleClose()}
        >
          <div
            className="modal-dialog modal-dialog-centered appointmentForm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <span className="appointment-modal-eyebrow">
                    Harry Clinton
                  </span>
                  <h5 className="modal-title" id="appointment-modal-title">
                    Your Custom Design Appointment
                  </h5>
                  <p className="appointment-modal-subtitle">
                    Share your occasion and preferred schedule with our design
                    team.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                  disabled={isSubmitting}
                ></button>
              </div>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form id="appointmentForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="deliveryDate" className="form-label">
                      Preferred Delivery Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="deliveryDate"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="occasion" className="form-label">
                      Occasion
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      placeholder="Wedding, reception..."
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dateSlotId" className="form-label">
                      Appointment Date
                    </label>
                    <select
                      className="form-control"
                      id="dateSlotId"
                      name="dateSlotId"
                      value={formData.dateSlotId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a date</option>
                      {dateSlots.map((slot) => (
                        <option key={slot.appointment_date_slot_id} value={slot.appointment_date_slot_id}>
                          {slot.slot_date ? new Date(slot.slot_date).toLocaleDateString("en-IN", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }) : slot.appointment_date_slot_id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="timeSlotId" className="form-label">
                      Appointment Time
                    </label>
                    <select
                      className="form-control"
                      id="timeSlotId"
                      name="timeSlotId"
                      value={formData.timeSlotId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.appointment_time_slot_id} value={slot.appointment_time_slot_id}>
                          {slot.slot_start_time || ""} - {slot.slot_end_time || ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="appointment-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="appointment-success-toast" role="status" aria-live="polite">
          <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
          <span>
            Your details have been sent to the team. Our designer will contact
            you soon.
          </span>
        </div>
      )}
    </>
  );
};

export default CIconModal;
