'use strict';

module.exports = {
  name: 'regain-ewnd9',
  data: () => {
    const path = require('path');
    const { crawl } = require('regain-crawler-frontend');
    const manifest = require('./.sync-repos.json');
    const projects = manifest.projects.filter(project => !project.fork);

    return crawl({
      projects,
      cwd: path.resolve(process.cwd(), manifest.output)
    });
  },
  cache: false,
  //cache: __dirname + "/regain/.cache",
  prepare: `${__dirname}/dist/regain-prepare/src/index.js`,
  view: {
    basedir: __dirname,
    assets: [`${__dirname}/dist/regain-ui/src/index.js`]
  }
};
