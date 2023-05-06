import pdfkit from 'pdfkit';
import fs from 'fs';
const doc = new pdfkit();
import './settings.js';

// Define pdf endpoint 
const filePath = '../public/index.pdf';
doc.pipe(fs.createWriteStream(filePath));

// Meta data
doc.info['Title'] = 'Hello world!';
doc.info['Author'] = 'Your Name';
doc.info['Subject'] = 'Example PDF document';
doc.info['Keywords'] = 'pdfkit, example, test';
doc.info['CreationDate'] = new Date();
doc.info['ModDate'] = new Date();
//* PDF content 
doc.set_title('Hello world!')
doc.set_header('Lorem Ipsum')
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
console.log(doc.heightOfString(lorem))
doc.set_body(lorem)
doc.moveDown(3)
const bird = '../public/assets/img/bird.jpg';
doc.set_img(bird, 0.2, 'Centered Image Example');
doc.end();

// Cache busting code
//? Is this the correct approach to ensure correct iframe and re re-render?
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const indexHtmlPath = '../index.html';
fs.readFile(indexHtmlPath, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/<iframe src="public\/index.pdf"/g, `<iframe src="public/index.pdf?version=${timestamp}"`);
  fs.writeFile(indexHtmlPath, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});