'use strict';

const globby = require('globby');
const fs = require('fs');
const path = require('path');
const lockfile = require('@yarnpkg/lockfile');

module.exports = {
  traverse
};

function traverse(paths, options) {
  const files = globby.sync(paths, {
    expandDirectories: {
      extensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'lock']
    },
    cwd: options.cwd
  });

  return files.map(filepath => {
    const file = {};

    file.name = path.basename(filepath);
    file.path = filepath;
    file.type = 'file';

    const content = fs.readFileSync(
      path.resolve(options.cwd, filepath),
      'utf-8'
    );

    // `@yarnpkg/lockfile` runs badly in browser
    if (file.name === 'yarn.lock') {
      file.content = '';
      file.ast = lockfile.parse(content).object;
    } else {
      file.content = content;
    }

    return file;
  });
}
