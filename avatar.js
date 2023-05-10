const { chromium } = require('playwright');


const avatar = async (row) => {
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const data = {}
try {
    await page.goto(row.avatar)
    }
    catch(e){
      const data = {}
      data.avatar = "avatar Link is broken"
      return data
    }

try {
    const header = await page.waitForSelector(".App", { timeout: 3000 });
    const headerText = await header.textContent();
    data.avatar = "avatar exist"
  } catch (e) {
    if (e.name === "TimeoutError") {
      const data = {}
      data.avatar = "avatar not found"
      return data
    } else {
      const data = {}
      data.avatar = "avatar not found"
      return data
    }
  }
  await browser.close()

  return data

}

module.exports = {
    avatar
}