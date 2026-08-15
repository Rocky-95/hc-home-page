import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../services/apiClient";
import authService from "../../services/authService";
import { useToast } from "../components/ToastProvider";
import { validateMediaFile } from "../utils/mediaValidation";
import { resolveUploadUrl } from "../utils/resolveUploadUrl";

const RCU = "ADMIN_PORTAL";
const unwrap = (res) => res.data?.data || res.data || [];

const emptySettings = {
  site_name: "",
  header_logo_url: "",
  brand_logo_url: "",
  footer_logo_url: "",
  brand_description: "",
  newsletter_title: "",
  newsletter_description: "",
  ismaintenance_mode: false,
};

// tbl_settings is a singleton — the site only ever has one active row of settings,
// not a list of key/value pairs. This was previously modeled as a generic key/value
// CRUD table, which doesn't match the real schema at all and couldn't actually save
// anything meaningful. Rewritten as a single edit form for the one settings row.
const AdminSettingsPage = () => {
  const [form, setForm] = useState(emptySettings);
  const [settingId, setSettingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({});
  const [previews, setPreviews] = useState({});
  const toast = useToast();

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const rows = unwrap(await apiClient.get("/Settings"));
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (row) {
        setSettingId(row.setting_id);
        setForm({
          site_name: row.site_name || "",
          header_logo_url: row.header_logo_url || "",
          brand_logo_url: row.brand_logo_url || "",
          footer_logo_url: row.footer_logo_url || "",
          brand_description: row.brand_description || "",
          newsletter_title: row.newsletter_title || "",
          newsletter_description: row.newsletter_description || "",
          ismaintenance_mode: !!row.ismaintenance_mode,
        });
      }
    } catch { toast.error("Failed to load settings."); }
    finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleFileUpload = (field) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { valid, error } = validateMediaFile(file, { allowVideo: false });
    if (!valid) { toast.error(error); e.target.value = ""; return; }

    const previewUrl = URL.createObjectURL(file);
    setPreviews((p) => ({ ...p, [field]: previewUrl }));

    setUploading((u) => ({ ...u, [field]: true }));
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "SITE_BRANDING");
      const res = await authService.uploadFile(fd);
      const raw = res.data?.url || res.data?.data?.url || res.data?.virtualPath || "";
      const url = resolveUploadUrl(raw);
      if (url) { setForm((f) => ({ ...f, [field]: url })); toast.success("Logo uploaded."); }
      else toast.error("Upload failed.");
    } catch { toast.error("Upload failed."); }
    finally {
      setUploading((u) => ({ ...u, [field]: false }));
      URL.revokeObjectURL(previewUrl);
      setPreviews((p) => ({ ...p, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, ismaintenance_mode: form.ismaintenance_mode ? 1 : 0 };
      if (settingId) {
        await apiClient.put("/Settings", { ...payload, setting_id: settingId, luu: RCU });
      } else {
        const res = await apiClient.post("/Settings", { ...payload, rcu: RCU });
        setSettingId(res.data?.data?.setting_id || res.data?.setting_id || null);
      }
      toast.success("Settings saved.");
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save settings."); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="text-center py-4"><div className="spinner-border" /></div>;

  const logoField = (field, label) => (
    <div className="col-md-4">
      <label className="form-label">{label}</label>
      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="form-control mb-2" onChange={handleFileUpload(field)} disabled={uploading[field]} />
      <div className="form-text">JPG, PNG, WEBP, or GIF.</div>
      {previews[field] ? (
        <img src={previews[field]} alt={`${label} preview`} style={{ height: 60, objectFit: "contain" }} />
      ) : (
        form[field] && <img src={form[field]} alt={label} style={{ height: 60, objectFit: "contain" }} onError={(e) => (e.target.style.display = "none")} />
      )}
      {uploading[field] && <div className="form-text">Uploading...</div>}
    </div>
  );

  return (
    <div>
      <h3 className="mb-4">Site Settings</h3>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Site Name</label><input className="form-control" value={form.site_name} onChange={(e) => setForm((f) => ({ ...f, site_name: e.target.value }))} /></div>
              <div className="col-md-6 d-flex align-items-end"><div className="form-check mb-2"><input type="checkbox" className="form-check-input" checked={form.ismaintenance_mode} onChange={(e) => setForm((f) => ({ ...f, ismaintenance_mode: e.target.checked }))} id="maintMode" /><label className="form-check-label" htmlFor="maintMode">Maintenance Mode</label></div></div>

              {logoField("header_logo_url", "Header Logo")}
              {logoField("brand_logo_url", "Brand Logo")}
              {logoField("footer_logo_url", "Footer Logo")}

              <div className="col-12"><label className="form-label">Brand Description</label><textarea className="form-control" rows={3} value={form.brand_description} onChange={(e) => setForm((f) => ({ ...f, brand_description: e.target.value }))} /></div>
              <div className="col-md-6"><label className="form-label">Newsletter Title</label><input className="form-control" value={form.newsletter_title} onChange={(e) => setForm((f) => ({ ...f, newsletter_title: e.target.value }))} /></div>
              <div className="col-12"><label className="form-label">Newsletter Description</label><textarea className="form-control" rows={2} value={form.newsletter_description} onChange={(e) => setForm((f) => ({ ...f, newsletter_description: e.target.value }))} /></div>
            </div>
            <div className="mt-3"><button type="submit" className="btn btn-dark" disabled={saving}>{saving ? "Saving..." : "Save Settings"}</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
