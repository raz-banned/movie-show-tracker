export interface NormalizedMedia {
  id: number
  backdropPath: string
  title: string
  overview: string
  posterPath: string
  mediaType: "movie" | "tv"
  genreIds: number[]
  releaseDate: string
  voteAverage: number
}
