'use strict';

const globby = require('globby');
const path = require('path');

module.exports = {
  traverse
};

function traverse(paths, options) {
  const files = globby.sync(paths, {
    expandDirectories: {
      extensions: options.extensions
    },
    cwd: options.cwd
  });

  return files.map(filepath => {
    const file = {};

    file.name = path.basename(filepath);
    file.path = filepath;
    file.type = 'file';

    const { content, ast } = options.parseFile(file);
    file.content = content;
    file.ast = ast;

    return file;
  });
}
