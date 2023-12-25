import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { getUrlParams } from './util/urlFunc.js';

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.post('/api/login', jsonParser, (req, res) => {
  const {
    usernameType = 'username',
    username = '',
    password = '',
  } = req.body || {};
  fs.readFile(
    path.join('./', 'src', 'node', 'assert', 'data.txt'),
    'utf8',
    (err, data) => {
      if (err) throw err;
      
      const userData = getUrlParams(data);
      if (userData.username === username && userData.password === password) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  );
});

app.listen(3001, () => {
  console.log('listen start!');
});
