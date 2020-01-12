'use strict';

const fs = require('fs');
const path = require('path');
const gitUrlParse = require('git-url-parse');
const lockfile = require('@yarnpkg/lockfile');

const { traverse } = require('regain-crawler');

module.exports = {
  crawl
};

function crawl({ projects, cwd }) {
  return {
    projects: projects.map(project => {
      const { resource, owner, name } = gitUrlParse(project.httpsUrl);
      const full_name = `${resource}/${owner}/${name}`;

      return {
        ...project,
        full_name,
        files: traverse(`./${full_name}`, {
          cwd,
          extensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'lock'],
          parseFile
        })
      };
    })
  };

  function parseFile(file) {
    const content = fs.readFileSync(
      path.resolve(cwd, file.path),
      'utf-8'
    );

    // `@yarnpkg/lockfile` runs badly in browser
    if (file.name === 'yarn.lock') {
      return {
        content: '',
        ast: lockfile.parse(content).object,
      };
    } else {
      return {
        content,
      };
    }
  }
}
