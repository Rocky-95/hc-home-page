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

const emptyCollection = {
  collection_name: "",
  collection_slug: "",
  description: "",
  redirect_link: "",
  cta_text: "",
  display_order: 1,
  isactive: true,
};

// Style Collections (lookbooks) each own a set of media items. Previously both
// tables only existed as raw generic CRUD screens — creating a media item meant
// typing the parent collection's UUID by hand. This page nests media creation
// (with automatic image upload) inside the collection you're already working on.
const AdminStyleCollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState(null); // null = list view
  const toast = useToast();
  const confirm = useConfirm();

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    try { setCollections(unwrap(await apiClient.get("/Style-Collections"))); }
    catch { setCollections([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchCollections(); }, [fetchCollections]);

  const openNew = () => setWorkspace({ ...emptyCollection, style_collection_id: null });
  const openEdit = (c) => setWorkspace({ ...c });
  const closeWorkspace = () => { setWorkspace(null); fetchCollections(); };

  const toggleCollectionActive = async (c, nextActive) => {
    try {
      await apiClient.put("/Style-Collections", { style_collection_id: c.style_collection_id, isactive: nextActive ? 1 : 0, luu: RCU });
      toast.success(`Collection ${nextActive ? "activated" : "deactivated"}.`);
      fetchCollections();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update status."); }
  };

  return (
    <div>
      <h3 className="mb-4">Style by HC — Collections</h3>

      {!workspace && (
        <div>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-dark" onClick={openNew}>+ Add Collection</button>
          </div>
          {loading ? <div className="text-center py-4"><div className="spinner-border" /></div> : (
            <table className="table table-hover align-middle">
              <thead className="table-dark"><tr><th>Name</th><th>Slug</th><th>Order</th><th>Active</th><th>Actions</th></tr></thead>
              <tbody>
                {collections.length === 0 ? <tr><td colSpan={5} className="text-center text-muted">No collections found.</td></tr> :
                  collections.map((c) => (
                    <tr key={c.style_collection_id}>
                      <td><strong>{c.collection_name}</strong></td>
                      <td><code>{c.collection_slug}</code></td>
                      <td>{c.display_order}</td>
                      <td><ActiveToggle active={!!c.isactive} onToggle={(next) => toggleCollectionActive(c, next)} /></td>
                      <td><button className="btn btn-sm btn-outline-dark" onClick={() => openEdit(c)}>Open</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {workspace && (
        <CollectionWorkspace collection={workspace} onClose={closeWorkspace} toast={toast} confirm={confirm} />
      )}
    </div>
  );
};

const CollectionWorkspace = ({ collection, onClose, toast, confirm }) => {
  const [core, setCore] = useState({
    collection_name: collection.collection_name || "",
    collection_slug: collection.collection_slug || "",
    description: collection.description || "",
    redirect_link: collection.redirect_link || "",
    cta_text: collection.cta_text || "",
    display_order: collection.display_order || 1,
    isactive: collection.isactive !== false,
  });
  const [collectionId, setCollectionId] = useState(collection.style_collection_id || null);
  const [saving, setSaving] = useState(false);
  const [showCoreModal, setShowCoreModal] = useState(!collectionId);

  const [media, setMedia] = useState([]);
  const [mediaAlt, setMediaAlt] = useState("");
  const [mediaPrimary, setMediaPrimary] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);

  const loadMedia = useCallback(async (id) => {
    if (!id) return;
    try {
      const all = unwrap(await apiClient.get("/Style-Collection-Media"));
      setMedia(Array.isArray(all) ? all.filter((m) => m.style_collection_id === id) : []);
    } catch { setMedia([]); }
  }, []);

  useEffect(() => { if (collectionId) loadMedia(collectionId); }, [collectionId, loadMedia]);

  const saveCore = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (collectionId) {
        await apiClient.put("/Style-Collections", { ...core, style_collection_id: collectionId, luu: RCU });
        toast.success("Collection updated.");
      } else {
        const res = await apiClient.post("/Style-Collections", { ...core, rcu: RCU });
        const newId = res.data?.data?.style_collection_id || res.data?.style_collection_id;
        if (!newId) throw new Error("Collection created but no id was returned.");
        setCollectionId(newId);
        setShowCoreModal(false);
        toast.success("Collection created — now add media below.");
      }
      setShowCoreModal(false);
    } catch (err) { toast.error(err.response?.data?.message || "Failed to save collection."); }
    finally { setSaving(false); }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !collectionId) return;

    const { valid, error } = validateMediaFile(file);
    if (!valid) { toast.error(error); e.target.value = ""; return; }

    const previewUrl = URL.createObjectURL(file);
    setMediaPreview({ url: previewUrl, isVideo: file.type.startsWith("video") });

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "STYLE_COLLECTION_MEDIA");
      const uploadRes = await authService.uploadFile(fd);
      const url = uploadRes.data?.url || uploadRes.data?.data?.url || uploadRes.data?.virtualPath || "";
      if (!url) throw new Error("Upload succeeded but no file URL was returned.");

      await apiClient.post("/Style-Collection-Media", {
        style_collection_id: collectionId,
        media_type: file.type.startsWith("video") ? "video" : "image",
        media_url: url,
        alt_text: mediaAlt,
        display_order: media.length + 1,
        isprimary: mediaPrimary,
        rcu: RCU,
      });
      toast.success("Image uploaded and attached to collection.");
      setMediaAlt(""); setMediaPrimary(false);
      loadMedia(collectionId);
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
    const ok = await confirm({ title: "Delete this image?", message: "This action cannot be undone.", confirmLabel: "Delete", danger: true });
    if (!ok) return;
    try { await apiClient.delete("/Style-Collection-Media", { data: { style_collection_media_id: m.style_collection_media_id, luu: RCU } }); toast.success("Image deleted."); loadMedia(collectionId); }
    catch { toast.error("Delete failed."); }
  };

  return (
    <div>
      <button className="btn btn-link px-0 mb-3" onClick={onClose}>&larr; Back to Collections</button>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">{core.collection_name || "New Collection"}</h5>
            <div className="text-muted small">{core.collection_slug}</div>
          </div>
          {collectionId && <button className="btn btn-outline-dark btn-sm" onClick={() => setShowCoreModal(true)}>Edit Details</button>}
        </div>
      </div>

      {showCoreModal && (
        <Modal title={collectionId ? "Edit Collection" : "New Collection"} onClose={() => { if (collectionId) setShowCoreModal(false); }} size="lg">
          <form onSubmit={saveCore}>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Collection Name *</label><input className="form-control" value={core.collection_name} onChange={(e) => setCore((c) => ({ ...c, collection_name: e.target.value }))} required /></div>
              <div className="col-md-6"><label className="form-label">Slug</label><input className="form-control" value={core.collection_slug} onChange={(e) => setCore((c) => ({ ...c, collection_slug: e.target.value }))} /></div>
              <div className="col-md-6"><label className="form-label">Redirect Link</label><input className="form-control" value={core.redirect_link} onChange={(e) => setCore((c) => ({ ...c, redirect_link: e.target.value }))} /></div>
              <div className="col-md-3"><label className="form-label">CTA Text</label><input className="form-control" value={core.cta_text} onChange={(e) => setCore((c) => ({ ...c, cta_text: e.target.value }))} /></div>
              <div className="col-md-3"><label className="form-label">Display Order</label><input type="number" className="form-control" value={core.display_order} onChange={(e) => setCore((c) => ({ ...c, display_order: parseInt(e.target.value) || 1 }))} /></div>
              <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows={3} value={core.description} onChange={(e) => setCore((c) => ({ ...c, description: e.target.value }))} /></div>
              <div className="col-12"><div className="form-check"><input type="checkbox" className="form-check-input" checked={core.isactive} onChange={(e) => setCore((c) => ({ ...c, isactive: e.target.checked }))} id="collActive" /><label className="form-check-label" htmlFor="collActive">Active</label></div></div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={saving}>{saving ? "Saving..." : collectionId ? "Update Collection" : "Create Collection & Continue"}</button>
              {collectionId && <button type="button" className="btn btn-outline-secondary" onClick={() => setShowCoreModal(false)}>Cancel</button>}
            </div>
          </form>
        </Modal>
      )}

      {!collectionId && !showCoreModal && <div className="alert alert-info">Save the collection first — media uploads unlock automatically once it's created.</div>}

      {collectionId && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>Media</h5>
            <div className="row g-3 align-items-end mb-3">
              <div className="col-md-4"><label className="form-label">Alt Text</label><input className="form-control" value={mediaAlt} onChange={(e) => setMediaAlt(e.target.value)} /></div>
              <div className="col-md-3"><div className="form-check mt-4"><input type="checkbox" className="form-check-input" checked={mediaPrimary} onChange={(e) => setMediaPrimary(e.target.checked)} id="isPrimary" /><label className="form-check-label" htmlFor="isPrimary">Set as primary</label></div></div>
              <div className="col-md-5">
                <label className="form-label">Upload Image (uploads &amp; attaches automatically)</label>
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
                  <div key={m.style_collection_media_id} className="col-md-3">
                    <div className="card h-100">
                      <img src={m.media_url} alt={m.alt_text || "media"} className="card-img-top" style={{ height: 140, objectFit: "cover" }} onError={(e) => { e.target.src = "https://via.placeholder.com/200x140?text=No+Image"; }} />
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

export default AdminStyleCollectionsPage;
