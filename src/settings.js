import pdfkit from 'pdfkit'; 

pdfkit.prototype.set_title = function(title) {
  this.font('Times-BoldItalic')
      .fontSize(22)
      .text(title, { align: 'center' });
  this.moveDown()
};

pdfkit.prototype.set_header = function(header) {
  this.font('Helvetica-Bold')
      .fontSize(15)
      .text(header, { align: 'left' });
};

pdfkit.prototype.set_body = function(body) {
  this.font('Courier')
      .fontSize(10)
      .text(body, { align: 'left' });
};


pdfkit.prototype.set_img = function(imagePath, imageScale = 0.75, title) {
  this.fontSize(25).text(title, {align: 'center'});
  const pageWidth = this.page.width - this.page.margins.left - this.page.margins.right;
  // Open image to get properties
  const image = this.openImage(imagePath);
  // Calculate the available horizontal space on the page
  // Scale the image to ARG (default 75%) of its original size
  const imageWidth = image.width * imageScale; 
  const availableWidth = pageWidth - imageWidth;
  // Calculate the horizontal position of the image
  const horizontalPosition = this.page.margins.left + availableWidth / 2;
  // Add the image to the PDF document
  this.image(imagePath, horizontalPosition, this.y, {width: imageWidth});
}; 

