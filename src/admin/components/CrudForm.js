import React, { useState, useEffect, useCallback } from "react";
import authService from "../../services/authService";

const CrudForm = ({ fields, initialValues, onSubmit, onCancel }) => {
  const [values, setValues] = useState({});
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [uploading, setUploading] = useState({});

  useEffect(() => {
    const defaults = {};
    fields.forEach((field) => {
      defaults[field.name] = initialValues?.[field.name] ?? (field.type === "checkbox" ? false : "");
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

  const handleImageUpload = useCallback(async (fieldName, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading((prev) => ({ ...prev, [fieldName]: true }));
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", "ADMIN_UPLOAD");
      const res = await authService.uploadFile(fd);
      const url = res.data?.url || res.data?.data?.url || res.data?.fileUrl || "";
      setValues((prev) => ({ ...prev, [fieldName]: url || URL.createObjectURL(file) }));
    } catch {
      setValues((prev) => ({ ...prev, [fieldName]: URL.createObjectURL(file) }));
    } finally {
      setUploading((prev) => ({ ...prev, [fieldName]: false }));
    }
  }, []);

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
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleImageUpload(field.name, e)}
                    disabled={uploading[field.name]}
                  />
                  {uploading[field.name] && <div className="form-text">Uploading...</div>}
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    name={field.name}
                    value={values[field.name] ?? ""}
                    onChange={handleChange}
                    placeholder="Or enter URL"
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
        <button type="submit" className="btn btn-success">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CrudForm;
