import type { NormalizedMedia } from "@/types"
import type { Movie, Show } from "./types"

export const normalizeMedia = (
  item: Movie | Show,
  overrideType?: "movie" | "tv"
): NormalizedMedia => {
  return {
    id: item.id,
    backdropPath: item.backdrop_path,
    title: "title" in item ? item.title : item.name,
    overview: item.overview,
    posterPath: item.poster_path,
    mediaType: (item.media_type ||
      overrideType ||
      ("title" in item ? "movie" : "tv")) as "movie" | "tv",
    genreIds: item.genre_ids,
    releaseDate:
      "release_date" in item ? item.release_date : item.first_air_date,
    voteAverage: item.vote_average,
  }
}

export const selectNormalizedMedia = <T extends { results: Movie[] | Show[] }>(
  data: T
): Omit<T, "results"> & { results: NormalizedMedia[] } => ({
  ...data,
  results: data.results.map((item) => normalizeMedia(item)),
})
