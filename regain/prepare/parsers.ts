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
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error(`file ${path} have a problem: ${e.message}`);
  }
}

function parseTypescript(text, path) {
  try {
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
  } catch (e) {
    console.error(`file ${path} Babel.parse problem: ${e.message}`);
  }
}

function parseJavascript(text, path) {
  try {
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
  } catch (e) {
    console.error(`file ${path} Babel.parse problem: ${e.message}`);
  }
}
