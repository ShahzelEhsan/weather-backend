import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const API_KEY = process.env.OPENWEATHER_API_KEY;

// ✅ 7-Day Forecast by City
router.get('/forecast', async (req, res) => {
  const { city } = req.query;

  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Forecast error:', error.message);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

// ✅ Real-Time Alerts by Coordinates (US Only via weather.gov)
router.get('/alerts', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) return res.status(400).json({ error: 'lat/lon required' });

  try {
    const response = await axios.get(
      `https://api.weather.gov/alerts/active?point=${lat},${lon}`
    );
    const alerts = response.data.features.map((f) => ({
      id: f.id,
      event: f.properties.event,
      severity: f.properties.severity,
      areaDesc: f.properties.areaDesc,
      headline: f.properties.headline,
      description: f.properties.description,
    }));
    res.json(alerts);
  } catch (err) {
    console.error('Alerts error:', err.message);
    res.status(500).json({ error: 'Failed to fetch weather alerts' });
  }
});

export default router;
