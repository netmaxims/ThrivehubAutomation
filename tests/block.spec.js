import { test, expect } from './test-fixtures';
import { createBlock } from '../pages/block.js';
import { login, navigateTo } from '../utils/general.js';

test('createblock', async ({ page }) => {
    await login(page);
    await navigateTo(page,'Block');
  await createBlock(page);
});