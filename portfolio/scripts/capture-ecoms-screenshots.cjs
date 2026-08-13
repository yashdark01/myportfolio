/**
 * Capture live EcoMS website views for Ecometer portfolio frames.
 * Run: node scripts/capture-ecoms-screenshots.cjs
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "../public/projects/ecometer");
const PLATFORM_URL =
  "https://ecomsww.com/ecometer-the-carbon-economy-for-advertising/";
const CASE_STUDIES_URL = "https://ecomsww.com/case-studies/";
const HOME_URL = "https://ecomsww.com/";

const VIEWPORT = { width: 1440, height: 900 };

async function dismissOverlays(page) {
  for (const selector of [
    '[class*="cookie"] button',
    "#cookie-notice button",
    ".cky-btn-accept",
    'button:has-text("Accept")',
  ]) {
    try {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 800 })) await btn.click();
    } catch {
      /* no overlay */
    }
  }
}

async function waitForImages(page) {
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll("img")];
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          }),
      ),
    );
  });
}

async function scrollToImage(page, srcMatch, scrollOffset = 120) {
  await page.evaluate(
    ({ match, scrollOffset }) => {
      const img = [...document.querySelectorAll("img")].find((i) =>
        i.src.includes(match),
      );
      if (img) {
        const y = img.getBoundingClientRect().top + window.scrollY - scrollOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
      }
    },
    { match: srcMatch, scrollOffset },
  );
  await page.waitForTimeout(1000);
}

async function scrollToHeading(page, text, offset = 80) {
  await page.evaluate(
    ({ text, offset }) => {
      const el = [...document.querySelectorAll("h2, h3")].find((h) =>
        h.textContent?.trim().includes(text),
      );
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
      }
    },
    { text, offset },
  );
  await page.waitForTimeout(800);
}

async function captureViewport(page, filename) {
  const outPath = path.join(OUT, filename);
  await waitForImages(page);
  await page.screenshot({ path: outPath, fullPage: false, type: "png" });
  const stat = fs.statSync(outPath);
  console.log(`  ✓ ${filename} (${Math.round(stat.size / 1024)} KB)`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  console.log("Capturing platform page sections…");
  await page.goto(PLATFORM_URL, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  await page.waitForTimeout(3000);
  await dismissOverlays(page);

  // Hero / overview — top of platform page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await captureViewport(page, "overview.png");

  // "One platform. Real impact." band
  await scrollToHeading(page, "One platform");
  await captureViewport(page, "platform-info.png");

  const featureImages = [
    { match: "Measure-1-scaled", file: "measure.png" },
    { match: "Manage-1-scaled", file: "manage.png" },
    { match: "esg-1-scaled", file: "report-esg.png" },
    { match: "table-bru", file: "reporting-table.png", offset: 80 },
    { match: "Visualise-1-scaled", file: "visualise.png" },
  ];

  for (const { match, file, offset } of featureImages) {
    console.log(`  → ${file}`);
    await scrollToImage(page, match, offset ?? 120);
    await captureViewport(page, file);
  }

  console.log("Capturing case studies page…");
  await page.goto(CASE_STUDIES_URL, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  await page.waitForTimeout(3000);
  await dismissOverlays(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await captureViewport(page, "case-studies.png");

  console.log("Capturing homepage Ecometer section…");
  await page.goto(HOME_URL, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(3000);
  await dismissOverlays(page);
  await scrollToHeading(page, "Ecometer", 100);
  await captureViewport(page, "platform.png");

  // Hero preview — best above-the-fold platform shot
  await page.goto(PLATFORM_URL, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await captureViewport(page, "preview.png");

  await browser.close();
  console.log("\nDone — assets saved to public/projects/ecometer/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
