import React, { useState } from "react";
import api from "../services/api";
import { useConfirm } from "../components/ConfirmProvider";

const RCU = "ADMIN_PORTAL";

const MASTER_CATEGORIES = [
  {
    name: "Suits",
    slug: "suits",
    subcategories: [
      { name: "Wedding", slug: "wedding", redirect: "/wedding" },
      { name: "Business", slug: "business", redirect: "/business" },
      { name: "Designer", slug: "designer", redirect: "/designer" },
      { name: "Travel", slug: "travel", redirect: "/travel" },
      { name: "Smart casual", slug: "smart-casual", redirect: "/smart-casual" },
    ],
  },
  {
    name: "Indo Western",
    slug: "indowestern",
    subcategories: [
      { name: "Wedding Indo Western", slug: "indo-wedding", redirect: "/indo-wedding" },
      { name: "Designer IW", slug: "indo-designer", redirect: "/indo-designer" },
      { name: "Wedding Guest IW", slug: "wedding-guest-iw", redirect: "/coming-soon" },
      { name: "Haldi IW", slug: "haldi-iw", redirect: "/coming-soon" },
      { name: "Sangeet IW", slug: "sangeet-iw", redirect: "/coming-soon" },
    ],
  },
  {
    name: "Shirts",
    slug: "shirts",
    subcategories: [
      { name: "Formal", slug: "formal-shirts", redirect: "/coming-soon" },
      { name: "Casual", slug: "casual-shirts", redirect: "/casual-shirts" },
      { name: "Designer", slug: "designer-shirts", redirect: "/designer-shirts" },
      { name: "Ceremonial", slug: "ceremonial-shirts", redirect: "/coming-soon" },
      { name: "Business", slug: "business-shirts", redirect: "/business-shirts" },
    ],
  },
  {
    name: "Trousers",
    slug: "trousers",
    subcategories: [
      { name: "Formal", slug: "formal-trousers", redirect: "/coming-soon" },
      { name: "Casual", slug: "casual-trousers", redirect: "/smart-casual-trouser" },
      { name: "Designer", slug: "designer-trousers", redirect: "/designer-trouser" },
    ],
  },
  {
    name: "Baby Suits",
    slug: "babysuits",
    subcategories: [
      { name: "Baby First Birthday Suits", slug: "baby-first-birthday", redirect: "/coming-soon" },
      { name: "Baptism & Christening Suits", slug: "baptism-christening", redirect: "/coming-soon" },
      { name: "Wedding & Ring Bearer Suits", slug: "wedding-ring-bearer", redirect: "/wedding-baby" },
      { name: "Family Photoshoot Suits", slug: "family-photoshoot", redirect: "/coming-soon" },
      { name: "Formal & Party Wear Suits", slug: "formal-party-wear", redirect: "/coming-soon" },
    ],
  },
];

const AdminCategorySyncPage = () => {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);
  const confirm = useConfirm();

  const addLog = (msg) => setLog((prev) => [...prev, msg]);

  const handleSync = async () => {
    const ok = await confirm({
      title: "Rebuild all categories?",
      message: "This will DELETE every category and subcategory in the database, then recreate them from the master list below. This cannot be undone.",
      confirmLabel: "Delete & Rebuild",
      danger: true,
    });
    if (!ok) return;

    setLoading(true);
    setLog([]);
    setDone(false);

    try {
      const [catsRes, subsRes] = await Promise.all([
        api.get("/Menu-Category"),
        api.get("/Menu-Sub-Category"),
      ]);
      const existingCats = catsRes.data?.data || catsRes.data || [];
      const existingSubs = subsRes.data?.data || subsRes.data || [];

      addLog(`Found ${existingSubs.length} subcategories to delete...`);
      for (const s of existingSubs) {
        try {
          await api.delete("/Menu-Sub-Category", {
            data: { menu_subcategory_id: s.menu_subcategory_id, luu: RCU },
          });
          addLog(`Deleted subcategory: ${s.menu_subcategory_name}`);
        } catch (e) {
          addLog(
            `Failed to delete subcategory "${s.menu_subcategory_name}": ${
              e.response?.data?.message || e.message
            }`
          );
        }
      }

      addLog(`Found ${existingCats.length} categories to delete...`);
      for (const c of existingCats) {
        try {
          await api.delete("/Menu-Category", {
            data: { menu_category_id: c.menu_category_id, luu: RCU },
          });
          addLog(`Deleted category: ${c.menu_category_name}`);
        } catch (e) {
          addLog(
            `Failed to delete category "${c.menu_category_name}": ${
              e.response?.data?.message || e.message
            }`
          );
        }
      }

      addLog("Creating categories...");
      for (const [i, c] of MASTER_CATEGORIES.entries()) {
        await api.post("/Menu-Category", {
          menu_category_name: c.name,
          menu_category_slug: c.slug,
          menu_category_image_url: "",
          display_order: i + 1,
          isactive: 1,
          rcu: RCU,
        });
        addLog(`Created category: ${c.name}`);
      }

      const newCatsRes = await api.get("/Menu-Category");
      const newCats = newCatsRes.data?.data || newCatsRes.data || [];
      const catMap = newCats.reduce((acc, c) => {
        acc[c.menu_category_slug] = c.menu_category_id;
        return acc;
      }, {});
      addLog(`Refetched ${newCats.length} new categories`);

      addLog("Creating subcategories...");
      for (const c of MASTER_CATEGORIES) {
        const catId = catMap[c.slug];
        if (!catId) {
          addLog(`Category ID not found for ${c.slug}, skipping...`);
          continue;
        }
        for (const [i, s] of c.subcategories.entries()) {
          await api.post("/Menu-Sub-Category", {
            menu_subcategory_name: s.name,
            menu_subcategory_slug: s.slug,
            menu_category_id: catId,
            menu_subcategory_image_url: "",
            redirect_link: s.redirect,
            display_order: i + 1,
            isactive: 1,
            rcu: RCU,
          });
          addLog(`Created subcategory: ${s.name} → ${s.redirect}`);
        }
      }

      setDone(true);
      addLog("Sync complete.");
    } catch (err) {
      addLog(`Sync error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-4">Category Sync</h3>
      <p className="text-muted">
        Removes all existing <code>Menu-Category</code> and <code>Menu-Sub-Category</code> records and recreates them from the master list below.
      </p>
      <button className="btn btn-dark mb-3" onClick={handleSync} disabled={loading}>
        {loading ? "Syncing..." : "Sync Categories & Subcategories"}
      </button>
      {done && (
        <div className="alert alert-success py-2">
          Sync completed. Refresh the public category pages or the Categories/Subcategories admin pages to verify.
        </div>
      )}
      <div
        className="border rounded p-3 bg-light"
        style={{ maxHeight: 500, overflowY: "auto", fontFamily: "monospace", fontSize: 14 }}
      >
        {log.length === 0 ? (
          <span className="text-muted">No actions yet.</span>
        ) : (
          log.map((l, i) => (
            <div key={i}>
              {l}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCategorySyncPage;
