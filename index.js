import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import locationRoutes from './routes/locations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);

app.get('/', (req, res) => {
  res.send('Weather Dashboard API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
