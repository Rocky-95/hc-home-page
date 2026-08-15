import React, { useState, useEffect, useCallback } from "react";
import authService from "../../services/authService";
import { validateMediaFile } from "../utils/mediaValidation";
import { resolveUploadUrl } from "../utils/resolveUploadUrl";
import { useToast } from "./ToastProvider";
import UploadProgressBar from "./UploadProgressBar";

const CrudForm = ({ fields, initialValues, onSubmit, onCancel }) => {
  const [values, setValues] = useState({});
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [uploading, setUploading] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [mediaKind, setMediaKind] = useState({});
  const toast = useToast();

  useEffect(() => {
    const defaults = {};
    fields.forEach((field) => {
      const fallback = field.type === "checkbox" ? (field.defaultValue ?? false) : (field.defaultValue ?? "");
      defaults[field.name] = initialValues?.[field.name] ?? fallback;
    });
    setValues(defaults);
  }, [initialValues, fields]);

  useEffect(() => {
    fields.forEach((field) => {
      if (field.type === "select" && typeof field.optionsLoader === "function") {
        field.optionsLoader().then((options) => {
          setDynamicOptions((prev) => ({ ...prev, [field.name]: options }));
        }).catch(() => {
          setDynamicOptions((prev) => ({ ...prev, [field.name]: [] }));
        });
      }
    });
  }, [fields]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleMediaUpload = useCallback(async (fieldName, kind, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validateOpts = kind === "video" ? { videoOnly: true } : kind === "media" ? {} : { allowVideo: false };
    const { valid, error } = validateMediaFile(file, validateOpts);
    if (!valid) { toast.error(error); e.target.value = ""; return; }

    setMediaKind((prev) => ({ ...prev, [fieldName]: file.type.startsWith("video") ? "video" : "image" }));

    const previewUrl = URL.createObjectURL(file);
    setValues((prev) => ({ ...prev, [fieldName]: previewUrl }));

    setUploading((prev) => ({ ...prev, [fieldName]: true }));
    setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
    try {
      const fd = new FormData();
      fd.append("path", "ADMIN_UPLOAD");
      fd.append("file", file);
      const res = await authService.uploadFile(fd, (pct) => setUploadProgress((prev) => ({ ...prev, [fieldName]: pct })));
      const raw = res.data?.url || res.data?.data?.url || res.data?.virtualPath || res.data?.fileUrl || "";
      const url = resolveUploadUrl(raw);
      if (url) {
        setValues((prev) => ({ ...prev, [fieldName]: url }));
      } else {
        toast.error("Upload succeeded but no file URL was returned.");
        setValues((prev) => ({ ...prev, [fieldName]: "" }));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed.");
      setValues((prev) => ({ ...prev, [fieldName]: "" }));
    } finally {
      URL.revokeObjectURL(previewUrl);
      setUploading((prev) => ({ ...prev, [fieldName]: false }));
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
    }
  }, [toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = { ...values };
    fields.forEach((field) => {
      if (field.type === "checkbox") {
        normalized[field.name] = normalized[field.name] ? 1 : 0;
      }
      if (field.type === "number") {
        normalized[field.name] = normalized[field.name] === "" ? "" : parseFloat(normalized[field.name]);
      }
    });
    onSubmit(normalized);
  };

  const isUploading = Object.values(uploading).some(Boolean);

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        const options = field.type === "select" ? (field.options || dynamicOptions[field.name] || []) : [];
        return (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            {field.type === "select" ? (
              <select
                className="form-select"
                name={field.name}
                value={values[field.name] || ""}
                onChange={handleChange}
                required={field.required}
              >
                <option value="">Select {field.label}</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                className="form-control"
                name={field.name}
                value={values[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                rows={field.rows || 3}
              />
            ) : field.type === "checkbox" ? (
              <div className="form-check mt-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={field.name}
                  id={`field_${field.name}`}
                  checked={!!values[field.name]}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={`field_${field.name}`}>
                  {field.label}
                </label>
              </div>
            ) : field.type === "image" ? (
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="form-control"
                    onChange={(e) => handleMediaUpload(field.name, "image", e)}
                    disabled={uploading[field.name]}
                  />
                  <div className="form-text">JPG, PNG, WEBP, or GIF.</div>
                  {uploading[field.name] && <UploadProgressBar percent={uploadProgress[field.name] || 0} />}
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    name={field.name}
                    value={values[field.name] ?? ""}
                    onChange={handleChange}
                    placeholder="Or enter URL"
                    required={field.required}
                  />
                </div>
                {values[field.name] && (
                  <div className="col-12">
                    <img
                      src={values[field.name]}
                      alt="preview"
                      style={{ height: 80, objectFit: "cover", borderRadius: 6 }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
              </div>
            ) : field.type === "video" ? (
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    className="form-control"
                    onChange={(e) => handleMediaUpload(field.name, "video", e)}
                    disabled={uploading[field.name]}
                  />
                  <div className="form-text">MP4, WEBM, or MOV.</div>
                  {uploading[field.name] && <UploadProgressBar percent={uploadProgress[field.name] || 0} />}
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    name={field.name}
                    value={values[field.name] ?? ""}
                    onChange={handleChange}
                    placeholder="Or enter URL"
                    required={field.required}
                  />
                </div>
                {values[field.name] && (
                  <div className="col-12">
                    <video
                      src={values[field.name]}
                      controls
                      muted
                      style={{ height: 120, borderRadius: 6 }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
              </div>
            ) : field.type === "media" ? (
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                    className="form-control"
                    onChange={(e) => handleMediaUpload(field.name, "media", e)}
                    disabled={uploading[field.name]}
                  />
                  <div className="form-text">JPG, PNG, WEBP, GIF images or MP4, WEBM, MOV videos.</div>
                  {uploading[field.name] && <UploadProgressBar percent={uploadProgress[field.name] || 0} />}
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    name={field.name}
                    value={values[field.name] ?? ""}
                    onChange={handleChange}
                    placeholder="Or enter URL"
                    required={field.required}
                  />
                </div>
                {values[field.name] && (
                  <div className="col-12">
                    {mediaKind[field.name] === "video" ? (
                      <video
                        src={values[field.name]}
                        controls
                        muted
                        style={{ height: 120, borderRadius: 6 }}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <img
                        src={values[field.name]}
                        alt="preview"
                        style={{ height: 80, objectFit: "cover", borderRadius: 6 }}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <input
                className="form-control"
                type={field.type || "text"}
                name={field.name}
                value={values[field.name] ?? ""}
                onChange={handleChange}
                required={field.required}
              />
            )}
          </div>
        );
      })}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Save"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CrudForm;
