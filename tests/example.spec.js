// @ts-check
const { test, expect } = require('@playwright/test');

test('Can add note', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  let input = await page.locator('input#new-todo');

  // Adds one new item
  await input.fill('Make food');
  await page.keyboard.press('Enter');

  // Locates the item counter
  let inputText = await page.locator('.todoText').textContent();

  await expect(inputText).toEqual('Make food');
});


test('Add note then mark it as finished and items left change', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  let input = await page.locator('input#new-todo');

  //Adds one new item
  await input.fill('Make food');
  await page.keyboard.press('Enter');

  // Locates the item counter
  let itemCounter = await page.locator('#todo-count').textContent();

  await expect(itemCounter).toEqual('1 item left');

  // Locates the checkbox then clicks on the checkbox
  let checkBox = await page.locator('.toggle');
  await checkBox.click();

  // Checks the itemcounter after the box has been checked
  itemCounter = await page.locator('#todo-count').textContent();

  await expect(itemCounter).toEqual('0 items left');
});


test('Add 3 notes, check one box and see if items left changes', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/');

  let input = await page.locator('input#new-todo');

  //Adds first new item
  await input.fill('Buy food');
  await page.keyboard.press('Enter');

  //Adds second new item
  await input.fill('Make food');
  await page.keyboard.press('Enter');

  //Adds third new item
  await input.fill('Eat food');
  await page.keyboard.press('Enter');

  // Locates the checkbox then clicks on the checkbox
  let checkBox = await page.locator('.toggle').first();;
  await checkBox.click();
  
  // Locates the item counter
  let itemCounter = await page.locator('#todo-count').textContent();

  await expect(itemCounter).toEqual('2 items left');
});