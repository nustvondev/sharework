import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import KeyCode from './models/KeyCode.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data3.json', import.meta.url))
    );
    await KeyCode.create(jsonProducts);
    console.log('Migration keycode data scuccess!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
