const { chromium } = require("/Users/yash/.npm/_npx/0cf6ff1fad43f633/node_modules/playwright");

const BASE = process.env.BASE_URL || "http://localhost:3000";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForSelector("#hero h1");

  // Open mobile menu (scroll lock active)
  await page.locator('button[aria-controls="mobile-nav-panel"]').click();
  await page.waitForFunction(
    () =>
      document
        .querySelector('button[aria-controls="mobile-nav-panel"]')
        ?.getAttribute("aria-expanded") === "true",
  );
  await page.waitForTimeout(400);

  // Tap Work link
  await page.locator('#mobile-nav-panel a[href="/#work"]').click();
  await page.waitForTimeout(800);

  const workInView = await page.evaluate(() => {
    const el = document.getElementById("work");
    if (!el) return { ok: false, reason: "no work section" };
    const rect = el.getBoundingClientRect();
    const navH = 80;
    return {
      ok: rect.top < window.innerHeight * 0.5 && rect.top >= navH - 20,
      top: rect.top,
      menuClosed:
        (document.querySelector('button[aria-controls="mobile-nav-panel"]')?.getAttribute("aria-expanded")) === "false",
      bodyFixed: document.body.style.position === "fixed",
    };
  });

  console.log("Mobile nav → Work:", workInView);

  // Desktop nav on homepage
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForSelector("#hero h1");
  await page.locator('nav[aria-label="Main navigation"] a[href="/#contact"]').click();
  await page.waitForTimeout(800);

  const contactInView = await page.evaluate(() => {
    const el = document.getElementById("contact");
    const rect = el?.getBoundingClientRect();
    return { ok: !!rect && rect.top < window.innerHeight * 0.6, top: rect?.top };
  });

  console.log("Desktop nav → Contact:", contactInView);

  await browser.close();

  const pass = workInView.ok && workInView.menuClosed && !workInView.bodyFixed && contactInView.ok;
  process.exit(pass ? 0 : 1);
})();
