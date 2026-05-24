export interface TrendingProps {
  id: number
  mediaType: "movie" | "tv"
  posterPath: string
  title: string
  voteAverage: number
  releaseDate: string
}
