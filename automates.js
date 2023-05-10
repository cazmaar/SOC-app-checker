// const csvFilePath = 'kaz.csv';
// const outputFilePath = 'output.json';
// const outputCsvFilePath = 'result.csv'

// const video = require('./video')
// const avatar = require('./avatar')
// const scratch = require('./scratch')

// const csv = require('csvtojson');
// const fs = require('fs').promises;
// const createCsvWriter = require('csv-writer').createObjectCsvWriter; 


// async function convertCsvToJson() {
//   try {
//     const jsonObj = await csv().fromFile(csvFilePath);

//     await fs.writeFile(outputFilePath, JSON.stringify(jsonObj));

//     console.log(`Conversion completed successfully! Output written to ${outputFilePath}`);

//     const jsonFileContent = await fs.readFile(outputFilePath, 'utf8');

//     const jsonData = JSON.parse(jsonFileContent);

//     const csvWriter = createCsvWriter({ 
//         path: outputCsvFilePath,
//         header: [
//           {id: 'name', title: 'Name'},
//           { id: 'time', title: 'PlayTime' },
//           { id: 'duration', title: 'Duration' },
//           { id: 'feedback', title: 'Feedback' },
//           {'id': 'avatar', title: "Avatar"},
//           {'id': 'scratch', title: "Scratch"}
//         ]
//       });

// const mappedData = jsonData.map(async (row) => {
// let videoRes = await video.video(row)
// let avatarRes = await avatar.avatar(row)
// let scratchRes = await scratch.scratch(row)

// return {...videoRes,...avatarRes, ...scratchRes}
// });

// const statusList = await Promise.all(mappedData);
// console.log(statusList) 

// await csvWriter.writeRecords(statusList);

// console.log(`CSV file written to `);
//   } catch (err) {
//     console.error(err);
//   }
// }

// convertCsvToJson();

const csvFilePath = 'kaz.csv';
const outputFilePath = 'output.json';
const outputCsvFilePath = 'result.csv'

const video = require('./video')
const avatar = require('./avatar')
const scratch = require('./scratch')

const csv = require('csvtojson');
const fs = require('fs').promises;
const createCsvWriter = require('csv-writer').createObjectCsvWriter; 

async function convertCsvToJson() {
  try {
    const jsonObj = await csv().fromFile(csvFilePath);

    await fs.writeFile(outputFilePath, JSON.stringify(jsonObj));

    console.log(`Conversion completed successfully! Output written to ${outputFilePath}`);

    const jsonFileContent = await fs.readFile(outputFilePath, 'utf8');

    const jsonData = JSON.parse(jsonFileContent);

    const csvWriter = createCsvWriter({ 
      path: outputCsvFilePath,
      header: [
        {id: 'name', title: 'Name'},
        { id: 'time', title: 'PlayTime' },
        { id: 'duration', title: 'Duration' },
        { id: 'feedback', title: 'Feedback' },
        {'id': 'avatar', title: "Avatar"},
        {'id': 'scratch', title: "Scratch"}
      ]
    });

    const mappedData = [];
    for (const row of jsonData) {
      const videoRes = await video.video(row);
      const avatarRes = await avatar.avatar(row);
      const scratchRes = await scratch.scratch(row);
      const result = { ...videoRes, ...avatarRes, ...scratchRes };
      console.log(result)

      mappedData.push(result);
    }

    await csvWriter.writeRecords(mappedData);

    console.log(`CSV file written to ${outputCsvFilePath}`);
  } catch (err) {
    console.error(err);
  }
}

convertCsvToJson();
