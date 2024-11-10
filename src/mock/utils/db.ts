import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';
import { hash } from '../utils';

const models = {
  user: {
    id: primaryKey(nanoid),
    username: String,
    password: String,
  },
  product: {
    id: primaryKey(nanoid),
    name: String,
    description: String,
    price: Number,
    rating: Number,
    comments: Array,
    images: Array,
    arrivalDate: String,
  },
  comment: {
    id: primaryKey(nanoid),
    text: String,
    rating: Number,
    productId: String,
    username: String,
    createdAt: Date,
  },
};

export const db = factory(models);

export type Model = keyof typeof models;

const dbFilePath = 'mocked-db.json';

export const loadDb = async () => {
  // node env
  if (typeof window === 'undefined') {
    const { readFile, writeFile } = await import('fs/promises');
    try {
      const data = await readFile(dbFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        const emptyDB = {};
        await writeFile(dbFilePath, JSON.stringify(emptyDB, null, 2));
        return emptyDB;
      } else {
        console.error('Mocked DB yüklenirken hata olustu:', error);
        return null;
      }
    }
  }
  // browser env
  return Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'));
};

export const storeDb = async (data: string) => {
  // node env
  if (typeof window === 'undefined') {
    const { writeFile } = await import('fs/promises');
    await writeFile(dbFilePath, data);
  } else {
    // browser env
    window.localStorage.setItem('msw-db', data);
  }
};

export const persistDb = async (model: Model) => {
  if (process.env.NODE_ENV === 'test') return;
  const data = await loadDb();
  data[model] = db[model].getAll();
  await storeDb(JSON.stringify(data, null, 2));
};

export const initializeDb = async () => {
  await resetDb();

  db.user.create({
    id: '1',
    username: 'user',
    password: hash('user123'),
  });

  db.product.create({
    id: '1',
    name: 'Product 1',
    description: 'Product 1 Description',
    price: 100,
    rating: 4.5,
    comments: [],
    images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300/0000FF'],
    arrivalDate: '12.12.2024',
  });
  db.product.create({
    id: '2',
    name: 'Product 2',
    description: 'Product 2 Description',
    price: 200,
    rating: 4.0,
    comments: [],
    images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300/FF0000'],
    arrivalDate: '12.12.2024',
  });

  const dataToPersist = Object.keys(db).reduce(
    (acc, modelName) => {
      acc[modelName] = db[modelName as Model].getAll();
      return acc;
    },
    {} as Record<string, any[]>,
  );

  await storeDb(JSON.stringify(dataToPersist, null, 2));
};

export const resetDb = async () => {
  Object.values(db).forEach((model) => model.deleteMany({ where: {} }));
  await storeDb('{}');
};
