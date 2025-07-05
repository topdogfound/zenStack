import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from '../routes/api';
import { connectDB } from '../config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apiRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
