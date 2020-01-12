const path = require('path');

module.exports = {
  name: 'regain-ewnd9',
  data: () => {
    const {crawl} = require('regain-crawler');
    const manifest = require('./manifest.json');
    const projects = manifest.projects.filter(project => !project.fork);

    return {
      projects: projects.map(project => {
        const { resource, owner, name } = require('git-url-parse')(
          project.httpsUrl
        );

        const full_name = `${resource}/${owner}/${name}`;

        return {
          ...project,
          full_name,
          files: crawl(
            `./${full_name}`,
            {
              cwd: path.resolve(process.cwd(), manifest.output),
            }
          )
        };
      })
    };
  },
  cache: false,
  //cache: __dirname + "/regain/.cache",
  prepare: `${__dirname}/dist/regain-prepare/src/index.js`,
  view: {
    basedir: __dirname,
    assets: [`${__dirname}/dist/regain-ui/src/index.js`]
  }
};
