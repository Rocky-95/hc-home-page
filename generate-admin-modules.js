const fs = require("fs");
const path = require("path");

const COLLECTION = "c:\\Users\\RK\\Downloads\\httpie-space-harry-clinton-2.json";
const RESULTS = "api-check-results.json";
const OUT = path.join(__dirname, "src", "admin", "config", "generatedModules.js");

// existing keys in modules.js to avoid replacing
const EXISTING_KEYS = new Set([
  "roles", "users", "products", "categories", "subcategories", "orders", "payments",
  "notifications", "profiles", "appointments", "invoices", "coupons", "discounts",
  "campaigns", "courier-partners", "shipments", "returns-refunds", "faqs",
  "newsletters", "reviews", "running-bar", "running-bar-items", "product-media",
  "product-sizes", "product-cloth-types", "product-care", "product-seo",
]);

function singularizeLast(segment) {
  // crude singularization of the last word
  const parts = segment.split("-");
  const last = parts[parts.length - 1];
  if (last.length > 2 && last.endsWith("s") && !last.endsWith("ss") && !last.endsWith("us")) {
    parts[parts.length - 1] = last.slice(0, -1);
  }
  return parts.join("-");
}

function kebabToCamel(str) {
  return str
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

function inferFieldType(key, value) {
  const lower = key.toLowerCase();
  if (lower === "isactive" || lower.startsWith("is_")) return "checkbox";
  if (lower.includes("email")) return "email";
  if (lower.includes("password")) return "password";
  if (lower.endsWith("_date") || lower.endsWith("date") || lower.endsWith("at")) return "date";
  if (lower.includes("image_url") || lower.includes("media_url") || lower.includes("file_url") || lower.includes("og_image")) return "image";
  if (lower.includes("_url") || lower.includes("url")) return "url";
  if (typeof value === "number") return "number";
  if (lower.includes("description") || lower.includes("notes") || lower.includes("message") || lower.includes("answer")) return "textarea";
  return "text";
}

function buildFields(sample) {
  const fields = [];
  for (const [key, value] of Object.entries(sample)) {
    if (["rcu", "luu", "created_at", "updated_at"].includes(key.toLowerCase())) continue;
    fields.push({
      name: key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      type: inferFieldType(key, value),
    });
  }
  return fields;
}

function main() {
  const collection = JSON.parse(fs.readFileSync(COLLECTION, "utf8"));

  const allReqs = [];
  (collection.entry?.collections || []).forEach((c) =>
    (c.requests || []).forEach((r) => {
      r.folder = c.name || "";
      allReqs.push(r);
    })
  );

  // unique resource base -> first request seen, with scenario/folder name
  const resourceMap = new Map();
  for (const r of allReqs) {
    const url = (r.url || "").replace(/^\{\{P\}\}\//, "").replace(/^\//, "");
    if (!url) continue;
    const parts = url.split("/").filter(Boolean);
    const baseParts = [];
    for (const p of parts) {
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(p) || /^\d+$/i.test(p)) break;
      baseParts.push(p);
    }
    const base = baseParts.join("/");
    if (!base) continue;
    if (!resourceMap.has(base)) resourceMap.set(base, { request: r, folder: r.folder });
  }

  const generated = [];

  for (const [base, meta] of resourceMap) {
    const key = base.toLowerCase().replace(/\//g, "-");
    if (EXISTING_KEYS.has(key)) continue;

    const moduleName = base.split("/").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("/");
    const sampleReq = allReqs.find((r) => {
      const rPath = (r.url || "").replace(/^\{\{P\}\}\//, "").replace(/^\//, "");
      return r.method === "POST" && rPath.toLowerCase() === base.toLowerCase() && r.body?.type === "text" && r.body.text?.value;
    });

    let sample = {};
    if (sampleReq) {
      try {
        sample = JSON.parse(sampleReq.body.text.value);
      } catch {}
    }
    if (Object.keys(sample).length === 0) {
      sample = { name: "" };
    }

    const idBase = singularizeLast(base).replace(/\//g, "_");
    const idField = `${idBase}_id`;
    const labelBase = base.split("/").map((p) => p.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())).join(" ");
    const label = meta.folder && meta.folder !== labelBase ? `${meta.folder} - ${labelBase}` : labelBase;
    const fields = buildFields(sample);
    const listFields = fields.slice(0, 5).map((f) => f.name);
    if (!listFields.length) listFields.push("id");

    generated.push({
      key,
      config: {
        label,
        module: moduleName,
        idField,
        fields,
        listFields,
      },
    });
  }

  const lines = [
    "export const generatedModuleConfigs = {",
  ];
  for (const g of generated) {
    lines.push(`  "${g.key}": {`);
    lines.push(`    label: "${g.config.label}",`);
    lines.push(`    module: "${g.config.module}",`);
    lines.push(`    idField: "${g.config.idField}",`);
    lines.push(`    fields: [`);
    for (const f of g.config.fields) {
      lines.push(`      { name: "${f.name}", label: "${f.label}"${f.type !== "text" ? `, type: "${f.type}"` : ""} },`);
    }
    lines.push(`    ],`);
    lines.push(`    listFields: [${g.config.listFields.map((f) => `"${f}"`).join(", ")}],`);
    lines.push(`  },`);
  }
  lines.push("};");
  lines.push("");
  lines.push("export const generatedNavItems = [");
  for (const g of generated) {
    lines.push(`  { path: "/admin/${g.key}", label: "${g.config.label}", icon: "⚙️" },`);
  }
  lines.push("];");

  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  console.log(`Generated ${generated.length} modules: ${OUT}`);
}

main();
