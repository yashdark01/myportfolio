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
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#hero h1", { timeout: 15000 });
  await page.waitForTimeout(600);

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

  const isMobile = viewport.width < 768;
  const menuBtn = page.locator('button[aria-controls="mobile-nav-panel"]');
  const desktopNav = page.locator(
    'nav[aria-label="Main navigation"] >> a[href="/#work"]',
  );

  if (isMobile) {
    if (!(await menuBtn.isVisible())) {
      report(viewport, "nav", "Mobile menu button not visible");
    } else {
      await menuBtn.click();
      await page.waitForSelector("#mobile-nav-panel", { state: "visible" });

      const panel = page.locator("#mobile-nav-panel");
      const panelBox = await panel.boundingBox();
      if (!panelBox || panelBox.width < 200) {
        report(viewport, "nav", "Mobile menu panel too narrow or missing");
      }

      if ((await menuBtn.getAttribute("aria-expanded")) !== "true") {
        report(viewport, "nav", "aria-expanded not true when menu open");
      }

      await page.keyboard.press("Escape");
      await page.waitForTimeout(600);

      if ((await menuBtn.getAttribute("aria-expanded")) === "true") {
        report(viewport, "nav", "Menu still marked open after Escape");
      }

      await menuBtn.click();
      await page.waitForSelector("#mobile-nav-panel", { state: "visible" });
      await menuBtn.click();
      await page.waitForTimeout(500);

      if ((await menuBtn.getAttribute("aria-expanded")) === "true") {
        report(viewport, "nav", "Menu still open after hamburger toggle");
      }
    }

    if (await desktopNav.isVisible()) {
      report(viewport, "nav", "Desktop nav links visible on mobile");
    }

    const fabClearance = await page.evaluate(() => {
      const resume = document.querySelector(".mobile-resume-fab");
      const hr = document.querySelector('button[aria-label="Open recruiter mode"]');
      if (!resume || !hr) return null;
      const a = resume.getBoundingClientRect();
      const b = hr.getBoundingClientRect();
      const overlap =
        a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      const bottomClear = Math.min(a.bottom, b.bottom);
      return {
        overlap,
        bottomClear,
        viewportH: window.innerHeight,
      };
    });

    if (fabClearance?.overlap) {
      report(viewport, "fab", "Resume FAB overlaps HR button");
    }
    if (fabClearance && fabClearance.bottomClear > fabClearance.viewportH - 8) {
      report(viewport, "fab", "Bottom FABs may clip below viewport");
    }
  } else {
    if (await menuBtn.isVisible()) {
      report(viewport, "nav", "Mobile menu button visible on desktop");
    }
    if (!(await desktopNav.isVisible())) {
      report(viewport, "nav", "Desktop nav links not visible");
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

  await page.locator('button[role="tab"]').nth(1).click();
  await page.waitForTimeout(200);
  await page.locator('button[role="tab"]').first().click();
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
