import { test, expect } from './test-fixtures';
import { createPass } from '../pages/pass.js';
import { login, navigateTo } from '../utils/general.js';

test('createpass', async ({ page }) => {
  await login(page);
  await navigateTo(page,'Passes');
  const timestamp = Date.now();
  await createPass(page, timestamp);
});