import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { getUrlParams } from './util/urlFunc.js';

const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

//登录接口
app.post('/api/login', jsonParser, (req, res) => {
  const { usernameType = '', username = '', password = '' } = req.body || {};
  fs.readFile(path.join('./', 'src', 'node', 'assert', 'data.txt'), 'utf8', (err, data) => {
    if (err) throw err;

    const userData = getUrlParams(data);
    if (usernameType === 'username' && userData.username === username && userData.password === password) {
      res.send({ isLogin: true, username: userData.username });
    } else {
      res.send({ isLogin: false });
    }
  });
});

//获取音乐card接口
app.get('/api/getSourceMusicMainData', (req, res) => {
  const data = {row: 5, col: 4, count: 20};
  data.imgData = [
    { id: '1', title: 'RJ01086057', url: '/api/getSourceImg?img=RJ01086057.webp' },
    { id: '2', title: 'RJ01087334', url: '/api/getSourceImg?img=RJ01087334.webp' },
    { id: '3', title: 'RJ01090895', url: '/api/getSourceImg?img=RJ01090895.webp' },
    { id: '4', title: 'RJ01091640', url: '/api/getSourceImg?img=RJ01091640.webp' },
    { id: '5', title: 'RJ01093183', url: '/api/getSourceImg?img=RJ01093183.webp' },
    { id: '6', title: 'RJ01094032', url: '/api/getSourceImg?img=RJ01094032.webp' },
    { id: '7', title: 'RJ01094643', url: '/api/getSourceImg?img=RJ01094643.webp' },
    { id: '8', title: 'RJ01094645', url: '/api/getSourceImg?img=RJ01094645.webp' },
    { id: '9', title: 'RJ01096421', url: '/api/getSourceImg?img=RJ01096421.webp' },
    { id: '10', title: 'RJ01096565', url: '/api/getSourceImg?img=RJ01096565.webp' },
    { id: '11', title: 'RJ01096571', url: '/api/getSourceImg?img=RJ01096571.webp' },
    { id: '12', title: 'RJ01097795', url: '/api/getSourceImg?img=RJ01097795.webp' },
    { id: '13', title: 'RJ01098831', url: '/api/getSourceImg?img=RJ01098831.jpg' },
    { id: '14', title: 'RJ01102568', url: '/api/getSourceImg?img=RJ01102568.webp' },
    { id: '15', title: 'RJ01102877', url: '/api/getSourceImg?img=RJ01102877.webp' },
    { id: '16', title: 'RJ01103601', url: '/api/getSourceImg?img=RJ01103601.jpg' },
    { id: '17', title: 'RJ01112869', url: '/api/getSourceImg?img=RJ01112869.webp' },
    { id: '18', title: 'RJ01121497', url: '/api/getSourceImg?img=RJ01121497.webp' },
    { id: '19', title: 'RJ01122125', url: '/api/getSourceImg?img=RJ01122125.webp' },
    { id: '20', title: 'RJ01123491', url: '/api/getSourceImg?img=RJ01123491.webp' },
  ];
console.log(222)
  res.send(data);
});

//获取音乐的cover图片接口
app.get('/api/getSourceImg', (req, res) => {
  console.log(1111)
  const img = req?.query?.img || "";
  const path = `./assert/image/${img}`;
  console.log(path)
  fs.readFile(path, (err, data) => {
    
    if (err) {
      console.log({path, err})
      throw err;
    } else {
      res.send(data);
    }
  })


});

app.listen(3001, () => {
  console.log('listen start!');
});
