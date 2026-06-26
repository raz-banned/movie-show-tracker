import { Route, Routes } from "react-router"
import { Layout } from "./components/layout/Layout"
import Homepage from "./pages/Homepage"
import WatchListPage from "./pages/WatchListPage"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="watchlist" element={<WatchListPage />} />
      </Route>
    </Routes>
  )
}

export default App
