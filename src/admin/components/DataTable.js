import React from "react";

const DataTable = ({ fields, data, onEdit, onDelete, loading }) => {
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
            <tr key={row.id || idx}>
              {fields.map((field) => (
                <td key={field.name}>
                  {field.format ? field.format(row[field.name], row) : String(row[field.name] ?? "")}
                </td>
              ))}
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
