import type { Genres } from "@/types/movie"
import type { NormalizedMedia } from "@/types/NormalizedMedia"

export const findGenres = (movie: NormalizedMedia, genres: Genres[]) => {
  return genres.filter((genre) => movie.genreIds.includes(genre.id))
}
