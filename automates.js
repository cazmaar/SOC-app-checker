const { chromium } = require('playwright');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csvtojson');
const fs = require('fs').promises;

const csvFilePath = 'kaz.csv';
const outputFilePath = 'output.json';
const outputCsvFilePath = 'result.csv';


const {video,avatar,scratch} = require('./allCategories');



async function convertCsvToJson() {
  const browser = await chromium.launch({ headless: true });
  
  try {
    const jsonObj = await csv().fromFile(csvFilePath);

    await fs.writeFile(outputFilePath, JSON.stringify(jsonObj));

    console.log(`Conversion completed successfully! Output written to ${outputFilePath}`);

    const jsonFileContent = await fs.readFile(outputFilePath, 'utf8');

    const jsonData = JSON.parse(jsonFileContent);

    const csvWriter = createCsvWriter({
      path: outputCsvFilePath,
      header: [
        { id: 'name', title: 'Name' },
        { id: 'time', title: 'PlayTime' },
        { id: 'duration', title: 'Duration' },
        { id: 'feedback', title: 'Feedback' },
        { id: 'avatar', title: 'Avatar' },
        { id: 'scratch', title: 'Scratch' },
      ],
    });

    for (const row of jsonData) {
      const [videoRes, avatarRes, scratchRes] = await Promise.all([
        video(row,browser),
        avatar(row,browser),
        scratch(row,browser),
      ]);

      const result = { ...videoRes, ...avatarRes, ...scratchRes };
      console.log(result);

      await csvWriter.writeRecords([result]);
    }
    
    console.log(`CSV file written to ${outputCsvFilePath}`);
    await browser.close()
  } catch (err) {
    console.error(err);
  }
}

convertCsvToJson();
