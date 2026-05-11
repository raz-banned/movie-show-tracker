import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Homepage from "./pages/homepage"

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
      <Homepage />
    </QueryClientProvider>
  )
}

export default App
