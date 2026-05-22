import { test, expect } from '@playwright/test';
import path from 'path';
import locator from '../locators/locators.json';
import { text } from 'stream/consumers';
import { time } from 'console';

async function addTrainer(page, timeStamp) {
  console.log('Adding trainer method called');
  await page.locator('//button/span[text()="Trainers"]').click();
  await page.getByRole('button', { name: 'Add Trainer' }).click();
  await page.getByRole('button', { name: 'Choose Facilities...' }).click();
  await page.getByRole('option', { name: 'Test title : upd' }).first().click();
  await page.keyboard.press('Escape'); 
  await page.locator('//span[contains(normalize-space(), "classes cancel")]/ancestor::*[2]//input').first().click({force:true});
  await page.locator('//span[contains(normalize-space(), "classes reschedule")]/ancestor::*[2]//input').first().click({force:true});
  await page.locator('//span[contains(normalize-space(), "Shift Classes")]/ancestor::*[2]//input').first().click({force:true});


  await page.locator('//input[@placeholder="e.g. Rahul Sharma"]').fill('Test name : ' + timeStamp);
  await page.locator('//input[@placeholder="coach@121fit.com"]').fill('test'+ Date.now() + '@gmail.com');
  await page.getByRole('textbox', { name: 'Primary Phone' }).fill('0712312312');
  await page.getByRole('textbox', { name: 'Specialization' }).fill('test spec');
  await page.getByRole('textbox', { name: 'Rank' }).fill('1');

  const filePath = path.resolve(__dirname, '../resources/trainer.jpg');   
  await page.locator('input[type="file"]').setInputFiles(filePath);
  await page.waitForTimeout(10000); // Wait for upload/render

  const btn = page.locator('(//button[contains(text(), "Discard")]/../Button)[2]');

  await btn.click({force:true,delay:1000});
  await page.waitForSelector("//div[@role='status' and text()='Trainer created successfully.']", { timeout: 5000 });
};

async function addLocation(page, timeStamp) {
  console.log('Adding location method called');
  await page.locator('//button/span[text()="Locations"]').click();
  await page.locator('//button[text()="Add Location"]').click();
  await page.getByRole('button', { name: 'Choose Facilities...' }).click();
  await page.getByRole('option', { name: 'Test title : upd' }).first().click();
  await page.keyboard.press('Escape');
  await page.locator('//input[@placeholder="e.g. Rahul Sharma"]').fill('Test name : ' + timeStamp);
  await page.locator('//button[normalize-space()="Submit"]').click();
  
  await page.waitForSelector("//div[@role='status' and text()='Location created successfully.']", { timeout: 5000 });
} 



export {addTrainer,addLocation};