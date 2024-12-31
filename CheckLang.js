// const DetectLanguage = require('detectlanguage');

// const detectLanguageClient = new DetectLanguage({
//   key: '6a4bd020450b8e46e664ffa663234091', // Replace with your actual API key
//   ssl: true,
// });

// detectLanguageClient.detect('Hello world')
//   .then(result => {
//     console.log('Detected language:', result);
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   });


var DetectLanguage = require('detectlanguage');

// Initialize with your API key
var detectlanguage = new DetectLanguage('6a4bd020450b8e46e664ffa663234091');
var text = "మామ";

detectlanguage.detect(text).then(function(result) {
  console.log(JSON.stringify(result, null, 2));
}).catch(function(error) {
  console.error("Error detecting language:", error.message);
});

