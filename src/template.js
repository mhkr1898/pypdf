import pdfkit from 'pdfkit';
import fs from 'fs';
const doc = new pdfkit();
const filePath = '../public/index.pdf';
doc.pipe(fs.createWriteStream(filePath));
doc.moveTo(0, 20)
   .lineTo(100, 160)
   .quadraticCurveTo(130, 200, 150, 120)
   .bezierCurveTo(190, -40, 200, 200, 300, 150)
   .lineTo(51, 90)
   .stroke(21341234);

const imagePath = '../public/img/tree.jpg';
const image = doc.openImage(imagePath);
doc.image(image, {
   fit: [250, 300],  // set image size
   align: 'center',  // center the image horizontally
 });
 
doc.end();