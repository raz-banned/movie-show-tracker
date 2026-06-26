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

export interface Movie extends Trending {
  title: string
  original_title: string
  release_date: string | null
  video: boolean
}

export interface TrendingMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface MovieVideosResponse {
  id: number
  results: Video[]
}

export interface TvShow extends Trending {
  name: string
  original_name: string
  first_air_date: string | null
  origin_country: string[]
}

export interface TrendingTvResponse {
  page: number
  results: TvShow[]
  total_pages: number
  total_results: number
}
