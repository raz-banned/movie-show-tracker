export interface WatchListStorageItem {
  id: number
  status: "Watching" | "Completed" | "Planning"
  addedAt: string
  mediaType: "movie" | "tv"
  title: string
  releaseDate: string
  posterPath: string
  voteAverage: number
  genres: { id: number; name: string }[]
}
