import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { TrendingCardBookmark } from "./TrendingCardBookmark"
import { Badge } from "./ui/badge"
import { useShowGenres } from "@/hooks/useShowGenres"
import { useMovieGenres } from "@/hooks/useMovieGenres"
import type { TrendingProps } from "@/types/TrendingProps"

interface TrendingCardProps extends TrendingProps {
  genreIds: number[]
}

export function TrendingCard({
  id,
  mediaType,
  posterPath,
  title,
  voteAverage,
  releaseDate,
  genreIds,
}: TrendingCardProps) {
  const { movieGenresData } = useMovieGenres()
  const { showGenresData } = useShowGenres()

  const genresData = mediaType === "movie" ? movieGenresData : showGenresData
  const genres =
    genresData &&
    genresData.genres.filter((genre) => genreIds.includes(genre.id))

  return (
    <Card className="relative transform gap-2 overflow-hidden rounded-md p-0 transition-transform hover:-translate-y-1">
      <div className="aspect-2/3 w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="flex flex-col p-4">
        <Badge className="absolute top-2 right-2 h-5 w-8 bg-accent p-1 text-xs">
          {voteAverage.toFixed(1)}
        </Badge>
        <TrendingCardBookmark
          id={id}
          mediaType={mediaType}
          posterPath={posterPath}
          title={title}
          voteAverage={voteAverage}
          releaseDate={releaseDate}
          genres={genres}
        />
        <CardTitle className="truncate text-sm">
          {title.length > 30 ? `${title.slice(0, 30)}...` : title}
        </CardTitle>
        <CardDescription className="text-xs">
          {new Date(releaseDate).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
