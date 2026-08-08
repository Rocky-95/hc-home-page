const fs = require("fs");
const axios = require("axios");

const COLLECTION = "c:\\Users\\RK\\Downloads\\httpie-space-harry-clinton-2.json";
const data = JSON.parse(fs.readFileSync(COLLECTION, "utf8"));

const env = data.entry?.environments?.[0]?.variables || [];
const vars = Object.fromEntries(env.map((v) => [v.name, v.value]));

// allow base override: node check-apis.js https://...
if (process.argv[2]) {
  vars.P = process.argv[2];
}

const all = [];
(data.entry?.collections || []).forEach((c) =>
  (c.requests || []).forEach((r) => all.push({ ...r, folder: c.name }))
);

function resolve(url) {
  return url.replace(/\{\{(\w+)\}\}/g, (_, name) => vars[name] || `{{${name}}}`);
}

function safeJson(text) {
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const client = axios.create({ timeout: 15000, validateStatus: () => true });

async function test(req) {
  const url = resolve(req.url);
  const method = (req.method || "GET").toLowerCase();
  const headers = req.headers
    ? Object.fromEntries(req.headers.map((h) => [h.name, h.value]))
    : {};

  let body;
  if (req.body?.type === "text" && req.body.text?.value) {
    body = safeJson(req.body.text.value);
  }

  const start = Date.now();
  try {
    const res = await client.request({ method, url, headers, data: body });
    return {
      name: req.name,
      folder: req.folder || "(root)",
      method: method.toUpperCase(),
      path: url.replace(vars.P, ""),
      status: res.status,
      time: Date.now() - start,
      error: null,
    };
  } catch (err) {
    return {
      name: req.name,
      folder: req.folder || "(root)",
      method: method.toUpperCase(),
      path: url.replace(vars.P, ""),
      status: `NET: ${err.code || err.message}`,
      time: Date.now() - start,
      error: err.message,
    };
  }
}

async function run() {
  console.log(`Testing ${all.length} requests from ${COLLECTION}...\n`);
  const results = [];

  for (let i = 0; i < all.length; i += 6) {
    const batch = all.slice(i, i + 6);
    const batchResults = await Promise.all(batch.map((r) => test(r)));
    results.push(...batchResults);
  }

  const statusCounts = {};
  const methodCounts = {};
  const broken = [];
  const notFound = [];

  results.forEach((r) => {
    const code = Number.isInteger(r.status) ? r.status : "NET";
    statusCounts[code] = (statusCounts[code] || 0) + 1;
    methodCounts[r.method] = (methodCounts[r.method] || 0) + 1;
    if (code === 404) notFound.push(r);
    if (code >= 500 || code === "NET") broken.push(r);
  });

  const success = results.filter((r) => Number.isInteger(r.status) && r.status >= 200 && r.status < 400);
  const unauthorized = statusCounts[401] || 0;

  console.log("=== SUMMARY ===");
  console.log(`Total requests:       ${results.length}`);
  console.log(`2xx/3xx (working):    ${success.length}`);
  console.log(`401 (needs auth):     ${unauthorized}`);
  console.log(`404 (not found):      ${notFound.length}`);
  console.log(`5xx / network issues: ${broken.length}`);

  console.log("\n=== STATUS CODE COUNTS ===");
  Object.entries(statusCounts)
    .sort(([a], [b]) => a - b)
    .forEach(([code, count]) => console.log(`  ${code}: ${count}`));

  console.log("\n=== BROKEN / SERVER ERRORS / NETWORK ===");
  if (broken.length === 0) {
    console.log("None.");
  } else {
    broken.forEach((r) =>
      console.log(`[${r.method}] ${r.path} -> ${r.status} (${r.time}ms) — ${r.name} (${r.folder})`)
    );
  }

  if (notFound.length) {
    console.log(`\n=== 404 NOT FOUND (first 30) ===`);
    notFound.slice(0, 30).forEach((r) =>
      console.log(`[${r.method}] ${r.path} — ${r.name} (${r.folder})`)
    );
    if (notFound.length > 30) console.log(`... and ${notFound.length - 30} more 404s`);
  }

  if (unauthorized) {
    console.log(`\n=== NOTE ===`);
    console.log(`${unauthorized} endpoint(s) returned 401. These require authentication and are not necessarily broken.`);
  }

  fs.writeFileSync("api-check-results.json", JSON.stringify(results, null, 2));
}

run().catch((e) => {
  console.error("Script failed:", e);
  process.exit(1);
});
