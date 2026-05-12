import { ArrowRightIcon } from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { Link, useSearchParams } from "react-router"
import { useTrendingMovies } from "@/hooks/useTrendingMovies"
import { TrendingMovieCard } from "./TrendingMovieCard"
import { useTrendingShows } from "@/hooks/useTrendingShows"
import { TrendingShowCard } from "./TrendingShowcard"

export function TrendingCards() {
  const [searchParams, setSearchParams] = useSearchParams({ tab: "movies" })
  const {
    movies,
    isLoading: isMoviesLoading,
    error: moviesError,
    refetch: refetchMovies,
  } = useTrendingMovies()
  const {
    shows,
    isLoading: isShowsLoading,
    error: showsError,
    refetch: refetchShows,
  } = useTrendingShows()

  if (isMoviesLoading || isShowsLoading) return <div>Loading...</div>
  if (moviesError || showsError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p>Не удалось загрузить фильмы</p>
        <Button onClick={() => refetchMovies() || refetchShows()}>
          Попробовать снова
        </Button>
      </div>
    )
  }
  if (!movies?.length) return <div>No results</div>

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4 py-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">In Trend</h2>
          <Button asChild variant="link">
            <Link to="/trending" className="flex items-center">
              <span>All</span>
              <ArrowRightIcon size={24} />
            </Link>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={
              searchParams.get("tab") === "movies" ? "default" : "outline"
            }
            size="sm"
            onClick={() => setSearchParams({ tab: "movies" })}
          >
            Movies
          </Button>
          <Button
            variant={
              searchParams.get("tab") === "shows" ? "default" : "outline"
            }
            size="sm"
            onClick={() => setSearchParams({ tab: "shows" })}
          >
            Shows
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {searchParams.get("tab") === "movies" || !searchParams.get("tab")
          ? movies.map((movie) => (
              <TrendingMovieCard
                key={movie.id}
                poster={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
              />
            ))
          : shows?.map((show) => (
              <TrendingShowCard
                key={show.id}
                poster={show.poster_path}
                name={show.name}
                rating={show.vote_average}
                airDate={show.first_air_date}
              />
            ))}
      </div>
    </section>
  )
}
