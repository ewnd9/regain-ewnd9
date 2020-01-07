module.exports = {
  name: 'Regain',
  data: () => {
    const manifest = require('./manifest.json');
    const projects = manifest.projects.filter(project => !project.fork);

    return require('./regain/crawler-globby').default(
      projects
        .map(project => `./repos/github.com/${project.full_name}`),
      {
        extensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
      }
    );

    //   return require("./regain/crawler").default(path, {
    //       exclude: /(node_modules|tests|\.git)/,
    //       extensions: /\.(ts|js|json)$/
    //   });
  },
  cache: false,
  //cache: __dirname + "/regain/.cache",
  prepare: __dirname + '/regain/prepare.js',
  view: {
    basedir: __dirname,
    assets: [
      './regain/ui/page/default.js',
      './regain/ui/page/file.js',
      './regain/ui/sidebar.js'
    ]
  }
};
