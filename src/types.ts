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

export type GenresMap = Record<number, string>

export interface Genres {
  id: number
  name: string
}

export interface TvGenreResponse {
  genres: Genres[]
}

export interface MovieGenreResponse {
  genres: Genres[]
}
