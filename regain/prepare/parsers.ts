import * as parser from '@babel/parser';

export function parse(content, path) {
  if (/\.tsx?$/.test(path)) {
    return parseTypescript(content, path);
  } else if (/\.jsx?$/.test(path)) {
    return parseJavascript(content, path);
  } else if (/\.json$/.test(path)) {
    return parseJSON(content, path);
  }
}

function parseJSON(text, path) {
  return JSON.parse(text);
}

function parseTypescript(text, path) {
  return parser.parse(text, {
    // parse in strict mode and allow module declarations
    sourceType: 'module',
    plugins: [
      'estree',
      'flowComments',
      'typescript',
      'doExpressions',
      'objectRestSpread',
      'decorators-legacy',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
      'numericSeparator',
      'optionalChaining',
      'importMeta',
      'bigInt',
      'optionalCatchBinding',
      'throwExpressions',
      'nullishCoalescingOperator',
      'jsx'
    ]
  });
}

function parseJavascript(text, path) {
  return parser.parse(text, {
    // parse in strict mode and allow module declarations
    sourceType: 'module',
    plugins: [
      'estree',
      'flowComments',
      'flow',
      'doExpressions',
      'objectRestSpread',
      'decorators-legacy',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
      'numericSeparator',
      'optionalChaining',
      'importMeta',
      'bigInt',
      'optionalCatchBinding',
      'throwExpressions',
      'nullishCoalescingOperator',
      'jsx'
    ]
  });
}
