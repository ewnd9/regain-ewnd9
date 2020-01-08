import { parse } from './parsers';
import { enhanceAst } from './ast';

discovery.setPrepare(async data => {
  const date = Date.now();

  if (localStorage['useCache']) {
    await enhanceAst(data);
  } else {
    for (const project of data.projects) {
      for (const file of project.files) {
        file.ast = await parse(file.content, file.path)
      }
    }
  }

  data.stats = {
    astBuild: Date.now() - date,
    // https://stackoverflow.com/a/12205668
    dataSize: encodeURI(JSON.stringify(data)).split(/%..|./).length - 1
  };

  data.stats.indexeddb = await new Promise((resolve, reject) => {
    navigator.webkitTemporaryStorage.queryUsageAndQuota(
      (used, remaining) => resolve({used, remaining}),
      reject
    );
  });

  discovery.addQueryHelpers({
    files: (current, regexp) => {
      if (regexp == null) {
        regexp = /./;
      }
      if (!(regexp instanceof RegExp)) {
        throw new Error('you mast pass regexp as argument');
      }
      return discovery
        .query('..children', current)
        .filter(file => file && file.path && file.path.match(regexp));
    },
    slice: (current, start, end) => current.slice(start, end),
    tsFiles: current =>
      discovery.query('..children.[extension=".ts"]', current),
    jsFiles: current =>
      discovery.query('..children.[extension=".js"]', current),
    jsonFiles: current =>
      discovery.query('..children.[extension=".json"]', current),
    decorators: current =>
      discovery.query(
        '$.program.body.declaration.decorators or $.decorators',
        current
      ),
    exports: current =>
      discovery.query(
        '$.program.body.[type="ExportNamedDeclaration"]',
        current
      ),
    variables: current =>
      discovery.query(
        '$.program.body.[type="ExportNamedDeclaration"].declaration.declarations',
        current
      ),
    classes: current =>
      discovery.query(
        '$.program.body.declaration.[type="ClassDeclaration"] or $.program.body.[type="ClassDeclaration"]',
        current
      ),
    implements: current => discovery.query('$.implements', current),
    name: current =>
      discovery.query(
        '$.id.name or $.key.name or $.expression.callee.name or $.expression.name or $.name',
        current
      ),
    properties: current =>
      discovery.query(
        '$.expression.arguments.properties or $.body.body.[type="ClassProperty"] or $.properties',
        current
      ),
    methods: current =>
      discovery.query(
        '$.body.body.[type="MethodDefinition"] or $.program.body.[type="FunctionDeclaration"]',
        current
      ),
    literalValue: current =>
      discovery.query('$.value.value or $.value.elements.value', current),
    first: current => discovery.query('$.pick(0)', current),
    second: current => discovery.query('$.pick(1)', current),
    last: current => discovery.query('$.pick($.size() - 1)', current),
    arguments: current =>
      discovery.query(
        '$.expression.arguments or $.params or ($.value.params.(parameter or $))',
        current
      )
  });
});
