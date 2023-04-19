const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/aroundb' } = process.env;
const error = require('./middleware/error');
const { requestLog, errorLog } = require('./middleware/logger');
const limiter = require('./middleware/limiter');
require('dotenv').config({ path: './.env' });

app.use(cors());
app.options('*', cors());

app.use(helmet());
app.use(requestLog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(router);

app.use(errorLog);
app.use(errors());
app.use(error);

mongoose.connect(MONGO_URL);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
