import Weather from "../models/Weather.js"

export const getAllWeathers = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const skip = (page - 1) * limit
    const [data, total] = await Promise.all([
      Weather.find().sort({ date: -1 }).skip(skip).limit(limit).lean(),
      Weather.countDocuments(),
    ])
    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
    }
    // const weatherData = await Weather.find().sort({ date: -1 }).limit(10)
    // return weatherData
  } catch (error) {
    throw new Error(error.message || "Error fetching weather data")
  }
}

export const getWeather = async (cityName) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    if (data.cod === 200) {
      const weatherData = new Weather({
        cityName: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      })
      await weatherData.save()
      return data
    } else {
      const msg =
        data?.message || `OpenWeather API error (status ${response.status})`
      throw new Error(msg)
    }
  } catch (error) {
    throw new Error(error.message || "Failed to fetch/save weather")
  }
}
