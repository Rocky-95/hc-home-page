import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import "bootstrap/dist/css/bootstrap.min.css";

const emptyAddress = {
  full_name: "",
  mobile_number: "",
  emailid: "",
  house_street: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
  isdefault: false,
};

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyAddress);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  useEffect(() => {
    const storedUser = localStorage.getItem("hc_user");
    let uid = null;
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        uid = parsed.user_id || parsed.id;
      } catch {
        // ignore
      }
    }
    setUserId(uid);

    const fetchData = async () => {
      try {
        const addressesRes = await userService.getAddresses();
        const all = addressesRes.data?.data || addressesRes.data || [];
        setAddresses(uid ? all.filter((a) => a.user_id === uid) : all);
      } catch (err) {
        setMessage({ text: err.response?.data?.message || "Failed to load addresses", isError: true });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyAddress);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", isError: false });
    try {
      if (editingId) {
        await userService.updateAddress({
          address_id: editingId,
          ...form,
          user_id: userId,
          isdefault: form.isdefault ? 1 : 0,
          luu: "website",
        });
      } else {
        await userService.createAddress({
          ...form,
          user_id: userId,
          isdefault: form.isdefault ? 1 : 0,
          rcu: "website",
        });
      }
      const addressesRes = await userService.getAddresses();
      const all = addressesRes.data?.data || addressesRes.data || [];
      setAddresses(userId ? all.filter((a) => a.user_id === userId) : all);
      resetForm();
      setMessage({ text: editingId ? "Address updated" : "Address added", isError: false });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Failed to save address", isError: true });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (addr) => {
    setForm({
      full_name: addr.full_name || "",
      mobile_number: addr.mobile_number || "",
      emailid: addr.emailid || "",
      house_street: addr.house_street || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      landmark: addr.landmark || "",
      isdefault: addr.isdefault === 1 || addr.isdefault === true,
    });
    setEditingId(addr.address_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await userService.deleteAddress({ address_id: id, luu: "website" });
      setAddresses((prev) => prev.filter((a) => a.address_id !== id));
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Failed to delete address", isError: true });
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading addresses...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Addresses</h2>
      {message.text && (
        <div className={`alert ${message.isError ? "alert-danger" : "alert-success"}`}>
          {message.text}
        </div>
      )}
      <div className="row">
        <div className="col-lg-5 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{editingId ? "Edit Address" : "Add Address"}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="full_name" className="form-control" value={form.full_name} onChange={handleChange} required />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mobile</label>
                    <input type="tel" name="mobile_number" className="form-control" value={form.mobile_number} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="emailid" className="form-control" value={form.emailid} onChange={handleChange} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">House / Street</label>
                  <input type="text" name="house_street" className="form-control" value={form.house_street} onChange={handleChange} required />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input type="text" name="city" className="form-control" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <input type="text" name="state" className="form-control" value={form.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pincode</label>
                    <input type="text" name="pincode" className="form-control" value={form.pincode} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Landmark</label>
                    <input type="text" name="landmark" className="form-control" value={form.landmark} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    name="isdefault"
                    className="form-check-input"
                    checked={form.isdefault}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Set as default address</label>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-dark" disabled={saving}>
                    {saving ? "Saving..." : editingId ? "Update Address" : "Add Address"}
                  </button>
                  {editingId && (
                    <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          {addresses.length === 0 ? (
            <p className="text-muted">No saved addresses.</p>
          ) : (
            addresses.map((addr) => (
              <div className="card border-0 shadow-sm mb-3" key={addr.address_id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title mb-1">
                        {addr.full_name}
                        {addr.isdefault === 1 || addr.isdefault === true ? (
                          <span className="badge bg-secondary ms-2">Default</span>
                        ) : null}
                      </h5>
                      <p className="card-text text-muted mb-1">{addr.house_street}</p>
                      <p className="card-text text-muted mb-1">
                        {addr.city}, {addr.state} {addr.pincode}
                      </p>
                      <p className="card-text text-muted mb-1">{addr.mobile_number}</p>
                      {addr.emailid && <p className="card-text text-muted mb-1">{addr.emailid}</p>}
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-dark" onClick={() => handleEdit(addr)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(addr.address_id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressesPage;
