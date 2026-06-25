const axios = require("axios");
const { CookieJar } = require("tough-cookie");

const API_BASE = "https://dev.dine360.ca/backend/API/Harry-Clinton";

const cookieJar = new CookieJar();

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const cookies = await cookieJar.getCookies(API_BASE);
  if (cookies.length) {
    config.headers.Cookie = cookies.map((c) => c.cookieString()).join("; ");
  }
  return config;
});

api.interceptors.response.use(async (response) => {
  const setCookies = response.headers["set-cookie"] || [];
  for (const cookieStr of setCookies) {
    await cookieJar.setCookie(cookieStr, API_BASE);
  }
  return response;
});

const ADMIN_USER = {
  full_name: "Rajkumar",
  email_id: "akr.rajkumar@gmail.com",
  password: process.env.SEED_ADMIN_PASSWORD || "HarryClinton@2026",
  mobile_number: "9999999999",
  isactive: 1,
  rcu: "website",
};

const CATEGORIES = [
  { name: "Suits", slug: "suits", order: 1 },
  { name: "Indo-Western", slug: "indowestern", order: 2 },
  { name: "Shirts", slug: "shirts", order: 3 },
  { name: "Trousers", slug: "trousers", order: 4 },
  { name: "Baby Suits", slug: "babysuits", order: 5 },
];

const SUBCATEGORIES = [
  // Suits
  { name: "Wedding", slug: "wedding", redirect: "/collection/wedding", category: "Suits" },
  { name: "Business", slug: "business", redirect: "/collection/business", category: "Suits" },
  { name: "Designer", slug: "designer", redirect: "/collection/designer", category: "Suits" },
  { name: "Travel", slug: "travel", redirect: "/collection/travel", category: "Suits" },
  { name: "Smart Casual", slug: "smart-casual", redirect: "/collection/smart-casual", category: "Suits" },
  // Indo-Western
  { name: "Wedding", slug: "indo-wedding", redirect: "/collection/indo-wedding", category: "Indo-Western" },
  { name: "Business", slug: "indo-business", redirect: "/collection/indo-business", category: "Indo-Western" },
  { name: "Designer", slug: "indo-designer", redirect: "/collection/indo-designer", category: "Indo-Western" },
  { name: "Travel", slug: "indo-travel", redirect: "/collection/indo-travel", category: "Indo-Western" },
  { name: "Smart Casual", slug: "indo-casual", redirect: "/collection/indo-casual", category: "Indo-Western" },
  // Shirts
  { name: "Wedding", slug: "wedding-shirts", redirect: "/collection/wedding-shirts", category: "Shirts" },
  { name: "Business", slug: "business-shirts", redirect: "/collection/business-shirts", category: "Shirts" },
  { name: "Designer", slug: "designer-shirts", redirect: "/collection/designer-shirts", category: "Shirts" },
  { name: "Travel", slug: "travel-shirts", redirect: "/collection/travel-shirts", category: "Shirts" },
  { name: "Smart Casual", slug: "casual-shirts", redirect: "/collection/casual-shirts", category: "Shirts" },
  // Trousers
  { name: "Wedding", slug: "wedding-trouser", redirect: "/collection/wedding-trouser", category: "Trousers" },
  { name: "Business", slug: "business-trouser", redirect: "/collection/business-trouser", category: "Trousers" },
  { name: "Designer", slug: "designer-trouser", redirect: "/collection/designer-trouser", category: "Trousers" },
  { name: "Travel", slug: "travel-trouser", redirect: "/collection/travel-trouser", category: "Trousers" },
  { name: "Smart Casual", slug: "smart-casual-trouser", redirect: "/collection/smart-casual-trouser", category: "Trousers" },
  // Baby Suits
  { name: "Wedding", slug: "wedding-baby", redirect: "/collection/wedding-baby", category: "Baby Suits" },
  { name: "Business", slug: "business-baby", redirect: "/collection/business-baby", category: "Baby Suits" },
  { name: "Designer", slug: "designer-baby", redirect: "/collection/designer-baby", category: "Baby Suits" },
  { name: "Travel", slug: "travel-baby", redirect: "/collection/travel-baby", category: "Baby Suits" },
  { name: "Smart Casual", slug: "casual-baby", redirect: "/collection/casual-baby", category: "Baby Suits" },
  // Special collections
  { name: "Tuxedo", slug: "tuxedo", redirect: "/tuxedo", category: "Suits" },
  { name: "Extreme Poppins", slug: "extreme-poppins", redirect: "/extreme-poppins", category: "Suits" },
  { name: "Gurkha Trousers", slug: "gurkha-trousers", redirect: "/gurkha-trousers", category: "Trousers" },
  { name: "Linen Shirts & Trousers", slug: "linen-shirts-trousers", redirect: "/linen-shirts-trousers", category: "Shirts" },
  { name: "88 Cigarettes", slug: "cigarettes", redirect: "/cigarettes", category: "Trousers" },
];

function success(res) {
  const d = res.data || {};
  const ok =
    d.Status === "1" ||
    d.Status === "true" ||
    d.Status === true ||
    d.success === true ||
    d.status === "success" ||
    (d.Message || "").toLowerCase().includes("successful") ||
    (d.message || "").toLowerCase().includes("successful");
  return ok;
}

async function registerOrLogin() {
  try {
    const regRes = await api.post("/Auth/Register", ADMIN_USER);
    if (success(regRes)) {
      console.log("Admin user registered successfully.");
    } else {
      console.log("Registration response:", regRes.data?.Message || regRes.data?.message || "Unknown");
    }
  } catch (err) {
    console.log("Registration skipped or failed:", err.response?.data?.Message || err.response?.data?.message || err.message);
  }

  const loginRes = await api.post("/Auth/Password-Login", {
    email_id: ADMIN_USER.email_id,
    password: ADMIN_USER.password,
  });
  require("fs").writeFileSync("login-response.json", JSON.stringify(loginRes.data, null, 2));
  if (!success(loginRes)) {
    throw new Error("Login failed: " + (loginRes.data?.Message || loginRes.data?.message || "Unknown"));
  }
  const token =
    loginRes.data?.token ||
    loginRes.data?.Token ||
    loginRes.data?.Response?.token ||
    loginRes.data?.Response?.access_token ||
    loginRes.data?.Response?.Token ||
    loginRes.data?.access_token;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Logged in.");

  // Try to assign admin role using user from login response
  try {
    const user = loginRes.data?.Response?.user;
    const currentRoles = loginRes.data?.Response?.roles || [];
    console.log("Logged in user:", user?.email_id, "current roles:", currentRoles.map((r) => r.role_name));
    const rolesRes = await api.get("/Roles");
    const roles = rolesRes.data?.data || rolesRes.data || [];
    const adminRole = roles.find((r) => r.role_name?.toLowerCase() === "administrator" || r.role_name?.toLowerCase() === "admin");
    console.log("Admin role found:", adminRole?.role_name);
    if (user && adminRole && !currentRoles.some((r) => ["admin", "administrator"].includes(r.role_name?.toLowerCase()))) {
      await api.put("/Users", {
        user_id: user.user_id,
        role_id: adminRole.role_id,
        luu: "website",
      });
      console.log("Admin role assigned.");
    } else {
      console.log("User already has admin role or admin role not found.");
    }
  } catch (err) {
    console.log("Role assignment failed:", err.response?.data?.Message || err.response?.data?.message || err.message);
  }
}

async function seedCategories() {
  const existingRes = await api.get("/Menu-Category");
  const existing = existingRes.data?.data || existingRes.data || [];

  const created = {};
  for (const cat of CATEGORIES) {
    const existingCat = existing.find((c) => c.menu_category_name === cat.name);
    if (existingCat) {
      created[cat.name] = existingCat.menu_category_id;
      console.log(`Category already exists: ${cat.name}`);
      continue;
    }
    const res = await api.post("/Menu-Category", {
      menu_category_name: cat.name,
      menu_category_slug: cat.slug,
      display_order: cat.order,
      isactive: 1,
      rcu: "website",
    });
    const id = res.data?.data?.menu_category_id || res.data?.menu_category_id;
    created[cat.name] = id;
    console.log(`Created category: ${cat.name} (${id})`);
  }
  return created;
}

async function seedSubCategories(categoryMap) {
  const existingRes = await api.get("/Menu-Sub-Category");
  const existing = existingRes.data?.data || existingRes.data || [];

  for (const sub of SUBCATEGORIES) {
    const categoryId = categoryMap[sub.category];
    if (!categoryId) {
      console.log(`Skipping ${sub.name}: category ${sub.category} not found.`);
      continue;
    }
    const existingSub = existing.find(
      (s) => s.menu_subcategory_name === sub.name && s.menu_category_id === categoryId
    );
    if (existingSub) {
      console.log(`Subcategory already exists: ${sub.name} under ${sub.category}`);
      continue;
    }
    await api.post("/Menu-Sub-Category", {
      menu_subcategory_name: sub.name,
      menu_subcategory_slug: sub.slug,
      menu_category_id: categoryId,
      redirect_link: sub.redirect,
      display_order: 1,
      isactive: 1,
      rcu: "website",
    });
    console.log(`Created subcategory: ${sub.name} under ${sub.category}`);
  }
}

async function main() {
  try {
    await registerOrLogin();
    const categoryMap = await seedCategories();
    await seedSubCategories(categoryMap);
    console.log("\nSeeding complete.");
    console.log("Admin password:", ADMIN_USER.password);
  } catch (err) {
    console.error("Seeding failed:", err.response?.data || err.message);
    process.exit(1);
  }
}

main();
