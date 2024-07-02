import { test, expect } from '@playwright/test';

test.describe("Learn assertions @assertion_group", ()=>{
    test('Verify test page behavior @smoke', async({page})=>{
       await page.goto('https://the-internet.herokuapp.com/'); 
       //1. to have URL
       await expect(page).toHaveURL('https://the-internet.herokuapp.com/')
       
      

       //2. to have a Title
       await expect(page).toHaveTitle('The Internet ')
     })

     test('Continiues with assertions part1', async ({page}) => {
       await page.goto('https://the-internet.herokuapp.com/'); 
        
        
        //3. Assert visibility
        await expect(page.locator('h1')).toBeVisible()
      
        4.// Assert element to have text
        await expect(page.locator('h2')).toHaveText('Available Examples')

        //5.Assert containt text
        await expect(page.locator('body')).toContainText('WYSIWYG')
        await page.pause()
     })
     test('Continiues with assertions part2', async ({page}) => {
       await page.goto('https://the-internet.herokuapp.com/'); 
        await page.pause()

        //6. Assert count
    //   await expect(page.locator('a')).toHaveCount(46)

        //7. To be checked
        await page.goto('https://the-internet.herokuapp.com/checkboxes'); 

        await page.pause()

        await page.waitForTimeout(1000)
        await page.waitForLoadState('networkidle')

        let checkbox = await page.getByRole('checkbox').nth(0)
        await checkbox.waitFor()

        await page.getByRole('checkbox').nth(0).check();
        await page.getByRole('checkbox').nth(1).uncheck();
        await expect(page.getByRole('checkbox').nth(0)).toBeChecked()
        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked()
        await page.pause()
     })
     test('Continiues with assertions part3', async ({page}) => {
        page.goto('https://the-internet.herokuapp.com/login'); 
        await page.pause()

        //8.have a value
        await page.pause()
        await page.locator('#username').fill('tomsmith')
        await expect(page.locator('#username')).toHaveValue('tomsmith')

        //9. Element is enable
        await expect(page.locator('button[type="submit"]')).toBeEnabled()
       // await expect(page.locator('button[type="submit"]')).toBeDisanabled()

       
     })
     test('Continiues with assertions part4', async ({page}) => {
      page.goto('https://the-internet.herokuapp.com/'); 
      await page.pause()

      //10.verify text store in variable
      const headerText = await page.locator('h1').textContent()
      expect(headerText).toBe('Welcome to the-internet')
    
   })

})

