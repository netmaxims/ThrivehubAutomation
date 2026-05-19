import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);
    if (testInfo.status !== 'passed') {
      const dom = await page.locator('body').innerHTML();
      await testInfo.attach('full-dom', {
        body: dom,
        contentType: 'text/plain',
      });
    }
  },
});

export const expect = test.expect;
