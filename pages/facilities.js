import { expect } from '@playwright/test';
import { timeStamp } from 'console';
import path from 'path';
import locator from '../locators/locators.json';

async function addFacility(page) {
    console.log('Adding facility method called');
    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.locator(locator.addFacilityButton).click();
    await page.locator(locator.facilityTitleInput).fill(`Test title : ${timeStamp}`);
    await page.locator(locator.facilityLocation).fill(`test location : ${timeStamp}`);
    const filePath = path.resolve(__dirname, '../resources/image.png');
    await page.locator(locator.imageInput).setInputFiles(filePath);
    await page.locator(locator.imageDeleteButton).hover();
    await expect(page.locator(locator.imageDeleteButton)).toBeVisible();
    await page.locator(locator.themeSelectorDark).click();
    await page.locator(locator.facilityAbout).fill(`About this class : ${timeStamp}`);
    await page.locator(locator.facilityVisibilityCheckbox).click();
    await page.locator(locator.saveChangeButton).click();
    return timeStamp;
}

async function editFacility(page) {
    console.log('Editing facility method called');
    await page.locator(locator.editFacilityButton).first().click();

    await page.locator(locator.facilityTitleInput)
        .fill('Test title : upd');

    await page.locator(locator.facilityLocation)
        .fill('test location : upd');

    // Delete existing image
    await page.locator(locator.imageDeleteButton).click();

    // Upload updated image
    const filePath = path.resolve(__dirname, '../resources/updated.png');

    await page.locator(locator.imageInput)
        .setInputFiles(filePath);

    // Wait for upload/render
    await page.waitForTimeout(10000);

    // Locate actual next/image img tag
    const img = page.locator('img').last();

    // Ensure image visible
    await expect(img).toBeVisible();

    // Wait for src/srcset to update
    await expect(img).toHaveAttribute(
        'srcset',
        /JON6heR526|updated|thrive-hub/i
    );

    // Validate image fully loaded
    const isLoaded = await img.evaluate((el) => {
        return el.complete && el.naturalWidth > 0;
    });

    expect(isLoaded).toBeTruthy();

    // Optional logging
    console.log(await img.getAttribute('src'));
    console.log(await img.getAttribute('srcset'));

    // Continue flow
    await page.locator(locator.themeSelectorDark).click();

    await page.locator(locator.facilityAbout)
        .fill('About this class : upd');

    await page.locator(locator.facilityVisibilityCheckbox).click();
    await page.waitForTimeout(10000);

    await page.locator(locator.saveChangeButton).click();
}

async function verifyEdit(page,timeStamp){
    console.log('verifying edit for facility: ' + timeStamp);
    await page.reload();
    await page.locator(locator.searchBox).fill('TEST TITLE : UPD');
    await page.waitForTimeout(2000);
    const firstRowTitle = await page.locator(`//tr[1]/td[1]`).innerText();
    expect(firstRowTitle).toContain(`TEST TITLE : UPD`);
}

async function EditPermissions(page, timeStamp) {
    console.log('Editing permissions for facility: ' + timeStamp);
    await page.reload();
    await page.locator(``).click();

}

async function setFacilityActive(page, facilityName) {
    console.log('Setting facility active: ' + facilityName);
    await page.locator(locator.searchBox).fill(facilityName);
    await page.waitForTimeout(1000);
    await page.locator(locator.editFacilityButton).first().click();
    if (!(await page.locator(locator.facilityVisibilityCheckbox).isChecked())) {
    await page.locator(locator.facilityVisibilityCheckbox).click();
}
    await page.locator(locator.saveChangeButton).click();
}



export {addFacility,editFacility,verifyEdit,setFacilityActive};