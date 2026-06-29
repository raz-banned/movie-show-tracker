export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.TMDB_TOKEN}`,
  },
}

const createApi = (baseUrl: string) => {
  return (endpoint: string, options: RequestInit = {}) => {
    return fetch(`${baseUrl}${endpoint}`, options)
  }
}

export const api = createApi(
  import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3"
)
