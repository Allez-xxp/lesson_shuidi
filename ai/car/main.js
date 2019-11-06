const fs = require('fs');
const image = fs.readFileSync('./2.jpg').toString("base64");

const AipOcrClient = require('baidu-aip-sdk').ocr;
const client = new AipOcrClient('17712425','xF9kWVVm9GZMoSFEdwo603G5','BaEBeREdWozdOvBfkpS3HN8rcVXAVGrU');
const options = {};
options["multi_detect"] = "true";
client.licensePlate(image,options)
.then(function(result){
    console.log(result);

})