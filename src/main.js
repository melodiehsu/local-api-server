import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('err', err => console.log(err));
db.once('open' , () => console.log('connected to database'));

const app = express();

// middleware
app.use(json());

app.use(`${process.env.MOUNT_PATH}`, router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});