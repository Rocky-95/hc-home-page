import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import authService from "../../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    emailid: "",
    mobile_number: "",
    gender: "",
    dateofbirth: "",
    profile_url: "",
    isactive: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  useEffect(() => {
    const storedUser = localStorage.getItem("hc_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserId(parsed.user_id || parsed.id);
      } catch {
        // ignore
      }
    }

    const fetchProfile = async () => {
      try {
        const res = await userService.getProfile();
        const list = res.data?.data || res.data || [];
        const profiles = Array.isArray(list) ? list : [list];
        const p = profiles.find((profile) => profile.user_id === userId) || profiles[0] || null;
        setProfile(p);
        if (p) {
          setForm({
            fullname: p.fullname || "",
            emailid: p.emailid || "",
            mobile_number: p.mobile_number || "",
            gender: p.gender || "",
            dateofbirth: p.dateofbirth ? p.dateofbirth.split("T")[0] : "",
            profile_url: p.profile_url || "",
            isactive: p.isactive !== false && p.isactive !== 0,
          });
        }
      } catch (err) {
        setMessage({ text: err.response?.data?.message || "Failed to load profile", isError: true });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, profile_url: objectUrl }));

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await authService.uploadFile(formData);
      const url = res.data?.url || res.data?.data?.url || res.data?.fileUrl;
      if (url) {
        setForm((prev) => ({ ...prev, profile_url: url }));
        setMessage({ text: "Photo uploaded successfully", isError: false });
      } else {
        setMessage({ text: "Upload did not return a URL. Using local preview.", isError: true });
      }
    } catch (err) {
      console.error("Photo upload failed", err);
      setMessage({
        text: "Photo upload failed. You can enter a URL manually or try again.",
        isError: true,
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", isError: false });
    try {
      const payload = {
        ...form,
        isactive: form.isactive ? 1 : 0,
      };
      if (profile?.profile_id) {
        await userService.updateProfile({
          ...profile,
          ...payload,
          profile_id: profile.profile_id,
          user_id: profile.user_id || userId,
          luu: "website",
        });
      } else {
        await userService.createProfile({
          ...payload,
          user_id: userId,
          rcu: "website",
        });
      }
      setMessage({ text: "Profile saved successfully", isError: false });
      const res = await userService.getProfile();
      const list = res.data?.data || res.data || [];
      const profiles = Array.isArray(list) ? list : [list];
      const p = profiles.find((profile) => profile.user_id === userId) || profiles[0] || null;
      setProfile(p);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Failed to save profile", isError: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Profile</h2>
      {message.text && (
        <div className={`alert ${message.isError ? "alert-danger" : "alert-success"}`}>
          {message.text}
        </div>
      )}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  value={form.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="emailid"
                  className="form-control"
                  value={form.emailid}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile_number"
                  className="form-control"
                  value={form.mobile_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dateofbirth"
                  className="form-control"
                  value={form.dateofbirth}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handlePhotoChange}
                  disabled={uploadingPhoto}
                />
                <input
                  type="url"
                  name="profile_url"
                  className="form-control mt-2"
                  placeholder="Or enter image URL"
                  value={form.profile_url}
                  onChange={handleChange}
                />
                {uploadingPhoto && <div className="form-text">Uploading photo...</div>}
                {form.profile_url && (
                  <img
                    src={form.profile_url}
                    alt="Profile preview"
                    className="mt-2 rounded"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
              </div>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="isactive"
                className="form-check-input"
                checked={form.isactive}
                onChange={handleChange}
                id="profileIsActive"
              />
              <label className="form-check-label" htmlFor="profileIsActive">
                Active profile
              </label>
            </div>
            <button type="submit" className="btn btn-dark" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
