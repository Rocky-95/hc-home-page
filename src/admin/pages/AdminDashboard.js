import React from "react";
import SimpleBarChart from "../components/SimpleBarChart";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Orders", value: "0", color: "#0d6efd" },
    { label: "Total Revenue", value: "₹0", color: "#198754" },
    { label: "Total Users", value: "0", color: "#6c757d" },
    { label: "Pending Shipments", value: "0", color: "#dc3545" },
  ];

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>

      <div className="row g-4 mb-4">
        {stats.map((stat, idx) => (
          <div className="col-md-3 col-sm-6" key={idx}>
            <div className="card text-white" style={{ backgroundColor: stat.color }}>
              <div className="card-body">
                <h5 className="card-title">{stat.label}</h5>
                <p className="card-text fs-3 fw-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sales Overview</h5>
          <SimpleBarChart
            data={[
              { label: "Jan", value: 12000 },
              { label: "Feb", value: 19000 },
              { label: "Mar", value: 15000 },
              { label: "Apr", value: 22000 },
              { label: "May", value: 28000 },
              { label: "Jun", value: 24000 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;