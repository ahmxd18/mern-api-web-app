import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SearchWeather = () => {
  const [cityName, setCityName] = useState("")
  const [cityData, setCityData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!cityName) return
    setIsLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/getWeather", {
        cityName,
      })
      setCityData(response.data)
      setCityName("")
      setError("")
    } catch (error) {
      setError("City not found or server error")
      setCityData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="max-w-lg bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Weather App
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter City Name"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-2xl"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <button
              type="button"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 cursor-pointer"
              onClick={handleSubmit}
              disabled={isLoading || !cityName}
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {cityData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {cityData.name}, {cityData.sys?.country}
            </h2>
            <div className="text-center mt-2">
              <img
                src={`https://openweathermap.org/img/wn/${cityData.weather?.[0]?.icon}@2x.png`}
                alt="weather icon"
                className="mx-auto"
              />
              <p className="text-3xl font-bold text-gray-800">
                {Math.round(cityData.main?.temp)}°C
              </p>
              <p className="text-gray-600 capitalize">
                {cityData.weather?.[0]?.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-gray-600">Humidity</p>
                <p className="font-semibold">{cityData.main?.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Wind Speed</p>
                <p className="font-semibold">{cityData.wind?.speed} m/s</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full mt-6 px-4 py-2 bg-amber-400 rounded-lg font-semibold cursor-pointer hover:bg-amber-500 transition-colors"
        >
          View Dashboard
        </button>
      </div>
    </div>
  )
}

export default SearchWeather
