import { Route, Routes } from "react-router"
import { Layout } from "./components/Layout"
import Homepage from "./pages/Homepage"
import WatchlistPage from "./pages/WatchListPage"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="watchlist" element={<WatchlistPage />} />
      </Route>
    </Routes>
  )
}

export default App
