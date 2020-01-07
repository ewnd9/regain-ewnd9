const globby = require('globby');
const fs = require('fs');
const path = require('path');

// const {parse} = require('./parsers');

exports.default = async function main(paths, options) {
  const files = globby.sync(paths, {
    expandDirectories: {
      extensions: options.extensions
    }
  });

  return files.map(filepath => {
    const file = {};

    file.name = path.basename(filepath);
    file.path = filepath;
    file.content = fs.readFileSync(filepath, 'utf-8');
    // file.ast = parse(file.content, filepath);
    file.type = 'file';

    return file;
  });
};


