'use strict';

const gitUrlParse = require('git-url-parse');
const { traverse } = require('./traverse');

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
        })
      };
    })
  };
}
