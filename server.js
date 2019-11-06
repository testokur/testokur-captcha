'use strict';

import express from 'express';
import { json } from 'body-parser';

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(json());
app.use(require('./routes').default);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
