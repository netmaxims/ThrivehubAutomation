import { test, expect } from './test-fixtures';
import { createslot } from '../pages/timetable.js';
import { setFacilityActive } from '../pages/facilities.js';
import {login,search,navigateTo} from '../utils/general.js';

test('createslot', async ({ page }) => {
    await login(page);
    await navigateTo(page,'Facilities');
    await setFacilityActive(page,'Test title : upd');
    await navigateTo(page,'Timetable');
    let timeStamp = '1779424981570';
    await createslot(page,timeStamp);
    await expect(page.getByText('Class slot created').nth(1)).toBeVisible();
});
