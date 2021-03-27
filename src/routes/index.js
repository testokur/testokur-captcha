import express from 'express';
import healthRoute from './health';
import captchaRoute from './captcha';

const router = express.Router();

router.use('/', healthRoute);
router.use('/hc', healthRoute);
router.use('/captcha', captchaRoute);

export default router;