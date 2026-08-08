const fs = require("fs");
const path = require("path");

const RESULTS_FILE = "api-check-results.json";

function getKeywords(pathStr) {
  const parts = pathStr
    .replace(/^\//, "")
    .split("/")
    .filter((s) => s && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s) && !/^\d+$/i.test(s));

  const set = new Set();
  parts.forEach((seg) => {
    const raw = seg;
    const lower = raw.toLowerCase();
    const pieces = raw.split("-");
    const camel =
      pieces[0].toLowerCase() +
      pieces
        .slice(1)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join("");
    const pascal = pieces
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join("");
    const snake = raw.replace(/-/g, "_");
    const scream = snake.toUpperCase();
    const dashedLower = lower;

    [raw, lower, camel, pascal, snake, scream, dashedLower].forEach((k) => {
      if (k) set.add(k);
    });
  });
  return [...set].filter(Boolean);
}

function collectSourceFiles(dir) {
  const files = [];
  function walk(current) {
    for (const f of fs.readdirSync(current)) {
      const p = path.join(current, f);
      const s = fs.statSync(p);
      if (s.isDirectory()) walk(p);
      else if (/\.(js|jsx|ts|tsx)$/i.test(f)) files.push(p);
    }
  }
  walk(dir);
  return files;
}

function main() {
  if (!fs.existsSync(RESULTS_FILE)) {
    console.log(`Run node check-apis.js <base-url> first to create ${RESULTS_FILE}`);
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(RESULTS_FILE, "utf8"));
  const working = results.filter(
    (r) => Number.isInteger(r.status) && r.status >= 200 && r.status < 400
  );

  const srcDir = path.join(__dirname, "src");
  const files = fs.existsSync(srcDir) ? collectSourceFiles(srcDir) : [];

  const allSrc = files
    .map((f) => fs.readFileSync(f, "utf8"))
    .join("\n")
    .toLowerCase();

  const missing = [];
  const integrated = [];

  for (const r of working) {
    const keywords = getKeywords(r.path).map((k) => k.toLowerCase());
    const found = keywords.some((k) => allSrc.includes(k));
    if (found) {
      integrated.push(r);
    } else {
      missing.push(r);
    }
  }

  console.log("=== INTEGRATION CHECK ===");
  console.log(`Working APIs:     ${working.length}`);
  console.log(`Integrated:       ${integrated.length}`);
  console.log(`Missing in src/: ${missing.length}`);

  console.log("\n=== MISSING (not found in source) ===");
  if (missing.length === 0) {
    console.log("None.");
  } else {
    missing.forEach((r) =>
      console.log(`[${r.method}] ${r.path} — ${r.name} (${r.folder})`)
    );
  }
}

main();
