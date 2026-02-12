import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import initMongoDB from './dbs/init.mongodb';
import { checkOverload } from './helpers/check-connect';
import router from './routes';

const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
initMongoDB;
checkOverload();

// init route
app.use('', router);

export default app;
