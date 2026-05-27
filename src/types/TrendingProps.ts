export interface TrendingProps {
  id: number
  mediaType: "movie" | "tv"
  posterPath: string | null
  title: string
  voteAverage: number
  releaseDate: string | null
}
