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
