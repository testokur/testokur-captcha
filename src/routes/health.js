import express from 'express';
import {OK} from 'http-codes';
const router = express.Router();

router.get('/', (req,res) => {
  res.status(OK).send('Healthy!');
});

export default router;