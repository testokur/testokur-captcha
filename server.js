'use strict';

const express = require('express');
const svgCaptcha = require('svg-captcha');
const fs = require('fs');
const gm = require('gm');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Healthy!')
});
app.get('/hc', (req, res) => {
  res.status(200).send('Healthy!')
});
app.get('/captcha', (req, res) => {
    var captcha = svgCaptcha.create({
        width:100,
        height:50,
        noise:0
    });
    fs.writeFileSync('./Images/'+ captcha.text + '.svg',captcha.data);
    gm('./Images/'+ captcha.text + '.svg')
      .out('-background', 'none')
      .toBuffer('png',function (err, buffer) {
        if (err){
          console.log(err);
        }
        res.header('Text', captcha.text).type('png').end(buffer);
      })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
