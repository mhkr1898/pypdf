/**
 * Watches for changes in template.js file and generates PDF on change
 */

import chokidar from 'chokidar';
import child_process from 'child_process';
const { exec } = child_process;

const fileToWatch = './src/index.js';
console.log(`Watching: ${fileToWatch}`);

chokidar.watch(['./src/index.js', './src/settings.js']).on('change', () => {
  console.log(`Changes detected in ${fileToWatch} or pdf_settings, generating PDF...`);
  try {
    const child = exec('node index.js', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${err}`);
      } else {
        console.log('PDF generation complete');
      }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

  } catch (err) {
    console.error(`Error: ${err}`);
  }
});
