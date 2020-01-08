import stringHash from '@sindresorhus/string-hash';
import { init as initCache, get as getCache, put as putCache } from './cache';
import { parse } from './parsers';

export async function enhanceAst(data) {
  await initCache();

  const cacheKey = 'all-ast';
  const cache = (await getCache(cacheKey)) || {};
  const nextCache = {};

  for (const project of data.projects) {
    for (const file of project.files) {
      const fileKey = `${file.path}:${stringHash(file.content)}`;

      let cacheAst = cache[fileKey];
      if (!cacheAst) {
        cacheAst = await parse(file.content, file.path);
      }

      file.ast = nextCache[fileKey] = cacheAst;
    }
  }

  putCache(cacheKey, nextCache).catch(err => console.error('putCache', err));
}
