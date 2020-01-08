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

        return {
          full_name: project.full_name,
          files: require('./regain/crawler-globby').default(
            `./repos/${resource}/${owner}/${name}`,
            {
              extensions: ['js', 'jsx', 'ts', 'tsx', 'json']
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
