import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import router from './routes/Routes';

const app = express();
dotenv.config();

const Port = process.env.APP_PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({
        message: 'Hello World!'
    })
})

app.use(router);

app.listen(Port, () => {
    console.log(['Info'], `${process.env.APP_NAME}`, `Server started on port ${Port}`);
});