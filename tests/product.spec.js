import { test, expect } from './test-fixtures';
import { login } from '../utils/general.js';
import { createProduct } from '../pages/product.js';
import { navigateTo } from '../utils/general.js';

test('createproduct', async ({ page }) => {
  await login(page);
  await navigateTo(page,'Products');
  await createProduct(page);
});