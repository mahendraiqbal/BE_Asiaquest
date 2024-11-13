import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { specs } from './src/utils/swagger';
import todoRouter from './src/routers/todoRouter';

dotenv.config();

const app: Express = express();
const logger = morgan(
    'method: :method url: :url status: :status res-body-length: :res[content-length] - response-time: :response-time ms'
);
const port = process.env.PORT || 8000;

const corsOption = {
    origin: '*',
    allowedHeaders: ['x-access-token', 'content-type'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use('/api/todos', todoRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/todos', todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});