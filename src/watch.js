import chokidar from 'chokidar';
import child_process from 'child_process';
const { exec } = child_process;

const fileToWatch = 'template.js';

chokidar.watch(fileToWatch).on('change', () => {
  console.log(`Changes detected in ${fileToWatch}, generating PDF...`);
  try {
    const child = exec('node template.js', (err, stdout, stderr) => {
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