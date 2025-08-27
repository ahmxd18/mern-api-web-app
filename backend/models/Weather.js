import mongoose from "mongoose"

const weatherSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  country: String,
  temperature: Number,
  description: String,
  icon: String,
  humidity: Number,
  windSpeed: Number,
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("Weather", weatherSchema)
