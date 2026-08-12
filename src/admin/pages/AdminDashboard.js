import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleBarChart from "../components/SimpleBarChart";
import { buildService } from "../services/crudService";

const usersService = buildService("Users", "user_id");
const ordersService = buildService("Orders", "order_id");
const categoriesService = buildService("Menu-Category", "menu_category_id");
const productsService = buildService("Products", "product_id");
const appointmentsService = buildService("Custom-Appointments", "appointment_id");

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    categories: 0,
    products: 0,
    appointments: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const results = await Promise.allSettled([
          usersService.list(),
          ordersService.list(),
          categoriesService.list(),
          productsService.list(),
          appointmentsService.list(),
        ]);

        const extract = (res) => {
          if (res.status === "fulfilled") {
            const d = res.value;
            return Array.isArray(d) ? d : d?.data || [];
          }
          return [];
        };

        const users = extract(results[0]);
        const orders = extract(results[1]);
        const categories = extract(results[2]);
        const products = extract(results[3]);
        const appointments = extract(results[4]);
        const revenue = orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0);

        setStats({
          users: users.length,
          orders: orders.length,
          categories: categories.length,
          products: products.length,
          appointments: appointments.length,
          revenue,
        });
      } catch (err) {
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Users", value: stats.users.toString(), color: "#0d6efd", link: "/admin/users" },
    { label: "Total Orders", value: stats.orders.toString(), color: "#6f42c1", link: "/admin/orders" },
    { label: "Total Revenue", value: `₹${stats.revenue.toLocaleString("en-IN")}`, color: "#198754", link: "/admin/orders" },
    { label: "Products", value: stats.products.toString(), color: "#fd7e14", link: "/admin/products" },
    { label: "Categories", value: stats.categories.toString(), color: "#20c997", link: "/admin/categories" },
    { label: "Appointments", value: stats.appointments.toString(), color: "#dc3545", link: "/admin/appointments" },
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
          <div className="col-md-4 col-sm-6" key={idx}>
            <Link to={stat.link} style={{ textDecoration: "none" }}>
              <div className="card text-white h-100" style={{ backgroundColor: stat.color, cursor: "pointer" }}>
                <div className="card-body">
                  <h6 className="card-title text-white-50">{stat.label}</h6>
                  <p className="card-text fs-2 fw-bold mb-0">{stat.value}</p>
                </div>
              </div>
            </Link>
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