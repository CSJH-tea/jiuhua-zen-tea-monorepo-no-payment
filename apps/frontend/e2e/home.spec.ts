import { test, expect } from '@playwright/test';

test('homepage has brand title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=九华禅茶')).toHaveCount(1);
});
