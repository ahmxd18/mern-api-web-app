const WeatherCard = ({ weather }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {weather.cityName}
            </h2>
            <p className="text-gray-600">{weather.country}</p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
            className="w-16 h-16"
          />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-gray-800">
            {Math.round(weather.temperature)}°C
          </p>
          <p className="text-gray-600 capitalize">{weather.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-gray-600">Humidity</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-gray-600">Wind Speed</p>
            <p className="font-semibold">{weather.windSpeed} m/s</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Last updated: {new Date(weather.date).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
