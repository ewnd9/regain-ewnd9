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
  const ret = await db.get('favourite-number', key);
  return ret && JSON.parse(ret);
}

export async function put(key, value) {
  await db.put('favourite-number', JSON.stringify(value), key);
}

