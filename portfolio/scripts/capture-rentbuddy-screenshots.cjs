/**
 * Capture live Rent Buddy pages for portfolio frames.
 * Run: node scripts/capture-rentbuddy-screenshots.cjs
 *
 * Drop your own PNGs over the same filenames to update without re-running:
 *   public/projects/rent-buddy/home.png
 *   public/projects/rent-buddy/product.png
 *   public/projects/rent-buddy/login.png
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const OUT = path.join(__dirname, "../public/projects/rent-buddy");
const BASE = "https://rentbuddy.in";

const pages = [
  { path: "/home", file: "home.png" },
  { path: "/product", file: "product.png" },
  { path: "/login", file: "login.png" },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const { path: route, file } of pages) {
    console.log(`  → ${route}`);
    await page.goto(`${BASE}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(2500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const outPath = path.join(OUT, file);
    await page.screenshot({ path: outPath, type: "png" });
    execSync(`sips -Z 1440 "${outPath}" --out "${outPath}"`, { stdio: "ignore" });
    console.log(`  ✓ ${file}`);
  }

  await browser.close();
  console.log("\nDone — swap PNGs in public/projects/rent-buddy/ anytime.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
