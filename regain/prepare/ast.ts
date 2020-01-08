import stringHash from '@sindresorhus/string-hash';
import { init as initCache, get as getCache, put as putCache } from './cache';
import { parse } from './parsers';

export async function enhanceAst(data) {
  await initCache();

  const cacheKey = 'all-ast';
  const parserVersion = '1';
  const cache = (await getCache(cacheKey)) || {};
  const nextCache = {};
  let miss = 0;

  for (const project of data.projects) {
    for (const file of project.files) {
      const fileKey = `${file.path}:${parserVersion}:${stringHash(file.content)}`;

      let cacheAst = cache[fileKey];

      if (!cacheAst) {
        miss++;
        cacheAst = {};

        try {
          cacheAst.ast = await parse(file.content, file.path);
        } catch (error) {
          cacheAst.error = error;
          console.error(`file ${file.path} Babel.parse problem: ${error.message}`);
        }
      }

      nextCache[fileKey] = cacheAst;
      file.ast = cacheAst.ast;
      file.error = cacheAst.error;
    }
  }

  if (miss > 0) {
    putCache(cacheKey, nextCache).catch(err => console.error('putCache', err));
  }
}
