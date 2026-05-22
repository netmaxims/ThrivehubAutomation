import { test, expect } from '@playwright/test';
import path from 'path';
import locator from '../locators/locators.json';
import { text } from 'stream/consumers';
import { time } from 'console';


async function createslot(page,timestamp) {
  console.log('Creating slot method called');
  await page.getByRole('button', { name: 'Add Slots' }).click();
  await page.getByRole('button', { name: 'Target Facility Choose' }).click();
  await page.getByText('Test title : upd').first().click();
  await page.getByRole('button', { name: 'Class Level Select level' }).click();
  await page.getByRole('option', { name: `Title test : ${timestamp}` }).click();
 
  await page.getByRole('button', { name: 'Trainer Select Trainer' }).click();
  await page.locator(`//div[contains(text(),'Test name : ')]`).first().click();
  
  await page.getByRole('button', { name: 'Location Select Location' }).click();
  await page.getByRole('option', { name: 'Test title : upd' }).click();
  await page.getByRole('button', { name: 'Slot Status Select Status' }).click();
  await page.locator('//div[contains(text(),"Available")]').click();
  await page.getByRole('textbox', { name: 'Time' }).fill('00:00');
  await page.getByRole('textbox', { name: 'Duration' }).fill('1h');
  await page.getByRole('textbox', { name: 'Max Booking' }).fill('100');
  await page.getByRole('textbox', { name: 'Persons / Bookings' }).fill('2');
  await page.getByRole('button', { name: 'Create Slots' }).click();
  await page.getByText('Class slot created').nth(1).click();
};

export { createslot };