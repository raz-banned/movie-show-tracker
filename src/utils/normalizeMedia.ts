import type { Movie } from "@/types/movie"
import type { NormalizedMedia } from "@/types/NormalizedMedia"
import type { Show } from "@/types/show"

export const normalizeMedia = (item: Movie | Show): NormalizedMedia => {
  return {
    id: item.id,
    backdropPath: item.backdrop_path,
    title: "title" in item ? item.title : item.name,
    overview: item.overview,
    posterPath: item.poster_path,
    mediaType: item.media_type === "tv" ? "tv" : "movie",
    genreIds: item.genre_ids,
    releaseDate:
      "release_date" in item ? item.release_date : item.first_air_date,
    voteAverage: item.vote_average,
  }
}
