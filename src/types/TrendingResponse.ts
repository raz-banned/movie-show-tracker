export interface Trending {
  adult: boolean
  backdrop_path: string | null
  id: number
  original_language: string
  overview: string | null
  poster_path: string | null
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
