import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import WeatherCard from "./WeatherCard"
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const DashBoard = () => {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(6)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `${API_BASE_URL}/weather?page=${page}&limit=${limit}`
        )
        // const response = await axios.get(
        //   `http://localhost:5000/weather?page=${page}&limit=${limit}`
        // )
        const payload = response.data
        setWeatherData(payload.data || [])
        setTotalPages(payload.totalPages || 1)
        // setWeatherData(response.data)
      } catch (error) {
        console.error("Error fetching weather data:", err)
        setError("Failed to load dashboard data.")
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [page, limit])

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Weather Dashboard
        </h1>

        {error && (
          <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherData.map((weather, index) => (
            <WeatherCard key={index} weather={weather} />
          ))}
        </div>
        {weatherData.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No weather data available. Search for a city first!
          </div>
        )}
        {/* Pagination Control */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <div>
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-10 right-10 px-4 py-2 bg-amber-400 rounded-xl cursor-pointer shadow-lg font-semibold "
      >
        Go to Search
      </button>
    </div>
  )
}

export default DashBoard
