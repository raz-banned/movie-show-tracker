import type { Trending } from "./TrendingResponse"

export interface Shows extends Trending {
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
}

export interface TrendingShowsResponse {
  page: number
  results: Shows[]
  total_pages: number
  total_results: number
}
