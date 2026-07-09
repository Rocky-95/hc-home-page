import React from "react";

const DataTable = ({ fields, data, onEdit, onDelete, loading, idField = "id" }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <div style={{ fontSize: "2rem" }}>📭</div>
        <p className="mt-2">No records found.</p>
      </div>
    );
  }

  return (
    <div>
      <small className="text-muted mb-2 d-block">{data.length} record{data.length !== 1 ? "s" : ""}</small>
      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white">
          <thead className="table-dark">
            <tr>
              {fields.map((field) => (
                <th key={field.name}>{field.label || field.name}</th>
              ))}
              <th style={{ width: "140px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row[idField] || idx}>
                {fields.map((field) => {
                  const value = row[field.name];
                  let display;
                  if (field.format) {
                    display = field.format(value, row);
                  } else if (typeof value === "boolean" || value === 1 || value === 0) {
                    const active = value === true || value === 1;
                    display = (
                      <span className={`badge ${active ? "bg-success" : "bg-secondary"}`}>
                        {active ? "Yes" : "No"}
                      </span>
                    );
                  } else {
                    const str = String(value ?? "");
                    display = str.length > 60 ? str.slice(0, 60) + "…" : str;
                  }
                  return <td key={field.name}>{display}</td>;
                })}
                <td>
                  <button className="btn btn-sm btn-outline-dark me-1" onClick={() => onEdit(row)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(row)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
