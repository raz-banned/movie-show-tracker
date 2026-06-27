import type { NormalizedMedia } from "@/types"
import type { Movie, TvShow } from "./types"

export const normalizeMedia = (item: Movie | TvShow): NormalizedMedia => {
  return {
    id: item.id,
    title: "title" in item ? item.title : item.name,
    overview: item.overview,
    genreIds: item.genre_ids,
    releaseDate:
      "release_date" in item ? item.release_date : item.first_air_date,
    voteAverage: item.vote_average,
    mediaType: item.media_type === "tv" ? "tv" : "movie",
    posterPath: item.poster_path
      ? (width: number) =>
          `https://image.tmdb.org/t/p/w${width}/${item.poster_path}`
      : null,
    backdropPath: item.backdrop_path
      ? (width: number) =>
          `https://image.tmdb.org/t/p/w${width}/${item.backdrop_path}`
      : null,
  }
}

export const selectNormalizedMedia = <
  T extends { results: Movie[] | TvShow[] },
>(
  data: T
): Omit<T, "results"> & { results: NormalizedMedia[] } => ({
  ...data,
  results: data.results.map(normalizeMedia),
})
