discovery.page.define('default', [
  'h1:"regain-ewnd9"',
  'h2:"Stats"',
  {
    view: 'context',
    data: [
      {
        title: 'Files',
        query: '.files',
        view: JSON.stringify({
          view: 'ul',
          item: ['link:{ href: "#file:" + path, text: path }']
        })
      },
      {
        title: "require('fs')",
        query:
          '.files.({path: .path, imports: ast.program.body.[type="VariableDeclaration"].declarations.init.[callee.name="require"].arguments.value}).[imports~=/fs/]',
        view: JSON.stringify({
          view: 'ul',
          item: ['link:{ href: "#file:" + path, text: path }']
        })
      },
      {
        title: "import 'react'",
        query:
          '.files.({path: .path, imports: ast.program.body.[type="ImportDeclaration"].source.value}).[imports~=/react/]',
        view: JSON.stringify({
          view: 'ul',
          item: ['link:{ href: "#file:" + path, text: path }']
        })
      },
      {
        title: 'all packages names',
        query:
          '.files.[path~=/package.json$/ and ast.private != true].({name: ast.name, path})',
        view: JSON.stringify({
          view: 'ul',
          item: ['link:{ href: "#file:" + path, text: name + " (" + path + ")" }']
        })
      }
      // {title: 'Problems', query: 'dict.[no match or refs.resolved.[no match]]', href: '#problems'},
    ],
    content: {
      view: 'inline-list',
      item: 'indicator',
      data: `.({
        label: title,
        value: query.query(#.data, #).size(),
        href: href or pageLink('report', { query, title, view })
      })`
    }
  },
  'h2:"List"',
  {
    view: 'list',
    data: `
      .files
    `,
    item: [
      {
        view: 'ul',
        item: ['link:{ href: "#file:" + path, text: path }']
      }
    ]
  }
]);
