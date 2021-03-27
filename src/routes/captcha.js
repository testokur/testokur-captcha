import express from 'express';
import svgCaptcha from 'svg-captcha';
import fs from 'fs';
import gm from 'gm';
import cache from 'global-cache';
import logger from '../utils/logger';

const router = express.Router();

router.get('/:id', (req, res) => {
    const captcha = svgCaptcha.create({
        width:100,
        height:50,
        noise:0
    });
    fs.writeFileSync('./Images/'+ captcha.text + '.svg',captcha.data);
    gm('./Images/'+ captcha.text + '.svg')
      .out('-background', 'none')
      .toBuffer('png',function (err, buffer) {
        if (err){
          logger.error(err);
        }
        cache.set(req.params.id, captcha.text);
        res.type('png').end(buffer);
        logger.info(`Captcha image created for id=${req.params.id} text=${captcha.text}`);
      });
});

router.post('/:id', (req, res) => {
    logger.info(req.body);
    if(cache.get(req.params.id) === req.body.captchaText && req.body.captchaText !== undefined){
        res.status(200).send(true);
    } else {
        res.status(400).send(false);
    }
    logger.info(res);
});

export default router;