'use strict';

const express = require('express');
const svgCaptcha = require('svg-captcha');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
    var captcha = svgCaptcha.create();
    res.status(500).json(captcha);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);