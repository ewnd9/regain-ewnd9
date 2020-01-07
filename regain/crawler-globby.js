const globby = require('globby');
const parser = require('@babel/parser');
const fs = require('fs');
const path = require('path');

exports.default = async function main(paths, options) {
  const files = globby.sync(paths, {
    expandDirectories: {
      extensions: options.extensions
    }
  });

  return files.map(filepath => {
    const { content, ast } = parse(filepath);
    const file = {};

    file.name = path.basename(filepath);
    file.path = filepath;
    file.content = content
    file.ast = ast;
    file.type = 'file';

    return file;
  });
};

function parse(path) {
  const content = fs.readFileSync(path, 'utf-8');
  let ast;

  if (/\.tsx?$/.test(path)) {
    ast = parseTypescript(content, path);
  } else if (/\.jsx?$/.test(path)) {
    ast = parseJavascript(content, path);
  } else if (/\.json$/.test(path))  {
    ast = parseJSON(content, path);
  }

  return {content, ast};
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
