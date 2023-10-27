const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const db = require('./db.json');

const app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  const { query } = req;
  if (!query.service) {
    res.send('Need to specify a service');
    return;
  }

  const { service, ticket } = query;
  if (ticket) {
    const record = db.find((rec) => rec.ticket === ticket.trim());
    res.send({
      success: !!record,
      data: record ? {
        name: record.username,
        id: record.id,
        isManager: record.isManager,
      } : {},
    });
  } else {
    const { CASTGC } = req.cookies;
    const record = db.find((rec) => rec.CASTGC === CASTGC);
    if (record) {
      res.redirect(`${query.service}?ticket=${record.ticket}`);
    } else {
      res.render('login', { service });
    }
  }
});

app.post('/', (req, res) => {
  const { query, body } = req;
  if (!query.service) {
    res.send('Need to specify a service');
    return;
  }

  const record = db.find(
    (rec) => rec.casUsername === body.username && rec.password === body.password,
  );

  if (record) {
    res.cookie('CASTGC', record.CASTGC);
    res.redirect(`${query.service}?ticket=${record.ticket}`);
  } else {
    res.render('login', { service: query.service });
  }
});

app.listen(3010);
