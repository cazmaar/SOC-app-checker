const { chromium } = require('playwright');


const video = async (row)=>{
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
    await page.goto(row.video)
    }
    catch(e){
    const data = {}
    data.feedback = "Video Link is broken"
    data.name = row.name;
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
            return data
        }
        else{
    const data = {}
    data.feedback = "Video Link is broken" 
    data.name = row.name
    return data
        }
    }

    try{
        await page.waitForSelector('.video-stream', {timeout:3000})
    }
    catch(e){
        if (e.name === "TimeoutError") {
            const data = {}
            data.feedback = "Video not playing"
            data.name = row.name
            return data
          } else {
            const data ={}
            data.feedback = "Video not playing"
            data.name = row.name
            return data
          }
    }
    await page.waitForTimeout(5000);
    
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

status.name = row.name

await browser.close();

return status

}

module.exports = {
    video
}