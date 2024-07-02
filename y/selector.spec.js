import { test, expect } from '@playwright/test';

test('Learning selectors', async ({page}) => {
    //navigate to the webpage
    await page.goto('http://127.0.0.1:5500/y/clickMe.html')

    //1. Selecting by ID
    await page.locator('#clickButton').click()

    //2.Selecting by Class
    await page.locator('.button-style').click()

    //3.Selecting by Tag and CLass
    await page.locator('button.button-style').click()

    //4. Selecting by Atrribute Value
    await page.locator('[data-action="increment"]').click()
    // await page.locator('[id="clickButton"]').click()
    // await page.locator('[class="button-style"]').click()

    //5.  Selecting by Partial attribute
    await page.locator('[role*="but"]').click()

    //6. By Text content
    await page.locator('text=CLICK ME').click()

    //7. Combine selectors for precision, class and text - find exact text match
    await page.locator('.button-style:text("CLICK ME")').click()

    //8.  Selecting by has-test, find element containing specific text
    await page.locator('button:has-text("CLICK M")').click()

    //9. Attribute and text combination
    await page.locator('[data-action="increment"]:text("CLICK ME")').click()

    //10. Playwright locator
    //get by text
    await page.getByText('CLICK ME').click()

    //11. By Role
    await page.getByRole('button', { name: /click me/i}).click()

    // assert The counter
    await expect(page.locator('#counter')).toContainText('11')

    await page.pause()

})