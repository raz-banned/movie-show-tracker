import { DotIcon, StarIcon } from "@phosphor-icons/react"
import { Badge } from "./ui/badge"
import type { Genres } from "@/types/movie"
import type { NormalizedMedia } from "@/types/NormalizedMedia"
import { findGenres } from "@/utils/findGenres"

interface SearchItemProps {
  movie: NormalizedMedia
  genres: Genres[]
}

export function SearchItem({ movie, genres }: SearchItemProps) {
  const filteredGenres = findGenres(movie, genres)

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {movie.posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w92/${movie.posterPath}`}
            className="h-14 w-10 rounded-sm object-cover"
          />
        ) : (
          <div className="h-14 w-10 rounded-sm bg-muted" />
        )}
        <div className="flex flex-col gap-1">
          <span className="text-lg">{movie.title}</span>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              {movie.releaseDate
                ? new Date(movie.releaseDate).getFullYear()
                : "N/A"}
            </span>
            <DotIcon size={18} />
            <Badge
              key={filteredGenres[0]?.id}
              variant="outline"
              className="text-xs font-semibold"
            >
              {filteredGenres[0]?.name}
            </Badge>
            <div className="hidden flex-wrap gap-1 lg:flex">
              {filteredGenres.map((genre) => (
                <Badge
                  key={genre.id}
                  variant="outline"
                  className="text-xs font-semibold"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Badge className="p-3 text-xs text-[oklch(from_var(--color-primary)_0.8_0.20_h)]">
          <StarIcon size={18} data-icon="inline-start" />
          {movie.voteAverage.toFixed(1)}
        </Badge>
      </div>
    </div>
  )
}
