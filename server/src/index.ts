import { listenToAllEvents } from './controllers/listenToAllEvents';
import { Request, Response } from 'express';
import connectDB from './config/dataBase';
import eventRoutes from './routes/event';
import { config } from 'dotenv';
import express from 'express';
const PORT = process.env.PORT || 8000;

config();

const app = express();
app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use('/events', eventRoutes);
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    message: '⚡️[Genios CLub server]: Server is running',
  });
});

listenToAllEvents();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
