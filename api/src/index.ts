/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import authRoute from './routes/auth';
import userRoute from './routes/users';
import postRoute from './routes/posts';
import categoryRoute from './routes/categories';
import uploadRoute from './routes/upload';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.options('*', cors() as express.RequestHandler);

app.use('/images', express.static(path.join(__dirname, '../src/images')));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/upload', uploadRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((error: { message: string }) => console.log(error.message));
