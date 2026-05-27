export interface WatchListStorageItem {
  id: number
  status: "Watching" | "Completed" | "Planning"
  addedAt: string
  mediaType: "movie" | "tv"
  title: string
  releaseDate: string | null
  posterPath: string | null
  voteAverage: number
  genres: { id: number; name: string }[]
}
