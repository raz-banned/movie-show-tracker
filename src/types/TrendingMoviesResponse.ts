import type { Trending } from "./TrendingResponse"

export interface Movie extends Trending {
  title: string
  original_title: string
  release_date: string
  video: boolean
}

export interface TrendingMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
