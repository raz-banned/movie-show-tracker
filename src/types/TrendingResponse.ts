export interface Trending {
  adult: boolean
  backdrop_path: string
  id: number
  original_language: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  vote_average: number
  vote_count: number
}

export interface TrendingResponse {
  page: number
  results: Trending[]
  total_pages: number
  total_results: number
}
