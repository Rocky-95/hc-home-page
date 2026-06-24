import React, { useState, useEffect } from "react";

const CrudForm = ({ fields, initialValues, onSubmit, onCancel }) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    const defaults = {};
    fields.forEach((field) => {
      defaults[field.name] = initialValues?.[field.name] ?? (field.type === "checkbox" ? false : "");
    });
    setValues(defaults);
  }, [initialValues, fields]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
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
              {field.options?.map((opt) => (
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
          ) : (
            <input
              className="form-control"
              type={field.type || "text"}
              name={field.name}
              value={values[field.name] || ""}
              onChange={handleChange}
              required={field.required}
            />
          )}
        </div>
      ))}
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
