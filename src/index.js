import pdfkit from 'pdfkit';
import fs from 'fs';
const doc = new pdfkit();
import './settings.js';
const filePath = '../public/index.pdf';
doc.pipe(fs.createWriteStream(filePath));
doc.set_header('status')
doc.moveTo(0, 20)
   .lineTo(1, 160)
   .quadraticCurveTo(1, 200, 150, 120)
   .bezierCurveTo(1, -40, 200, 200, 300, 150)
   .lineTo(1, 90)
   .stroke(12);

const imagePath = '../public/img/tree.jpg';
const image = doc.openImage(imagePath);
doc.image(image, {
   fit: [250, 300],  // set image size
   align: 'center',  // center the image horizontally
 });
 
doc.end();