import { DotIcon, PlayIcon, TrendUpIcon } from "@phosphor-icons/react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { MainCardSkeleton } from "./MainCardSkeleton"
import { MainCardBookmark } from "./MainCardBookmark"
import { useFeaturedMovie } from "@/hooks/useFeaturedMovie"

export function HeroMovieCard() {
  const {
    movie,
    movieGenres,
    movieTrailer,
    isPending,
    isError,
    error,
    refetch,
  } = useFeaturedMovie()

  if (isPending) return <MainCardSkeleton />
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p>Couldn't load movies {error?.message}</p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    )
  }
  if (!movie) return <div>No results</div>

  return (
    <Card className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl p-6 transition-transform hover:scale-101 md:flex-row md:items-center">
      <div className="w-full md:w-2/5">
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdropPath}`}
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
              {movie.releaseDate.slice(0, 4)}
            </span>
            <DotIcon size={24} />
            <span className="text-sm font-semibold text-primary">
              {movie.voteAverage.toFixed(1)}
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
                {movie.title} - {movieTrailer?.name ?? "Trailer"}
              </DialogTitle>
              <div className="aspect-video w-full rounded-lg bg-black">
                {movieTrailer ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${movieTrailer?.key}`}
                    title={`${movie.title} - ${movieTrailer?.name ?? "Trailer"}`}
                    allowFullScreen
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-lg object-cover">
                    No trailer available
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <MainCardBookmark movie={movie} genres={movieGenres ?? []} />
        </CardFooter>
      </div>
    </Card>
  )
}
