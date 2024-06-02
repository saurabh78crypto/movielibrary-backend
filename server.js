import express from 'express';
import cors from 'cors';
import moment from 'moment';
import dotenv from 'dotenv';
import  Router  from './router/index.js';

dotenv.config();

import ('./db/conn.js');

const app = express();

const { PORT, CORS_ORIGIN, CORS_METHODS } = process.env;
const corsOptions = {  
    origin: CORS_ORIGIN || 'http://localhost:3000', 
    methods: CORS_METHODS || ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type']
};

app.use(express.json());

app.listen(PORT, () => {
    console.log(
        `Server is up and running on port ${PORT} on ${moment().format(
        "DD-MMM-YYYY-T-HH:mm:ss.S"
        )}`
    );
});

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use('/', Router);

export default { app }
