import express from 'express';
import cors from 'cors';
import createCardRoute from './api/create-card';
import queryCardRoute from './api/query-cards';
import deleteDBRoute from './api/deleteDB';
import bodyParser from 'body-parser';
const app = express()

// init middleware
app.use(cors());
app.use(bodyParser.json());
// define routes
app.use('/api/create-card', createCardRoute);
app.use('/api/query-cards' , queryCardRoute);
app.use('/api/clear-db', deleteDBRoute);

export default app;