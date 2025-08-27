import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import { getWeather, getAllWeathers } from "./controller/weatherController.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.post("/getWeather", async (req, res) => {
  const cityName = (req.body.cityName || "").trim()
  if (!cityName)
    return res.status(400).json({ error: { message: "cityName is required" } })
  try {
    const cityWeather = await getWeather(cityName)
    return res.json(cityWeather)
  } catch (error) {
    console.error("Error in /getWeather:", err)
    return res
      .status(500)
      .json({ error: { message: err.message || "Failed to fetch weather" } })
  }
})

app.get("/weather", async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1)
  const limit = Math.max(1, parseInt(req.query.limit) || 10)
  try {
    const paginatedResult = await getAllWeathers({ page, limit })
    return res.json(paginatedResult)
  } catch (error) {
    console.error("Error in /weather:", error)
    res.status(500).json({
      error: { message: error.message || "Failed to fetch weather data" },
    })
  }
})

const start = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`)
    })
  } catch (err) {
    console.error("Failed to start server:", err)
    process.exit(1)
  }
}

start()
