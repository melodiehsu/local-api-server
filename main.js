const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:secret@localhost:27017/collection?authSource=admin');
const db = mongoose.connection;

db.on('err',err => console.log(err));
db.once('open' , () => console.log('connected to database'));

const app = express();

// middleware
app.use(express.json());

const usersRouter = require("./routes/users.js");
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});