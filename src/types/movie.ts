import type { Trending } from "./TrendingResponse"

export interface MovieGenreResponse {
  genres: {
    id: number
    name: string
  }[]
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
