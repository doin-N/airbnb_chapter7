const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const cors = require('cors');
const connectWithDb = require('./config/db');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

const app = express();

connectWithDb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SELECT],
    sameSite: 'none',
  }),
);
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use('/', require('./routes'));

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log('Error 발생 : ' + err);
  }
  console.log(`server가 ${process.env.PORT}번 포트에서 시작됐다`);
});
