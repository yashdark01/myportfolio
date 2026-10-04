const { chromium } = require("/Users/yash/.npm/_npx/0cf6ff1fad43f633/node_modules/playwright");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const viewports = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 14", width: 390, height: 844 },
  { name: "Pixel 7", width: 412, height: 915 },
  { name: "iPad Mini", width: 768, height: 1024 },
  { name: "iPad Pro", width: 1024, height: 1366 },
  { name: "Laptop", width: 1280, height: 800 },
  { name: "Desktop", width: 1440, height: 900 },
];

const issues = [];

function report(viewport, type, detail) {
  issues.push({ viewport: viewport.name, type, detail });
}

async function checkViewport(page, viewport) {
  await page.setViewportSize({
    width: viewport.width,
    height: viewport.height,
  });
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForSelector("#hero h1", { timeout: 60000 });
  // The navigation is client-rendered. Give React hydration a stable checkpoint
  // before exercising controls, especially on a cold development build.
  await page.waitForTimeout(1800);

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  if (overflow.scrollWidth > overflow.clientWidth + 1) {
    report(
      viewport,
      "horizontal-overflow",
      `scrollWidth ${overflow.scrollWidth}px > clientWidth ${overflow.clientWidth}px`,
    );
  }

  const menuBtn = page.locator('button[aria-controls="site-menu"]');
  if (!(await menuBtn.isVisible())) {
    report(viewport, "nav", "Editorial menu button not visible");
  } else {
    await menuBtn.click();
    await page.waitForFunction(
      () => document.querySelector('button[aria-controls="site-menu"]')?.getAttribute("aria-expanded") === "true",
      { timeout: 10000 },
    );
    await page.waitForSelector("#site-menu", { state: "visible", timeout: 10000 });
    const panelBox = await page.locator("#site-menu").boundingBox();
    if (!panelBox || panelBox.width < viewport.width - 2) {
      report(viewport, "nav", "Full-screen menu does not cover the viewport");
    }
    if ((await menuBtn.getAttribute("aria-expanded")) !== "true") {
      report(viewport, "nav", "aria-expanded not true when menu open");
    }
    const menuLinks = await page.locator("#site-menu a[href]").count();
    if (menuLinks < 8) {
      report(viewport, "nav", `Only ${menuLinks} navigation links are available`);
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    if ((await menuBtn.getAttribute("aria-expanded")) === "true") {
      report(viewport, "nav", "Menu still marked open after Escape");
    }
  }

  const heroHeading = page.locator("#hero h1");
  const heroBox = await heroHeading.boundingBox();
  if (heroBox && heroBox.width > viewport.width - 32) {
    report(
      viewport,
      "hero",
      `Hero heading too wide (${Math.round(heroBox.width)}px)`,
    );
  }

  const personaButtons = page.locator('[aria-label="Portfolio focus"] button');
  await personaButtons.nth(1).click();
  await page.waitForTimeout(200);
  await personaButtons.first().click();
  await page.waitForTimeout(200);

  const postToggleOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  if (postToggleOverflow) {
    report(viewport, "layout-shift", "Horizontal overflow after persona toggle");
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`\nResponsive check — ${BASE}\n`);

  for (const viewport of viewports) {
    try {
      const before = issues.length;
      await checkViewport(page, viewport);
      const viewportIssues = issues.slice(before);
      if (viewportIssues.length === 0) {
        console.log(`✓ ${viewport.name} (${viewport.width}×${viewport.height})`);
      } else {
        console.log(`✗ ${viewport.name} (${viewport.width}×${viewport.height})`);
        for (const issue of viewportIssues) {
          console.log(`    • [${issue.type}] ${issue.detail}`);
        }
      }
    } catch (error) {
      console.log(`✗ ${viewport.name} — crashed: ${error.message}`);
      issues.push({ viewport: viewport.name, type: "crash", detail: error.message });
    }
  }

  await browser.close();
  console.log(`\nTotal issues: ${issues.length}`);
  process.exit(issues.length > 0 ? 1 : 0);
})();
