import {
  BookmarkSimpleIcon,
  DotIcon,
  PlayIcon,
  TrendUpIcon,
} from "@phosphor-icons/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState } from "react"
import { useMainMovie } from "@/hooks/useMainMovie"
import { MainMovieCardSkeleton } from "./MainMovieCardSkeleton"

export function MainMovieCard() {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { movie, movieGenres, movieTrailer, isPending, error, refetch } =
    useMainMovie()

  if (isPending) return <MainMovieCardSkeleton />
  if (error) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p>Couldn't load movies</p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    )
  }
  if (!movie) return <div>No results</div>

  return (
    <Card className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl p-6 transition-transform hover:scale-101 md:flex-row md:items-start">
      <div className="w-full md:w-2/5">
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          className="aspect-video w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <CardHeader className="p-0">
          <Badge>
            <TrendUpIcon size={32} />
            <span className="text-xs">In Trend</span>
          </Badge>
          <CardTitle className="text-xl font-semibold">{movie.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0">
          <div className="flex items-center gap-1 text-sm">
            <span className="text-sm font-medium">
              {movie.release_date.slice(0, 4)}
            </span>
            <DotIcon size={24} />
            <span className="text-sm font-semibold text-primary">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {movieGenres?.map((genre) => (
              <Badge
                key={genre.id}
                variant="secondary"
                className="text-xs font-semibold"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
          <p className="max-w-prose">{movie.overview.slice(0, 200)}...</p>
        </CardContent>
        <CardFooter className="mt-2 flex items-center gap-2 p-0">
          <Dialog>
            <Button asChild>
              <DialogTrigger>
                <PlayIcon size={24} />
                <span className="text-sm font-semibold">Watch Trailer</span>
              </DialogTrigger>
            </Button>
            <DialogContent>
              <DialogTitle>
                {movie.title} - {movieTrailer?.name}
              </DialogTitle>
              <div className="aspect-video w-full rounded-lg bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${movieTrailer?.key}`}
                  title={`${movie.title} - ${movieTrailer?.name}`}
                  allowFullScreen
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant={"secondary"}
            onClick={() => setIsBookmarked((prev) => !prev)}
          >
            {isBookmarked ? (
              <BookmarkSimpleIcon size={24} weight="fill" />
            ) : (
              <BookmarkSimpleIcon size={24} />
            )}
            <span className="text-sm font-medium">Watchlist</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
