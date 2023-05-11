const { chromium } = require('playwright');


const scratch = async (row)=>{
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

try {
    await page.goto(row.scratch)
    }
catch(e){
  const data = {}
  data.scratch = "Scratch Link is broken"
  return data
    }

try{
const header =  page.locator(".green-flag_green-flag_1kiAo")
await header.click()
}
catch(e){
  const data = {}
  data.scratch = "Scratch Link is broken"
  return data
}

await page.waitForTimeout(10000);

try {
    const header = await page.waitForSelector(".monitor-list_monitor-list_20k-y", { timeout: 3000 });
    const data = {}
    data.scratch = "Scratch Game works"
    return data
  } catch (e) {
    if (e.name === "TimeoutError") {
      const data = {}
      data.scratch = "Scratch games doesn't work"
      return data
    } else {
      const data = {}
      data.scratch = "Scratch games doesn't work"
      return data
    }
  }

await browser.close();

}

module.exports= {
  scratch
}
