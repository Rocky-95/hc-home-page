import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../../services/apiClient";
import authService from "../../services/authService";
import { useToast } from "../components/ToastProvider";
import { useConfirm } from "../components/ConfirmProvider";
import Modal from "../components/Modal";
import { validateMediaFile } from "../utils/mediaValidation";
import ActiveToggle from "../components/ActiveToggle";

const RCU = "ADMIN_PORTAL";
const unwrap = (res) => res.data?.data || res.data || [];

const emptyEntry = { title: "", subtitle: "", description: "", redirect_link: "", cta_text: "", display_order: 1, isactive: true };

// A Spotlight Entry owns a set of Media (images/videos). Previously entries and media
// were two tabs on one page, and adding media meant picking its parent entry from a
// dropdown. Now: open an entry from the list, and its media is managed — with automatic
// upload-and-attach — directly underneath it.
const AdminSpotlightMediaPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [workspace, setWorkspace] = useState(null);
  const toast = useToast();
  const confirm = useConfirm();

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try { setEntries(unwrap(await apiClient.get("/Spotlight-Entries"))); }
    catch { setEntries([]); toast.error("Failed to load spotlight entries."); }
    finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fetchEntries(); }, [fetchEntries]);

  const openNew = () => setWorkspace({ ...emptyEntry, spotlight_entry_id: null });
  const openEdit = (e) => setWorkspace({ ...e });
  const closeWorkspace = () => { setWorkspace(null); fetchEntries(); };

  const toggleEntryActive = async (entry, nextActive) => {
    try {
      await apiClient.put("/Spotlight-Entries", { spotlight_entry_id: entry.spotlight_entry_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Entry ${nextActive ? "activated" : "deactivated"}.`);
      fetchEntries();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  const filtered = entries.filter((e) => `${e.title || ""} ${e.subtitle || ""}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h3 className="mb-4">HC Spotlight</h3>

      {!workspace && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input className="form-control w-auto" placeholder="Search entries..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
            <button className="btn btn-dark" onClick={openNew}>+ Add Entry</button>
          </div>
          {loading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
            <table className="table table-hover align-middle">
              <thead className="table-dark"><tr><th>Title</th><th>Subtitle</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 ? <tr><td colSpan={4} className="text-center text-muted">No entries found.</td></tr> :
                  filtered.map((e) => (
                    <tr key={e.spotlight_entry_id}>
                      <td><strong>{e.title}</strong></td>
                      <td>{e.subtitle}</td>
                      <td><ActiveToggle active={!!e.isactive} onToggle={(next) => toggleEntryActive(e, next)} /></td>
                      <td><button className="btn btn-sm btn-outline-dark" onClick={() => openEdit(e)}>Open</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {workspace && <SpotlightEntryWorkspace entry={workspace} onClose={closeWorkspace} toast={toast} confirm={confirm} />}
    </div>
  );
};

const SpotlightEntryWorkspace = ({ entry, onClose, toast, confirm }) => {
  const [core, setCore] = useState({
    title: entry.title || "",
    subtitle: entry.subtitle || "",
    description: entry.description || "",
    redirect_link: entry.redirect_link || "",
    cta_text: entry.cta_text || "",
    display_order: entry.display_order || 1,
    isactive: entry.isactive !== false,
  });
  const [entryId, setEntryId] = useState(entry.spotlight_entry_id || null);
  const [saving, setSaving] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(!entryId);

  const [media, setMedia] = useState([]);
  const [mediaAlt, setMediaAlt] = useState("");
  const [mediaPrimary, setMediaPrimary] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);

  const loadMedia = useCallback(async (id) => {
    if (!id) return;
    try {
      const all = unwrap(await apiClient.get("/Spotlight-Media"));
      setMedia(Array.isArray(all) ? all.filter((m) => m.spotlight_entry_id === id) : []);
    } catch { setMedia([]); }
  }, []);

  useEffect(() => { if (entryId) loadMedia(entryId); }, [entryId, loadMedia]);

  const saveCore = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...core, isactive: core.isactive ? 1 : 0 };
      if (entryId) {
        await apiClient.put("/Spotlight-Entries", { ...payload, spotlight_entry_id: entryId, luu: RCU });
        toast.success("Entry updated.");
      } else {
        const res = await apiClient.post("/Spotlight-Entries", { ...payload, rcu: RCU });
        const newId = res.data?.data?.spotlight_entry_id || res.data?.spotlight_entry_id;
        if (!newId) throw new Error("Entry created but no id was returned.");
        setEntryId(newId);
        setShowCoreModal(false);
        toast.success("Entry created — now add media below.");
      }
      setShowCoreModal(false);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save entry."); }
    finally { setSaving(false); }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !entryId) return;

    const { valid, error } = validateMediaFile(file);
    if (!valid) { toast.error(error); e.target.value = ""; return; }

    const previewUrl = URL.createObjectURL(file);
    setMediaPreview({ url: previewUrl, isVideo: file.type.startsWith("video") });

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "SPOTLIGHT_MEDIA");
      const uploadRes = await authService.uploadFile(fd);
      const url = uploadRes.data?.url || uploadRes.data?.data?.url || uploadRes.data?.virtualPath || "";
      if (!url) throw new Error("Upload succeeded but no file URL was returned.");

      await apiClient.post("/Spotlight-Media", {
        spotlight_entry_id: entryId,
        media_type: file.type.startsWith("video") ? "video" : "image",
        media_url: url,
        alt_text: mediaAlt,
        display_order: media.length + 1,
        isprimary: mediaPrimary,
        rcu: RCU,
      });
      toast.success("Media uploaded and attached to entry.");
      setMediaAlt(""); setMediaPrimary(false);
      loadMedia(entryId);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Upload failed.");
    } finally {
      setUploading(false);
      URL.revokeObjectURL(previewUrl);
      setMediaPreview(null);
      e.target.value = "";
    }
  };

  const deleteMedia = async (m) => {
    const ok = await confirm({ title: "Delete this media?", message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Spotlight-Media", { data: { spotlight_media_id: m.spotlight_media_id, luu: RCU } }); toast.success("Media deleted."); loadMedia(entryId); }
    catch { toast.error("Delete failed."); }
  };

  return (
    <div>
      <button className="btn btn-link px-0 mb-3" onClick={onClose}>&larr; Back to Spotlight</button>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">{core.title || "New Entry"}</h5>
            <div className="text-muted small">{core.subtitle}</div>
          </div>
          {entryId && <button className="btn btn-outline-dark btn-sm" onClick={() => setShowCoreModal(true)}>Edit Details</button>}
        </div>
      </div>

      {showCoreModal && (
        <Modal title={entryId ? "Edit Entry" : "New Entry"} onClose={() => { if (entryId) setShowCoreModal(false); }} size="lg">
          <form onSubmit={saveCore}>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Title *</label><input className="form-control" value={core.title} onChange={(e) => setCore((c) => ({ ...c, title: e.target.value }))} required /></div>
              <div className="col-md-6"><label className="form-label">Subtitle</label><input className="form-control" value={core.subtitle} onChange={(e) => setCore((c) => ({ ...c, subtitle: e.target.value }))} /></div>
              <div className="col-md-4"><label className="form-label">Display Order</label><input type="number" className="form-control" value={core.display_order} onChange={(e) => setCore((c) => ({ ...c, display_order: e.target.value }))} /></div>
              <div className="col-md-6"><label className="form-label">Redirect Link</label><input className="form-control" value={core.redirect_link} onChange={(e) => setCore((c) => ({ ...c, redirect_link: e.target.value }))} placeholder="/wedding" /></div>
              <div className="col-md-6"><label className="form-label">CTA Text</label><input className="form-control" value={core.cta_text} onChange={(e) => setCore((c) => ({ ...c, cta_text: e.target.value }))} /></div>
              <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows={3} value={core.description} onChange={(e) => setCore((c) => ({ ...c, description: e.target.value }))} /></div>
              <div className="col-12"><div className="form-check"><input type="checkbox" className="form-check-input" checked={core.isactive} onChange={(e) => setCore((c) => ({ ...c, isactive: e.target.checked }))} id="entryActive" /><label className="form-check-label" htmlFor="entryActive">Active</label></div></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={saving}>{saving ? "Saving..." : entryId ? "Update Entry" : "Create Entry & Continue"}</button>
              {entryId && <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCoreModal(false)}>Cancel</button>}
            </div>
          </form>
        </Modal>
      )}

      {!entryId && !showCoreModal && <div className="alert alert-info">Save the entry first — media uploads unlock automatically once it's created.</div>}

      {entryId && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>Media</h5>
            <div className="row g-3 align-items-end mb-3">
              <div className="col-md-4"><label className="form-label">Alt Text / Badge</label><input className="form-control" value={mediaAlt} onChange={(e) => setMediaAlt(e.target.value)} /></div>
              <div className="col-md-3"><div className="form-check mt-4"><input type="checkbox" className="form-check-input" checked={mediaPrimary} onChange={(e) => setMediaPrimary(e.target.checked)} id="isPrimary" /><label className="form-check-label" htmlFor="isPrimary">Set as primary</label></div></div>
              <div className="col-md-5">
                <label className="form-label">Upload Media (uploads &amp; attaches automatically)</label>
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime" className="form-control" onChange={handleFileChange} disabled={uploading} />
                <div className="form-text">JPG, PNG, WEBP, GIF images or MP4, WEBM, MOV videos.</div>
                {mediaPreview && (
                  <div className="mt-2">
                    {mediaPreview.isVideo ? (
                      <video src={mediaPreview.url} style={{ height: 90, borderRadius: 6 }} muted autoPlay loop />
                    ) : (
                      <img src={mediaPreview.url} alt="preview" style={{ height: 90, borderRadius: 6, objectFit: "cover" }} />
                    )}
                    {uploading && <div className="form-text">Uploading...</div>}
                  </div>
                )}
              </div>
            </div>
            <div className="row g-3">
              {media.length === 0 ? <p className="text-muted">No media yet.</p> :
                media.map((m) => (
                  <div key={m.spotlight_media_id} className="col-md-3">
                    <div className="card h-100">
                      {m.media_type === "video" ? (
                        <video src={m.media_url} style={{ height: 140, objectFit: "cover" }} muted className="card-img-top" />
                      ) : (
                        <img src={m.media_url} alt={m.alt_text || "media"} className="card-img-top" style={{ height: 140, objectFit: "cover" }} onError={(e) => { e.target.src = "https://via.placeholder.com/200x140?text=No+Image"; }} />
                      )}
                      <div className="card-body p-2">
                        <small>{m.alt_text}</small>
                        {m.isprimary && <span className="badge bg-warning text-dark ms-1">Primary</span>}
                      </div>
                      <div className="card-footer p-2">
                        <button className="btn btn-sm btn-outline-danger w-100" onClick={() => deleteMedia(m)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSpotlightMediaPage;
