const video = async (row,browser)=>{
const page = await browser.newPage();

try {
    await page.goto(row.video)
    }
    catch(e){
    const data = {}
    data.feedback = "Video Link is broken"
    data.name = row.name;
    await page.close()
    return data
    }

    try{
        const button = page.getByText(/Accept all/).nth(1)
        await button.click()
    }
    catch(e){
        if(e.name === "TimeoutError"){
            const data = {}
            data.feedback = "Video Link is broken"
            data.name = row.name
    await page.close()
            return data
        }
        else{
    const data = {}
    data.feedback = "Video Link is broken" 
    data.name = row.name
    await page.close()
    return data
        }
    }

    try{
        await page.waitForSelector('.video-stream', {timeout:10000})
    }
    catch(e){
        if (e.name === "TimeoutError") {
            const data = {}
            data.feedback = "Video not playing"
            data.name = row.name
    await page.close()
            return data
          } else {
            const data ={}
            data.feedback = "Video not playing"
            data.name = row.name
    await page.close()

            return data
          }
    }
    await page.waitForTimeout(10000);
    
    const status = await page.evaluate(async () => {
        const video = document.querySelector('video');
        const data = {time:video.currentTime, duration:video.duration, feedback:""}

    if(video.currentTime <2 ){
        data.feedback = "Video is not working";
    }
    else if(video.duration <=120){
        data.feedback = "video is too short"
    }
    else if(video.duration >280){
        data.feedback = "video is too long"
    }
    else{
        data.feedback = "Perfect video dude"
    }
    return data
  }); 

  page.close()

status.name = row.name

return status

}

const scratch = async (row,browser)=>{
  const page = await browser.newPage();

try {
    await page.goto(row.scratch)
    }
catch(e){
  const data = {}
  data.scratch = "Scratch Link is broken"
    page.close()
  return data
    }

try{
const header =  page.locator(".green-flag_green-flag_1kiAo")
await header.click()
}
catch(e){
  const data = {}
  data.scratch = "Scratch Link is broken"
  page.close()
  return data
}

await page.waitForTimeout(10000);

try {
    const header = await page.waitForSelector(".monitor-list_monitor-list_20k-y", { timeout: 3000 });
    const data = {}
    data.scratch = "Scratch Game works"
    page.close()
    return data
  } catch (e) {
    if (e.name === "TimeoutError") {
      const data = {}
      data.scratch = "Scratch games doesn't work"
      page.close()
      return data
    } else {
      const data = {}
      data.scratch = "Scratch games doesn't work"
      page.close()
      return data
    }
  }

}

const avatar = async (row,browser) => {
const page = await browser.newPage();
const data = {}
try {
    await page.goto(row.avatar)
    }
    catch(e){
      const data = {}
      data.avatar = "avatar Link is broken"
      page.close()
      return data
    }

try {
    const header = await page.waitForSelector(".App", { timeout: 3000 });
    const headerText = await header.textContent();
    data.avatar = "avatar exist"
    page.close()
  } catch (e) {
    if (e.name === "TimeoutError") {
      const data = {}
      data.avatar = "avatar not found"
      page.close()
      return data
    } else {
      const data = {}
      data.avatar = "avatar not found"
      page.close()
      return data
    }
  }

  return data

}

module.exports= {
  scratch,
  video,
  avatar
}