import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import roleRouter from './routes/roleRoutes';
import userRouter from './routes/userRoutes';

const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config();

const Port = process.env.APP_PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({
        message: 'Hello World!'
    })
})

app.use('/roles', roleRouter);
app.use('/users', userRouter);

app.listen(Port, () => {
    console.log(['Info'], `${process.env.APP_NAME}`, `Server started on port ${Port}`);
});