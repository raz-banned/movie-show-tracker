import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Routes } from "react-router"
import { Layout } from "./components/Layout"
import Homepage from "./pages/Homepage"
import WatchlistPage from "./pages/WatchListPage"
import { Toaster } from "sonner"
import { WatchListProvider } from "./context/WatchListProvider"

const queryClient = new QueryClient()

// TypeScript only:
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WatchListProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
          </Route>
        </Routes>
      </WatchListProvider>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
