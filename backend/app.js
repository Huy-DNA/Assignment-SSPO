import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import process from 'process';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const app = express();

// view engine setup
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '../frontend')));

app.use('/login', async (req, res) => {
  const { ticket } = req.query;

  let userInfo;
  if (ticket) {
    userInfo = await fetch(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}&ticket=${ticket}`, {
      method: 'get',
    }).then((re) => re.blob())
      .then((blob) => blob.arrayBuffer())
      .then((buff) => (new TextDecoder('utf-8')).decode(buff))
      .then((text) => JSON.parse(text));
    if (!userInfo.success) {
      res.clearCookie('CASTGC');
      res.redirect(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}/login/`);
    } else {
      res.cookie('name', userInfo.data.name);
      res.cookie('isManager', userInfo.data.isManager);
      res.redirect('/');
    }
  }

  if (!ticket) {
    res.redirect(`http://${process.env.CAS_PATH}?service=http://${process.env.HOSTNAME}:${process.env.PORT}/login/`);
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('CASTGC');
  res.redirect('/');
});

// Delegate routing to the frontend
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.render('index');
});

export default app;
