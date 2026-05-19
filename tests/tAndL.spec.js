import { test, expect } from './test-fixtures';
import {login,search,navigateTo} from '../utils/general.js';
import {addFacility, editFacility,setFacilityActive,verifyEdit} from '../pages/facilities.js'
import { time, timeStamp } from 'console';
import {addTrainer,addLocation} from '../pages/tAndL.js';

test('Add Trainer and location', async ({ page }) => {
  await login(page);
  await navigateTo(page,'Facilities');
  await setFacilityActive(page,'Test title : upd');
  await navigateTo(page,'Trainers & Locations');
  let timeStamp = Date.now();
  await addTrainer(page, timeStamp); // Change the function name to addTL and import it from the tAndL page
  await search(page,timeStamp);
  await addLocation(page, timeStamp); // Change the function name to addTL and import it from the tAndL page
  await search(page,timeStamp);  
});

