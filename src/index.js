import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from './utils/logger';
import routes from './routes';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();


app.use(bodyParser.json());
app.use(helmet());
app.use(routes);

app.listen(PORT, HOST, () =>{
    logger.info(`Server started at http://${HOST}:${PORT}`);
});

export default app;