discovery.page.define("default", [
  'h1:"Regain"',
  'h2:"Stats"',
  {
    view: 'context',
    data: [
      {title: 'Files', query: '.files'},
      {title: 'require(\'fs\')', query: '.files.({file: .path, imports: ast.program.body.[type="VariableDeclaration"].declarations.init.[callee.name="require"].arguments.value}).[imports~=/fs/]'},
      {title: 'import \'react\'', query: '.files.({file: .path, imports: ast.program.body.[type="ImportDeclaration"].source.value}).[imports~=/react/]'},
      {title: 'all packages names', query: '.files.[path~=/package.json$/ and ast.private != true].({name: ast.name, path})'},
      // {title: 'Problems', query: 'dict.[no match or refs.resolved.[no match]]', href: '#problems'},
    ],
    content: {
      view: 'inline-list',
      item: 'indicator',
      data: `.({
        label: title,
        value: query.query(#.data, #).size(),
        href: href or pageLink('report', { query, title })
      })`,
    },
  },
  'h2:"List"',
  {
    view: "list",
    data: `
      .files
    `,
    item: [
      {
        view: "ul",
        item: ["text:path"]
      }
    ]
  }
]);
