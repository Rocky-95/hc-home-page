import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import authService from "../../services/authService";

const RCU = "ADMIN_PORTAL";

const emptyEntry = {
  title: "",
  subtitle: "",
  description: "",
  start_date: "",
  end_date: "",
  redirect_link: "",
  isactive: true,
};

const emptyMedia = {
  spotlight_entry_id: "",
  media_url: "",
  media_type: "image",
  alt_text: "",
  redirect_link: "",
  display_order: 1,
  isactive: true,
};

const AdminSpotlightMediaPage = () => {
  const [activeTab, setActiveTab] = useState("entries");
  const [entries, setEntries] = useState([]);
  const [media, setMedia] = useState([]);
  const [entryForm, setEntryForm] = useState(emptyEntry);
  const [mediaForm, setMediaForm] = useState(emptyMedia);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editingMedia, setEditingMedia] = useState(null);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ text: "", isError: false });

  const flash = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: "", isError: false }), 4000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [entriesRes, mediaRes] = await Promise.all([
        api.get("/Spotlight-Entries"),
        api.get("/Spotlight-Media"),
      ]);
      setEntries(entriesRes.data?.data || entriesRes.data || []);
      setMedia(mediaRes.data?.data || mediaRes.data || []);
    } catch {
      flash("Failed to load spotlight data.", true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "SPOTLIGHT_MEDIA");
      const res = await authService.uploadFile(fd);
      const url = res.data?.url || res.data?.data?.url || res.data?.fileUrl || "";
      setMediaForm((prev) => ({ ...prev, media_url: url || URL.createObjectURL(file) }));
      flash(url ? "Media uploaded." : "Upload done (using preview URL).");
    } catch {
      flash("Upload failed. Using local preview.", true);
      setMediaForm((prev) => ({ ...prev, media_url: URL.createObjectURL(file) }));
    } finally {
      setUploading(false);
    }
  };

  const handleEntrySubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...entryForm,
        isactive: entryForm.isactive ? 1 : 0,
      };
      if (editingEntry) {
        await api.put("/Spotlight-Entries", { ...payload, spotlight_entry_id: editingEntry.spotlight_entry_id, luu: RCU });
        flash("Spotlight entry updated.");
      } else {
        await api.post("/Spotlight-Entries", { ...payload, rcu: RCU });
        flash("Spotlight entry created.");
      }
      setShowEntryForm(false);
      setEditingEntry(null);
      setEntryForm(emptyEntry);
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Failed to save spotlight entry.", true);
    }
  };

  const handleMediaSubmit = async (e) => {
    e.preventDefault();
    if (!mediaForm.spotlight_entry_id) {
      flash("Please select a spotlight entry.", true);
      return;
    }
    try {
      const payload = {
        ...mediaForm,
        spotlight_entry_id: mediaForm.spotlight_entry_id,
        display_order: parseInt(mediaForm.display_order) || 1,
        isactive: mediaForm.isactive ? 1 : 0,
      };
      if (editingMedia) {
        await api.put("/Spotlight-Media", { ...payload, spotlight_media_id: editingMedia.spotlight_media_id, luu: RCU });
        flash("Spotlight media updated.");
      } else {
        await api.post("/Spotlight-Media", { ...payload, rcu: RCU });
        flash("Spotlight media created.");
      }
      setShowMediaForm(false);
      setEditingMedia(null);
      setMediaForm(emptyMedia);
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Failed to save spotlight media.", true);
    }
  };

  const handleDeleteEntry = async (item) => {
    if (!window.confirm(`Delete entry "${item.title}"?`)) return;
    try {
      await api.delete("/Spotlight-Entries", { data: { spotlight_entry_id: item.spotlight_entry_id, luu: RCU } });
      flash("Spotlight entry deleted.");
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Delete failed.", true);
    }
  };

  const handleDeleteMedia = async (item) => {
    if (!window.confirm(`Delete media?`)) return;
    try {
      await api.delete("/Spotlight-Media", { data: { spotlight_media_id: item.spotlight_media_id, luu: RCU } });
      flash("Spotlight media deleted.");
      fetchData();
    } catch (err) {
      flash(err.response?.data?.message || "Delete failed.", true);
    }
  };

  const startEditEntry = (item) => {
    setEditingEntry(item);
    setEntryForm({
      title: item.title || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
      start_date: item.start_date ? item.start_date.split("T")[0] : "",
      end_date: item.end_date ? item.end_date.split("T")[0] : "",
      redirect_link: item.redirect_link || "",
      isactive: item.isactive === 1 || item.isactive === true,
    });
    setShowEntryForm(true);
  };

  const startEditMedia = (item) => {
    setEditingMedia(item);
    setMediaForm({
      spotlight_entry_id: item.spotlight_entry_id || "",
      media_url: item.media_url || "",
      media_type: item.media_type || "image",
      alt_text: item.alt_text || "",
      redirect_link: item.redirect_link || "",
      display_order: item.display_order || 1,
      isactive: item.isactive === 1 || item.isactive === true,
    });
    setShowMediaForm(true);
  };

  const filteredEntries = search.trim()
    ? entries.filter((e) =>
        `${e.title || ""} ${e.subtitle || ""}`.toLowerCase().includes(search.toLowerCase())
      )
    : entries;

  const filteredMedia = search.trim()
    ? media.filter((m) =>
        `${m.alt_text || ""} ${m.media_url || ""}`.toLowerCase().includes(search.toLowerCase())
      )
    : media;

  const entryById = (id) => entries.find((e) => e.spotlight_entry_id === id);

  return (
    <div>
      <h3 className="mb-3">HC Spotlight Media</h3>

      {message.text && (
        <div className={`alert ${message.isError ? "alert-danger" : "alert-success"}`}>{message.text}</div>
      )}

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "entries" ? "active" : ""}`}
            onClick={() => setActiveTab("entries")}
          >
            Spotlight Entries
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "media" ? "active" : ""}`}
            onClick={() => setActiveTab("media")}
          >
            Spotlight Media
          </button>
        </li>
      </ul>

      {activeTab === "entries" && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              className="form-control"
              placeholder="Search entries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 300 }}
            />
            <button
              className="btn btn-dark"
              onClick={() => {
                setEditingEntry(null);
                setEntryForm(emptyEntry);
                setShowEntryForm(true);
              }}
            >
              + Add Entry
            </button>
          </div>

          {showEntryForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{editingEntry ? "Edit" : "Create"} Spotlight Entry</h5>
                <form onSubmit={handleEntrySubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Title</label>
                      <input
                        className="form-control"
                        value={entryForm.title}
                        onChange={(e) => setEntryForm((f) => ({ ...f, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Subtitle</label>
                      <input
                        className="form-control"
                        value={entryForm.subtitle}
                        onChange={(e) => setEntryForm((f) => ({ ...f, subtitle: e.target.value }))}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={entryForm.description}
                        onChange={(e) => setEntryForm((f) => ({ ...f, description: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={entryForm.start_date}
                        onChange={(e) => setEntryForm((f) => ({ ...f, start_date: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={entryForm.end_date}
                        onChange={(e) => setEntryForm((f) => ({ ...f, end_date: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Redirect Link</label>
                      <input
                        className="form-control"
                        value={entryForm.redirect_link}
                        onChange={(e) => setEntryForm((f) => ({ ...f, redirect_link: e.target.value }))}
                        placeholder="/wedding"
                      />
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="entryActive"
                          checked={entryForm.isactive}
                          onChange={(e) => setEntryForm((f) => ({ ...f, isactive: e.target.checked }))}
                        />
                        <label className="form-check-label" htmlFor="entryActive">Active</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-dark me-2">{editingEntry ? "Update" : "Save"}</button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => { setShowEntryForm(false); setEditingEntry(null); setEntryForm(emptyEntry); }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Active</th>
                    <th style={{ width: 120 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((item) => (
                    <tr key={item.spotlight_entry_id}>
                      <td>{item.title}</td>
                      <td>{item.subtitle}</td>
                      <td>{item.start_date ? new Date(item.start_date).toLocaleDateString() : "—"}</td>
                      <td>{item.end_date ? new Date(item.end_date).toLocaleDateString() : "—"}</td>
                      <td>{item.isactive === 1 || item.isactive === true ? "Yes" : "No"}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => startEditEntry(item)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteEntry(item)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filteredEntries.length === 0 && (
                    <tr><td colSpan={6} className="text-center py-3">No entries found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === "media" && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              className="form-control"
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 300 }}
            />
            <button
              className="btn btn-dark"
              onClick={() => {
                setEditingMedia(null);
                setMediaForm(emptyMedia);
                setShowMediaForm(true);
              }}
            >
              + Add Media
            </button>
          </div>

          {showMediaForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{editingMedia ? "Edit" : "Create"} Spotlight Media</h5>
                <form onSubmit={handleMediaSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Spotlight Entry</label>
                      <select
                        className="form-select"
                        value={mediaForm.spotlight_entry_id}
                        onChange={(e) => setMediaForm((f) => ({ ...f, spotlight_entry_id: e.target.value }))}
                        required
                      >
                        <option value="">Select entry</option>
                        {entries.map((e) => (
                          <option key={e.spotlight_entry_id} value={e.spotlight_entry_id}>{e.title || e.spotlight_entry_id}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Media Type</label>
                      <select
                        className="form-select"
                        value={mediaForm.media_type}
                        onChange={(e) => setMediaForm((f) => ({ ...f, media_type: e.target.value }))}
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Upload Media</label>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="form-control"
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                      {uploading && <div className="form-text">Uploading...</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Or Enter URL</label>
                      <input
                        className="form-control"
                        value={mediaForm.media_url}
                        onChange={(e) => setMediaForm((f) => ({ ...f, media_url: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                    {mediaForm.media_url && (
                      <div className="col-12">
                        {mediaForm.media_type === "video" ? (
                          <video src={mediaForm.media_url} style={{ maxHeight: 120 }} controls muted />
                        ) : (
                          <img src={mediaForm.media_url} alt="preview" style={{ maxHeight: 120, objectFit: "cover" }} />
                        )}
                      </div>
                    )}
                    <div className="col-md-6">
                      <label className="form-label">Alt Text / Badge</label>
                      <input
                        className="form-control"
                        value={mediaForm.alt_text}
                        onChange={(e) => setMediaForm((f) => ({ ...f, alt_text: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Redirect Link</label>
                      <input
                        className="form-control"
                        value={mediaForm.redirect_link}
                        onChange={(e) => setMediaForm((f) => ({ ...f, redirect_link: e.target.value }))}
                        placeholder="/travel"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Display Order</label>
                      <input
                        type="number"
                        className="form-control"
                        value={mediaForm.display_order}
                        onChange={(e) => setMediaForm((f) => ({ ...f, display_order: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="mediaActive"
                          checked={mediaForm.isactive}
                          onChange={(e) => setMediaForm((f) => ({ ...f, isactive: e.target.checked }))}
                        />
                        <label className="form-check-label" htmlFor="mediaActive">Active</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-dark me-2">{editingMedia ? "Update" : "Save"}</button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => { setShowMediaForm(false); setEditingMedia(null); setMediaForm(emptyMedia); }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Entry</th>
                    <th>Preview</th>
                    <th>Type</th>
                    <th>Alt Text</th>
                    <th>Display Order</th>
                    <th>Active</th>
                    <th style={{ width: 120 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((item) => (
                    <tr key={item.spotlight_media_id}>
                      <td>{entryById(item.spotlight_entry_id)?.title || item.spotlight_entry_id}</td>
                      <td>
                        {item.media_type === "video" ? (
                          <video src={item.media_url} style={{ maxHeight: 60 }} muted />
                        ) : (
                          <img src={item.media_url} alt={item.alt_text} style={{ maxHeight: 60, objectFit: "cover" }} />
                        )}
                      </td>
                      <td>{item.media_type}</td>
                      <td>{item.alt_text}</td>
                      <td>{item.display_order}</td>
                      <td>{item.isactive === 1 || item.isactive === true ? "Yes" : "No"}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => startEditMedia(item)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteMedia(item)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filteredMedia.length === 0 && (
                    <tr><td colSpan={7} className="text-center py-3">No media found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminSpotlightMediaPage;
