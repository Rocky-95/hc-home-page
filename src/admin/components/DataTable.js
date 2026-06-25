import React from "react";

const DataTable = ({ fields, data, onEdit, onDelete, loading, idField = "id" }) => {
  if (loading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No records found.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover bg-white">
        <thead className="table-light">
          <tr>
            {fields.map((field) => (
              <th key={field.name}>{field.label}</th>
            ))}
            <th style={{ width: "140px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row[idField] || idx}>
              {fields.map((field) => {
                const value = row[field.name];
                let display = field.format ? field.format(value, row) : String(value ?? "");
                if (typeof value === "boolean" || value === 1 || value === 0) {
                  const active = value === true || value === 1;
                  display = (
                    <span className={`badge ${active ? "bg-success" : "bg-secondary"}`}>
                      {active ? "Yes" : "No"}
                    </span>
                  );
                }
                return <td key={field.name}>{display}</td>;
              })}
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(row)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(row)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
