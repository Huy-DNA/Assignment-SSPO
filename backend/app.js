import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import LoginPlugin from './plugins/login.js';
import LogoutPlugin from './plugins/logout.js';

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

app.use(LoginPlugin);
app.use(LogoutPlugin);

// Delegate routing to the frontend
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.render('index');
});

export default app;
