var qr = require ("qr-image")
var fs = require("fs")

function qrGenerator(url){
 
        // var qr_svg = qr.image(url);
        // qr_svg.pipe(fs.createWriteStream('./barcode/qr_image.png'));


        // fs.writeFile("./barcode/URL.txt", url, (err) => {
        //     if (err) throw err;
        //     console.log("The file has been saved");
        //   });

        return new Promise((resolve, reject) => {
          const qr_svg = qr.image(url);
          const path = './barcode/qr_image.png';
          const writeStream = fs.createWriteStream(path);
      
          qr_svg.on('error', (error) => {
            reject(error);
          });
      
          qr_svg.pipe(writeStream);
      
          writeStream.on('finish', () => {
            resolve({ path, success: true });
          });
      
          writeStream.on('error', (error) => {
            reject(error);
          });
        });
}

module.exports = { qrGenerator }

/* 
1. Use the inquirer npm package to get user input.

2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
