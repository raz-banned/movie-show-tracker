import { DotIcon, StarIcon } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import type { NormalizedMedia } from "@/types"
import { useMovieGenres } from "@/hooks/Genres"

interface SearchItemProps {
  movie: NormalizedMedia
}

export function SearchItem({ movie }: SearchItemProps) {
  const { data: movieGenres } = useMovieGenres()

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {movie.posterPath ? (
          <img
            src={movie.posterPath(92)}
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
              key={movieGenres?.[movie.genreIds[0]] || movie.id}
              variant="outline"
              className="text-xs font-semibold"
            >
              {movieGenres?.[movie.genreIds[0]] || "N/A"}
            </Badge>
            <div className="hidden flex-wrap gap-1 lg:flex">
              {movie.genreIds.map((id) => (
                <Badge
                  key={id}
                  variant="outline"
                  className="text-xs font-semibold"
                >
                  {movieGenres?.[id] || "N/A"}
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
