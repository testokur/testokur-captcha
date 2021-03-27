'use strict';

const router = require('express').Router();
const svgCaptcha = require('svg-captcha');
const fs = require('fs');
const gm = require('gm');
const cache = require('global-cache');

router.get('/:id', (req, res) => {
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
        cache.set(req.params.id, captcha.text);
        res.type('png').end(buffer);
      });
});
router.post('/:id', (req, res) => {
    console.log(req.body);
    if(cache.get(req.params.id) === req.body.captchaText && req.body.captchaText !== undefined){
        res.status(200).send(true);
    } else {
        res.status(400).send(false);
    }
    console.log(res);
});

module.exports = router;