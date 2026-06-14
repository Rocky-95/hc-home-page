import React, { useState } from "react";

const CIconModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    deliveryDate: "",
    occasion: "",
    appointmentDate: "",
    appointmentTime: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Error booking appointment");
      }

      setMessage("Appointment booked successfully!");
    } catch (err) {
      setMessage(err.message || "Error booking appointment");
    }
  };

  return (
    <div className="modal fade appointmentForm" id="customModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Book Your Custom Appointment</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            {message && <p>{message}</p>}
            <form id="appointmentForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="deliveryDate">Preferred Delivery Date</label>
                <input type="date" className="form-control" id="deliveryDate" value={formData.deliveryDate} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="occasion">Occasion</label>
                <input type="text" className="form-control" id="occasion" value={formData.occasion} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="appointmentDate">Select Appointment Date</label>
                <input type="date" className="form-control" id="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="appointmentTime">Select Appointment Time</label>
                <input type="time" className="form-control" id="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-dark w-100">Confirm Booking</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIconModal;
