const fs = require("fs");

const results = JSON.parse(fs.readFileSync("api-check-results.json", "utf8"));

function basePath(p) {
  const parts = p.replace(/^\//, "").split("/").filter(Boolean);
  // remove UUID / numeric segments, keep the first real resource segment
  const resource = parts.find((s) => !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s) && !/^\d+$/i.test(s));
  return resource || p || "(empty)";
}

function printGroup(title, items, limit = 30) {
  console.log(`\n=== ${title} ===`);
  if (items.length === 0) {
    console.log("None.");
    return;
  }
  items.slice(0, limit).forEach((r) =>
    console.log(`[${r.method}] ${r.path} (${r.status}) — ${r.name} (${r.folder})`)
  );
  if (items.length > limit) console.log(`... and ${items.length - limit} more`);
}

function countByRoot(items) {
  const map = {};
  items.forEach((r) => {
    const root = basePath(r.path);
    if (!map[root]) map[root] = [];
    map[root].push(r);
  });
  return map;
}

const byStatus = {};
results.forEach((r) => {
  const code = Number.isInteger(r.status) ? r.status : "NET";
  byStatus[code] = (byStatus[code] || 0) + 1;
});

const notFound = results.filter((r) => r.status === 404);
const badRequest = results.filter((r) => r.status === 400);
const conflict = results.filter((r) => r.status === 409);
const serverError = results.filter((r) => r.status === 500);
const networkErr = results.filter((r) => String(r.status).startsWith("NET"));

console.log("=== STATUS COUNTS ===");
Object.entries(byStatus)
  .sort(([a], [b]) => a - b)
  .forEach(([code, count]) => console.log(`  ${code}: ${count}`));

// 404 grouped by resource
console.log("\n=== 404 NOT FOUND BY RESOURCE (top) ===");
const notFoundByRoot = countByRoot(notFound);
const notFoundSorted = Object.entries(notFoundByRoot).sort((a, b) => b[1].length - a[1].length);
if (notFoundSorted.length === 0) console.log("None.");
else notFoundSorted.slice(0, 25).forEach(([root, list]) => console.log(`  ${root}: ${list.length}`));
if (notFoundSorted.length > 25) console.log(`  ... and ${notFoundSorted.length - 25} more resources`);

printGroup("400 BAD REQUEST", badRequest, 20);
printGroup("409 CONFLICT", conflict, 10);
printGroup("500 SERVER ERRORS", serverError, 25);
printGroup("INVALID / NETWORK ERRORS", networkErr, 10);
