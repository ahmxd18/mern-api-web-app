import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchWeather from "./components/SearchWeather"
import DashBoard from "./components/DashBoard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchWeather />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
