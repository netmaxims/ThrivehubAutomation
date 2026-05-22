import path from 'path';
import locator from '../locators/locators.json';
import { expect } from '@playwright/test';

async function createProduct(page) {
  
  await page.getByRole('button', { name: 'Add Product' }).click();
  await page.getByRole('button', { name: 'Choose Facilities...' }).click();
  await page.getByText('Test title : upd').first().click();
  await page.keyboard.press('Escape');
  await page.getByRole('textbox', { name: 'Product Name' }).click();
  await page.getByRole('textbox', { name: 'Product Name' }).fill('test product : ' + Date.now());
  await page.getByRole('textbox', { name: 'Category' }).click();
  await page.getByRole('textbox', { name: 'Category' }).fill('Test category : ' + Date.now());
  await page.getByRole('textbox', { name: 'Colors' }).click();
  await page.getByRole('textbox', { name: 'Colors' }).fill('Red');
  await page.getByRole('textbox', { name: 'Discount (%) %' }).fill('10');
  await page.locator("//span[normalize-space()='Draft']/../..//label/span/input").click({force:true});
  await page.getByRole('button', { name: 'XS' }).click();
  await page.getByPlaceholder('0').nth(2).click();
  await page.getByPlaceholder('0').nth(2).fill('10');
  await page.getByPlaceholder('0').nth(3).click();
  await page.getByPlaceholder('0').nth(3).fill('5');
  await page.locator('.ql-editor').click();
  await page.locator('.ql-editor').fill('test desc');
  await page.locator(locator.imageInput).setInputFiles(path.resolve('resources/image.png'));
  await page.waitForTimeout(10000);
  await page.locator(`(//button[contains(text(), "Discard")]/../Button)[2]`).click({force:true,delay:1000});
}

export { createProduct };