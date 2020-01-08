const path = require('path');

module.exports = {
  name: 'regain-ewnd9',
  data: () => {
    const manifest = require('./manifest.json');
    const projects = manifest.projects.filter(project => !project.fork);

    return {
      projects: projects.map(project => {
        const { resource, owner, name } = require('git-url-parse')(
          project.clone_url
        );

        const full_name = `${resource}/${owner}/${name}`;

        return {
          full_name,
          files: require('./regain/crawler-globby').default(
            `./${full_name}`,
            {
              extensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
              cwd: path.resolve(process.cwd(), manifest.output),
            }
          )
        };
      })
    };
  },
  cache: false,
  //cache: __dirname + "/regain/.cache",
  prepare: `${__dirname}/dist/prepare/index.js`,
  view: {
    basedir: __dirname,
    assets: [`${__dirname}/dist/ui/index.js`]
  }
};
