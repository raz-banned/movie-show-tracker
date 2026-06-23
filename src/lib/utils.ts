import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Genres, Movie, Show, NormalizedMedia } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const findGenres = (movie: NormalizedMedia, genres: Genres[]) => {
  return genres.filter((genre) => movie.genreIds.includes(genre.id))
}

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

export const selectNormalizedMedia = <
  T extends { results: Parameters<typeof normalizeMedia>[0][] },
>(
  data: T
): Omit<T, "results"> & { results: NormalizedMedia[] } => ({
  ...data,
  results: data.results.map(normalizeMedia),
})

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return rtf.format(-seconds, "second")
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return rtf.format(-minutes, "minute")
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return rtf.format(-hours, "hour")
  const days = Math.floor(hours / 24)
  if (days < 30) return rtf.format(-days, "day")
  const months = Math.floor(days / 30)
  if (months < 12) return rtf.format(-months, "month")
  return rtf.format(-Math.floor(months / 12), "year")
}

export const statusColors = {
  Watching: "text-[oklch(0.7_0.1_160)]",
  Completed: "text-[oklch(0.65_0.1_140)]",
  Planning: "text-[oklch(0.7_0.08_260)]",
  "": "",
}

export const statusBgColors = {
  Watching: "bg-[oklch(0.3_0.08_160/0.5)]",
  Completed: "bg-[oklch(0.28_0.05_140/0.5)]",
  Planning: "bg-[oklch(0.28_0.06_260/0.5)]",
  "": "",
}
