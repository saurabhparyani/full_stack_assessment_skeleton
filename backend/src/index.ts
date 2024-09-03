import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes';
import homeRoutes from './routes/homeRoutes';
import cors from 'cors';

dotenv.config()


const app: Express = express();
const port = process.env.PORT;

app.use(cors());


app.use('/user', userRoutes);
app.use('/home', homeRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})