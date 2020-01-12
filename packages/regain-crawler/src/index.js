'use strict';

const globby = require('globby');
const path = require('path');
const gitUrlParse = require('git-url-parse');

module.exports = {
  traverse
};

function traverse({ projects, cwd, parseFile, extensions }) {
  return {
    projects: projects.map(project => {
      const { resource, owner, name } = gitUrlParse(project.httpsUrl);
      const full_name = `${resource}/${owner}/${name}`;

      return {
        ...project,
        full_name,
        files: traverseProject(`./${full_name}`, {
          cwd,
          extensions,
          parseFile
        })
      };
    })
  };
}

function traverseProject(paths, options) {
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
