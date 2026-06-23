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

export interface Show extends Trending {
  name: string
  original_name: string
  first_air_date: string | null
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

export interface NormalizedMedia {
  id: number
  backdropPath: string | null
  title: string
  overview: string | null
  posterPath: string | null
  mediaType: "movie" | "tv"
  genreIds: number[]
  releaseDate: string | null
  voteAverage: number
}
