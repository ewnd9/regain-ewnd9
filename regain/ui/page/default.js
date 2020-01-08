import prettyBytes from 'pretty-bytes';

discovery.page.define('default', [
  'h1:"regain-ewnd9"',
  'h2:"Stats"',
  {
    view: 'context',
    data: [
      {
        title: 'Projects',
        query: '.projects',
        view: JSON.stringify({
          view: 'ul',
          item: ['link:{ href: "#project:" + full_name, text: full_name }']
        })
      },
      {
        title: 'Files',
        query: '.projects.files',
        view: JSON.stringify({
          view: 'ul',
          item: ['link:{ href: "#file:" + path, text: path }']
        })
      },
      {
        title: "require('fs')",
        query:
          '.projects.files.({path: .path, imports: ast.program.body.[type="VariableDeclaration"].declarations.init.[callee.name="require"].arguments.value}).[imports~=/fs/]',
        view: JSON.stringify({
          view: 'ul',
          item: ['link:{ href: "#file:" + path, text: path }']
        })
      },
      {
        title: "import 'react'",
        query:
          '.projects.files.({path: .path, imports: ast.program.body.[type="ImportDeclaration"].source.value}).[imports~=/react/]',
        view: JSON.stringify({
          view: 'ul',
          item: ['link:{ href: "#file:" + path, text: path }']
        })
      },
      {
        title: 'all packages names',
        query:
          '.projects.files.[path~=/package.json$/ and ast.private != true].({name: ast.name, path})',
        view: JSON.stringify({
          view: 'ul',
          item: [
            'link:{ href: "#file:" + path, text: name + " (" + path + ")" }'
          ]
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
  'h2:"Build"',
  {
    view: 'context',
    data: data => [
      `AST build: ${data.stats.astBuild} ms`,
      `data size: ${prettyBytes(data.stats.dataSize)}`,
      `indexeddb used: ${prettyBytes(data.stats.indexeddb.used)}`,
      `indexeddb remaining: ${prettyBytes(data.stats.indexeddb.remaining)}`,
    ],
    content: {
      view: 'ul',
      item: 'text'
    }
  }
]);
