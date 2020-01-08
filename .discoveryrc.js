module.exports = {
  name: 'regain-ewnd9',
  data: () => {
    const manifest = require('./manifest.json');
    const projects = manifest.projects.filter(project => !project.fork);

    return {
      files: require('./regain/crawler-globby').default(
        projects.map(project => `./repos/github.com/${project.full_name}`),
        {
          extensions: ['js', 'jsx', 'ts', 'tsx', 'json']
        }
      )
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
