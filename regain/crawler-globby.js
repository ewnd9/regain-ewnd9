const globby = require('globby');
const fs = require('fs');
const path = require('path');

// const {parse} = require('./parsers');

module.exports = {
  crawl,
};

function crawl(paths, options) {
  const files = globby.sync(paths, {
    expandDirectories: {
      extensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'lock'],
    },
    cwd: options.cwd,
  });

  return files.map(filepath => {
    const file = {};

    file.name = path.basename(filepath);
    file.path = filepath;
    file.content = fs.readFileSync(path.resolve(options.cwd, filepath), 'utf-8');
    // file.ast = parse(file.content, filepath);
    file.type = 'file';

    return file;
  });
}


