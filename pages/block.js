import { expect } from '@playwright/test';

function todayDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function currentHourMinutes() {
  const h = String(new Date().getHours()).padStart(2, '0');
  return `${h}:00`;
}

async function createBlock(page) {
  await page.getByRole('button', { name: 'Add Block' }).click();
  await page.getByRole('button', { name: 'Choose Facility...' }).click();
  await page.locator('#headlessui-listbox-option-_r_j_').click();
  await page.getByRole('button', { name: 'Choose Trainer...' }).click();
  await page.getByRole('option', { name: 'Test name : 1779447099760' }).click();

  await page.getByRole('textbox', { name: 'Block Title' }).fill('Test Title');
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').press('CapsLock');
  await page.locator('.ql-editor').fill('T');

  await page.locator('div').filter({ hasText: /^T$/ }).nth(2).fill('Test desc');
  await page.getByRole('textbox', { name: 'Start Date' }).fill(todayDate());
  await page.getByRole('textbox', { name: 'Start Time' }).click();
  await page.getByRole('textbox', { name: 'Start Time' }).fill(currentHourMinutes());
  await page.getByRole('textbox', { name: 'Total Weeks' }).click();
  await page.getByRole('textbox', { name: 'Total Weeks' }).fill('1');
  await page.getByRole('textbox', { name: 'Session Duration' }).click();
  await page.getByRole('textbox', { name: 'Session Duration' }).fill('1h');
  await page.getByRole('button', { name: 'Sun' }).click();
  await page.getByRole('button', { name: 'Mon' }).click();
  await page.getByRole('button', { name: 'Tue' }).click();
  await page.getByRole('button', { name: 'Wed' }).click();
  await page.getByRole('button', { name: 'Thu' }).click();
  await page.getByRole('button', { name: 'Fri' }).click();
  await page.getByRole('button', { name: 'Sat' }).click();
  await page.getByRole('textbox', { name: 'Stock Quantity' }).fill('10');
  await page.getByRole('textbox', { name: 'Persons / Bookings' }).fill('10');
  await page.getByRole('textbox', { name: 'Total Amount' }).fill('100');
  await page.locator('(//button[contains(text(), "Discard")]/../Button)[2]').click();
  await expect(page.locator('Block created successfully.')).nth(1).toBeVisible({ timeout: 5000 });
}

export { createBlock };