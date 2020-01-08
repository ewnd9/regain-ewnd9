import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MyDB extends DBSchema {
  'favourite-number': {
    key: string;
    value: string;
  };
}

let db: IDBPDatabase<MyDB>;

export async function init() {
  if (db) {
    return;
  }

  db = await openDB<MyDB>('my-db', 1, {
    upgrade(db) {
      db.createObjectStore('favourite-number');
    },
  });
}

export async function get(key) {
  const dbGetDate = Date.now();
  const ret = await db.get('favourite-number', key);
  console.log(`db.get ${Date.now() - dbGetDate} ms`);

  const jsonParseDate = Date.now();
  const x = ret && JSON.parse(ret);
  console.log(`JSON.parse ${Date.now() - jsonParseDate} ms`);

  return x;
}

export async function put(key, value) {
  const dbPutDate = Date.now();
  await db.put('favourite-number', JSON.stringify(value), key);
  console.log(`db.put ${Date.now() - dbPutDate} ms`);
}

