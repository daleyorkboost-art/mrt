const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const targets = ['server.js', 'src', 'scripts'].map((entry) => path.join(root, entry));

function collectJsFiles(entry) {
  const stat = fs.statSync(entry);

  if (stat.isFile()) {
    return entry.endsWith('.js') || entry.endsWith('.cjs') ? [entry] : [];
  }

  return fs.readdirSync(entry, { withFileTypes: true }).flatMap((item) => collectJsFiles(path.join(entry, item.name)));
}

const files = targets.flatMap(collectJsFiles);

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) {
    process.exit(result.status);
  }
}

console.log(`Syntax check passed for ${files.length} JavaScript files`);
