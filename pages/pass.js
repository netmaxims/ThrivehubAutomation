import { test, expect } from '@playwright/test';
import path from 'path';
import locator from '../locators/locators.json';
import { text } from 'stream/consumers';
import { time } from 'console';

async function createPass(page,timestamp) {
  console.log('Creating pass method called');
  await page.getByRole('button', { name: 'Add Pass' }).click();
  await page.getByRole('button', { name: 'Choose Facilities...' }).click();
  await page.getByRole('textbox', { name: 'Pass name' }).fill(`Test pass name ${timestamp}`);
  await page.locator('#headlessui-listbox-option-_r_10_').click();
  await page.getByRole('textbox', { name: 'Pass Price ($)' }).fill('100');
  await page.getByRole('textbox', { name: 'Pass Price ($)' }).press('Tab');
  await page.getByRole('textbox', { name: 'Total Credits' }).fill('10');
  await page.getByRole('textbox', { name: 'Total Credits' }).press('Tab');
  await page.getByRole('textbox', { name: 'Stock Quantity' }).fill('5');
  await page.getByRole('textbox', { name: 'Stock Quantity' }).press('Tab');
  await page.getByRole('textbox', { name: 'Persons / Bookings' }).fill('5');
  await page.locator('label').filter({ hasText: 'Applicable Classes (Allow for' }).getByRole('img').click();
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill('P');
  await page.locator('div').filter({ hasText: /^P$/ }).nth(2).fill('Pass desc');
  await page.locator('(//button[contains(text(), "Discard")]/../Button)[2]').click();
  await expect(page.getByText('Pass created successfully.').nth(1)).toBeVisible({ timeout: 5000 });
}

export { createPass };