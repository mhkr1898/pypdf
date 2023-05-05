// pdf_settings.js
import pdfkit from 'pdfkit';

pdfkit.prototype.set_title = function() {
  this.font('Times-BoldItalic')
      .fontSize(24)
      .text('Praksisreflektioner', { align: 'center' });
};

pdfkit.prototype.set_header = function(header) {
  this.font('Helvetica-Bold')
      .fontSize(12)
      .text(header, { align: 'left' });
};

pdfkit.prototype.set_body = function(body) {
  this.font('Courier')
      .fontSize(10)
      .text(body, { align: 'left' });
};
