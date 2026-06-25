import React, { useEffect, useState } from "react";
import SimpleBarChart from "../components/SimpleBarChart";
import orderService from "../../services/orderService";
import userService from "../../services/userService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    users: 0,
    pendingShipments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, usersRes, shipmentsRes] = await Promise.all([
          orderService.getOrders(),
          userService.getUsers(),
          orderService.getShipments(),
        ]);
        const orders = ordersRes.data?.data || ordersRes.data || [];
        const users = usersRes.data?.data || usersRes.data || [];
        const shipments = shipmentsRes.data?.data || shipmentsRes.data || [];

        const revenue = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);
        const pendingShipments = shipments.filter(
          (s) => s.shipment_status?.toLowerCase() !== "delivered" && s.shipment_status?.toLowerCase() !== "returned"
        ).length;

        setStats({
          orders: orders.length,
          revenue,
          users: users.length,
          pendingShipments,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Orders", value: stats.orders.toString(), color: "#0d6efd" },
    { label: "Total Revenue", value: `₹${stats.revenue.toLocaleString("en-IN")}`, color: "#198754" },
    { label: "Total Users", value: stats.users.toString(), color: "#6c757d" },
    { label: "Pending Shipments", value: stats.pendingShipments.toString(), color: "#dc3545" },
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4 mb-4">
        {statCards.map((stat, idx) => (
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