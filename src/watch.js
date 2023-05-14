import chokidar from 'chokidar';
import child_process from 'child_process';
const { exec } = child_process;
const filesToWatch = ['./**/*.js'];
const watcher = chokidar.watch(filesToWatch, { ignored: /(^|[\/\\])\../ });

let timer = null;
const delay = 500;

function debounce(callback) {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(callback, delay);
}

watcher.on('change', (path) => {
  debounce(() => {
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
});