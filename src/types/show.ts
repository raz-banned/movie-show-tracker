import type { Trending } from "./TrendingResponse"

export interface Show extends Trending {
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
}

export interface TrendingShowsResponse {
  page: number
  results: Show[]
  total_pages: number
  total_results: number
}

export interface ShowGenreResponse {
  genres: {
    id: number
    name: string
  }[]
}
