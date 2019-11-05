const router = require('express').Router();
const svgCaptcha = require('svg-captcha');
const fs = require('fs');
const gm = require('gm');
const cache = require('memory-cache');

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
        cache.put(req.params.id, captcha.text);
        res.type('png').end(buffer);
      })
});
router.post('/:id', (req, res) => {
    if( cache.get(req.params.id) === req.body.captchaText){
        res.status(200);
    } else {
        res.status(400);
    }
});

module.exports = router;