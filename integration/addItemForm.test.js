describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?args=&id=todolist-additemform--add-item-form-basic&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();

    })
})