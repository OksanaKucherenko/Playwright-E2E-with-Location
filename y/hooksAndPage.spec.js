import { test, expect, chromium } from '@playwright/test';
import { chronium } from 'playwright';
import { permission } from 'process';

//browse
let browser;
let context;
let page;

test.describe('describe block for Hooks', () => {

    test.beforeAll(async () => {
        //launch chrome browser
        browser = await chromium.launch({headless: false})
        console.log('BEFOR ALL HOOK LAUNCH CROMIUM BROWSER ')
    })
    
    test.beforeEach(async () => {
        //create context
        context = await browser.newContext()
        //create new page
        page = await context.newPage(),
            //navigate to URL
            await page.goto('https://the-internet.herokuapp.com/');
        //pause execution
        console.log('BEFOR EACH LAUNCH NEW PAGE')
    
    })
    
    test.afterEach(async () => {
        //close page
    
        await page.close()
        await context.close()
        console.log("AFTER EACH HOOK CLOSED PAGE")
    
    })
    test.afterAll(async () => {
        //closer browser
        await browser.close()
        console.log("AFTER ALL HOOK CLOSED BROWSER")
    })
    test('A/B Test', async () => {
        await page.click('text="A/B Testing"')
        const header = await page.textContent('h3')
        expect(header).toBe('A/B Test Control')
    })
    test('CheckBox verification', async () => {
        await page.click('text="Checkboxes"')
        const checkbox = await page.isChecked('input[type="checkbox"]:first-child')
        expect(checkbox).toBe(false)

    })
    test('Geolocation setting in context and verification', async () => {
        context = await browser.newContext({
            permission: ['geolocation'],
            geolocation: { latitude: 51.507351, longitude: -0.127758 },
            viewport: { width: 1280, height: 720 }
        })
        page = await context.newPage()
        console.log('USING CONTEXT AND PAGE CREATE WITHIN TEST AND NOT WITHIN HOOKS')
        await page.pause()
        await page.goto('https://the-internet.herokuapp.com/geolocation');
        await page.click('button')
        await page.pause()
        const lat = await page.textContent("#lat-value")
        const long = await page.textContent("#long-value")
        expect(parseFloat(lat)).toBeCloseTo(51.507351)
        expect(parseFloat(long)).toBeCloseTo(-0.127758)
        await page.pause()

    })


})