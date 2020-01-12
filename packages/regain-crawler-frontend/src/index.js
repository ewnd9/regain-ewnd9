'use strict';

const fs = require('fs');
const path = require('path');
const lockfile = require('@yarnpkg/lockfile');
const { traverse } = require('regain-crawler');

module.exports = {
  crawl
};

function crawl({ projects, cwd }) {
  return traverse({
    projects,
    cwd,
    extensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'lock'],
    parseFile(file) {
      const content = fs.readFileSync(path.resolve(cwd, file.path), 'utf-8');

      // `@yarnpkg/lockfile` runs badly in browser
      if (file.name === 'yarn.lock') {
        return {
          content: '',
          ast: lockfile.parse(content).object
        };
      } else {
        return {
          content
        };
      }
    }
  });
}
