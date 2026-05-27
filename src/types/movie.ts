import type { Trending } from "./TrendingResponse"
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

export interface Genres {
  id: number
  name: string
}

export interface MovieGenreResponse {
  genres: Genres[]
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
