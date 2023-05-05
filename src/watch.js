import chokidar from 'chokidar';
import child_process from 'child_process';
const { exec } = child_process;

const filesToWatch = ['./**/*.js'];
const watcher = chokidar.watch(filesToWatch, { ignored: /(^|[\/\\])\../ });

watcher.on('change', (path) => {
  console.log(`Changes detected in ${path}, generating PDF...`);
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
