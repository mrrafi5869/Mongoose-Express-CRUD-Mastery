import express, { Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

export default app;
