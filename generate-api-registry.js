const fs = require("fs");
const path = require("path");

const COLLECTION = "c:\\Users\\RK\\Downloads\\httpie-space-harry-clinton-2.json";
const OUT = path.join(__dirname, "src", "services", "apiRegistry.js");

function isVar(s) {
  return /^\{\{[^{}]+\}\}$/i.test(s) || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s) || /^\d+$/i.test(s);
}

function splitPath(url) {
  return url.replace(/^\{\{P\}\}\//, "").replace(/^\//, "").split("/").filter(Boolean);
}

function camelCase(str) {
  return str
    .split(/[-_/]/)
    .map((p, i) => (i === 0 ? p.charAt(0).toLowerCase() + p.slice(1) : p.charAt(0).toUpperCase() + p.slice(1)))
    .join("");
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

  // base path -> { methods: Set, hasId: bool }
  const resourceMap = new Map();

  for (const r of allReqs) {
    const parts = splitPath(r.url || "");
    if (!parts.length) continue;

    const baseParts = [];
    let hasId = false;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (isVar(p)) {
        hasId = true;
        break;
      }
      baseParts.push(p);
    }
    const base = baseParts.join("/");
    if (!base) continue;

    if (!resourceMap.has(base)) {
      resourceMap.set(base, { methods: new Set(), hasId: false });
    }
    const meta = resourceMap.get(base);
    meta.methods.add(r.method);
    if (hasId) meta.hasId = true;
  }

  const lines = [
    "import api from \"../admin/services/api\";",
    "",
    "// Auto-generated from httpie-space-harry-clinton-2.json",
    "// Exports a registry of callable service objects for every API resource.",
    "",
    "export const apiRegistry = {",
  ];

  for (const [base, meta] of resourceMap) {
    const key = base;
    const varName = camelCase(base);
    const pathStr = `/${base}`;

    lines.push(`  "${key}": {`);

    if (meta.methods.has("GET") && !meta.hasId) {
      lines.push(`    list: () => api.get("${pathStr}").then((res) => res.data),`);
    }

    if (meta.hasId || meta.methods.has("GET")) {
      lines.push(`    get: (id) => api.get(\`/${base}/\${id}\`).then((res) => res.data),`);
    }

    if (meta.methods.has("POST")) {
      lines.push(`    create: (payload) => api.post("${pathStr}", payload).then((res) => res.data),`);
    }

    if (meta.methods.has("PUT")) {
      lines.push(`    update: (payload) => api.put("/${base}", payload).then((res) => res.data),`);
    }

    if (meta.methods.has("DELETE")) {
      lines.push(`    remove: (id) => api.delete("/${base}", { data: { id } }).then((res) => res.data),`);
    }

    if (meta.methods.has("PATCH")) {
      lines.push(`    patch: (payload) => api.patch("/${base}", payload).then((res) => res.data),`);
    }

    // non-CRUD method names handled by the direct method keys below

    lines.push(`  },`);
  }

  lines.push("};");
  lines.push("");
  lines.push("export const getApi = (resource) => apiRegistry[resource];");
  lines.push("");
  lines.push("export default apiRegistry;");

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  console.log(`Generated API registry with ${resourceMap.size} resources: ${OUT}`);
}

main();
