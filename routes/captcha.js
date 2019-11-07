'use strict';

const router = require('express').Router();
const svgCaptcha = require('svg-captcha');
const fs = require('fs');
const gm = require('gm');
const cache = require('global-cache');
const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');


const auth = jwt({
  secret: jwksClient.expressJwtSecret({
      cache: true,       
      rateLimit: true,
      jwksRequestsPerMinute: 2,
      jwksUri: `${process.env.ISSUER}/.well-known/openid-configuration/jwks`
  }),
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ['RS256']
});

router.get('/:id', auth, (req, res) => {
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
router.post('/:id', auth, (req, res) => {
    if(cache.get(req.params.id) === req.body.captchaText){
        res.status(200).send(true);
    } else {
        res.status(400).send(false);
    }
});

module.exports = router;