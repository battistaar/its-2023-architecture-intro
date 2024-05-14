import 'reflect-metadata';

import app from './app';
import mongoose from 'mongoose';
const DB_URL = process.env['DB_URL'] || 'mongodb://127.0.0.1:27017/its_2023_cart';
const PORT = process.env['API_PORT'] || 3000;

mongoose.set('debug', true);
mongoose.connect(DB_URL)
  .then(_ => {
    console.log('Connected to db');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  })
