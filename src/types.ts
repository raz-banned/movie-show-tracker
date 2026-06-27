export interface NormalizedMedia {
  id: number
  backdropPath: ((width: number) => string) | null
  title: string
  overview: string | null
  posterPath: ((width: number) => string) | null
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
