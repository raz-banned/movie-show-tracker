import type { Genres } from "@/types/movie"
import type { NormalizedMedia } from "@/types/NormalizedMedia"

export const findGenres = (media: NormalizedMedia[], genres: Genres[]) => {
  return genres.filter((genre) =>
    media.some((movie) => movie.genreIds.includes(genre.id))
  )
}
