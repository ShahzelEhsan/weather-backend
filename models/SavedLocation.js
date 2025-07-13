import mongoose from 'mongoose';

const SavedLocationSchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Prevent model overwrite on hot reloads in dev
export default mongoose.models.SavedLocation || mongoose.model('SavedLocation', SavedLocationSchema);
