import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { adminNavItems } from "../config/modules";

const GROUPS = [
  { key: "dashboard", label: "Dashboard", paths: ["/admin"], labels: ["Dashboard"] },
  { key: "users", label: "User Management", labels: ["Users", "Roles", "Customer Profiles"] },
  {
    key: "catalog",
    label: "Catalog & Products",
    labels: ["Products & Media", "Categories", "Sub Categories", "Product Media", "Product Sizes", "Cloth Types", "Care Instructions", "Product SEO"],
  },
  {
    key: "marketing",
    label: "Marketing & Content",
    labels: ["Running Bar", "Running Bar Items", "Campaigns", "Coupons", "Discounts", "Newsletters", "Reviews", "Notifications", "Spotlight Media"],
  },
  { key: "sales", label: "Sales & Orders", labels: ["Orders", "Payments", "Invoices", "Appointments"] },
  { key: "shipping", label: "Shipping & Logistics", labels: ["Courier Partners", "Shipments", "Returns & Refunds"] },
  { key: "support", label: "Support & Pages", labels: ["FAQs", "Support Contacts", "Legal Pages"] },
  { key: "settings", label: "Settings", labels: ["Settings"] },
];

const getGroupKey = (item) => {
  for (const g of GROUPS) {
    if ((g.paths && g.paths.includes(item.path)) || (g.labels && g.labels.includes(item.label))) return g.key;
  }
  return "other";
};

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(["dashboard"]);

  useEffect(() => {
    const active = adminNavItems.find((item) => {
      if (item.path === "/admin") return pathname === "/admin";
      return pathname.startsWith(item.path);
    });
    if (active) {
      const group = getGroupKey(active);
      setOpen((prev) => (prev.includes(group) ? prev : [...prev, group]));
    }
  }, [pathname]);

  const grouped = {};
  GROUPS.forEach((g) => (grouped[g.key] = { ...g, items: [] }));
  grouped.other = { key: "other", label: "Other", items: [] };
  adminNavItems.forEach((item) => {
    const key = getGroupKey(item);
    (grouped[key] || grouped.other).items.push(item);
  });

  const toggle = (key) => {
    setOpen((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  return (
    <aside
      className="bg-dark text-white d-flex flex-column p-3"
      style={{ width: "240px", height: "calc(100vh - 50px)", overflowY: "auto" }}
    >
      <h5 className="mb-3 px-2 fw-bold">⚙️ HC Admin</h5>
      <nav className="nav flex-column" style={{ gap: "4px" }}>
        {Object.keys(grouped).map((key) => {
          const group = grouped[key];
          if (!group.items.length) return null;
          const isOpen = open.includes(key);
          return (
            <div key={key} className="mb-1">
              <button
                onClick={() => toggle(key)}
                className="btn btn-link text-white text-decoration-none d-flex justify-content-between align-items-center w-100 p-2"
                style={{ fontSize: "0.85rem", borderBottom: "1px solid rgba(255,255,255,0.1)", textAlign: "left" }}
              >
                <span className="fw-semibold">{group.label}</span>
                <span style={{ fontSize: "0.75rem" }}>{isOpen ? "▼" : "▶"}</span>
              </button>
              {isOpen && (
                <div className="d-flex flex-column ps-2" style={{ gap: "2px" }}>
                  {group.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/admin"}
                      className={({ isActive }) =>
                        `nav-link text-white py-2 px-2 ${isActive ? "fw-bold bg-secondary rounded" : ""}`
                      }
                      style={{ fontSize: "0.85rem" }}
                    >
                      {item.icon && <span className="me-2">{item.icon}</span>}
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
