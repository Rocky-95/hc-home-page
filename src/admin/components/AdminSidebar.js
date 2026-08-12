import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { adminNavItems } from "../config/modules";

const GROUPS = [
  { key: "dashboard", label: "Dashboard", paths: ["/admin"], labels: ["Dashboard"] },
  { key: "users", label: "User Management", labels: ["Users", "Roles", "Customer Profiles"] },
  {
    key: "catalog",
    label: "Catalog & Products",
    labels: ["Products & Media", "Categories & Subcategories", "Product Media", "Product Sizes", "Cloth Types", "Care Instructions", "Product SEO"],
  },
  {
    key: "marketing",
    label: "Marketing & Content",
    labels: ["Running Bar & Items", "Coupons", "Discounts", "Newsletters", "Reviews", "Notifications", "Spotlight Media", "Style Collections", "Home Video", "Home Image Sliders"],
  },
  { key: "sales", label: "Sales & Orders", labels: ["Orders", "Payments", "Invoices", "Appointments", "Appointment Availability"] },
  { key: "shipping", label: "Shipping & Logistics", labels: ["Courier Partners", "Shipments", "Returns & Refunds", "Refunds"] },
  { key: "support", label: "Support & Pages", labels: ["FAQs", "Support Contacts", "Legal Pages"] },
  { key: "settings", label: "Settings", labels: ["Settings"] },
];

const getGroupKey = (item) => {
  for (const g of GROUPS) {
    if ((g.paths && g.paths.includes(item.path)) || (g.labels && g.labels.includes(item.label))) return g.key;
  }
  return "other";
};

const AdminSidebar = ({ mobileOpen = false, onNavigate }) => {
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
    <aside className={`admin-sidebar ${mobileOpen ? "open" : ""}`}>
      <nav className="d-flex flex-column">
        {Object.keys(grouped).map((key) => {
          const group = grouped[key];
          if (!group.items.length) return null;
          const isOpen = open.includes(key);
          return (
            <div key={key} className="admin-sidebar-group">
              <button onClick={() => toggle(key)} className="admin-sidebar-group-btn">
                <span>{group.label}</span>
                <span className="chevron">{isOpen ? <FiChevronDown size={13} /> : <FiChevronRight size={13} />}</span>
              </button>
              {isOpen && (
                <div className="admin-sidebar-links">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/admin"}
                        onClick={onNavigate}
                        className={({ isActive }) => `admin-sidebar-link ${isActive ? "active" : ""}`}
                      >
                        {ItemIcon && <ItemIcon size={16} className="admin-sidebar-link-icon" />}
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
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
