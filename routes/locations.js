import express from 'express';
import { connectDB } from '../lib/mongodb.js';
import SavedLocation from '../models/SavedLocation.js';

const router = express.Router();

// ✅ Create a saved location
router.post('/', async (req, res) => {
  await connectDB();

  const { userEmail, cityName, lat, lon } = req.body;

  if (!userEmail || !cityName || lat == null || lon == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const saved = await SavedLocation.create({ userEmail, cityName, lat, lon });
    res.status(201).json(saved);
  } catch (err) {
    console.error('Save error:', err.message);
    res.status(500).json({ error: 'Failed to save location' });
  }
});

// ✅ Get all saved locations by user email
router.get('/:userEmail', async (req, res) => {
  await connectDB();

  const { userEmail } = req.params;

  try {
    const locations = await SavedLocation.find({ userEmail }).sort({ createdAt: -1 });
    res.json(locations);
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// ✅ Delete a saved location by ID
router.delete('/:id', async (req, res) => {
  await connectDB();

  const { id } = req.params;

  try {
    const deleted = await SavedLocation.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(204).end();
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete location' });
  }
});

export default router;
