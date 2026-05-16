export interface WatchlistItem {
  id: number
  status: "Watching" | "Completed" | "Planning"
  added_at: Date
  media_type: "movie" | "tv"
  title: string
  release_date: string
  poster: string
  rating: number
}
