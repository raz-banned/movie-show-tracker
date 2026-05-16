import { ArrowRightIcon } from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { Link, useSearchParams } from "react-router"
import { useTrendingMovies } from "@/hooks/useTrendingMovies"
import { TrendingCard } from "./TrendingCard"
import { useTrendingShows } from "@/hooks/useTrendingShows"
import { TrendingCardsSkeleton } from "./TrendingCardsSkeleton"

export function TrendingCards() {
  const [searchParams, setSearchParams] = useSearchParams({ tab: "movies" })
  const activeTab = searchParams.get("tab") ?? "movies"

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

  const isLoading = isMoviesLoading || isShowsLoading
  const error = moviesError || showsError

  const content = () => {
    if (isLoading) return <TrendingCardsSkeleton />
    if (error)
      return (
        <div className="flex flex-col items-center gap-2">
          <p>Не удалось загрузить фильмы</p>
          <Button
            onClick={() => {
              refetchMovies()
              refetchShows()
            }}
          >
            Попробовать снова
          </Button>
        </div>
      )
    if (!movies?.length)
      return (
        <div className="flex flex-col items-center gap-2">
          <p>Нет результатов</p>
        </div>
      )
    return activeTab === "shows"
      ? shows?.map((show) => (
          <TrendingCard
            key={show.id}
            id={show.id}
            mediaType={show.media_type === "tv" ? "tv" : "movie"}
            poster={show.poster_path}
            title={show.name}
            rating={show.vote_average}
            releaseDate={show.first_air_date}
          />
        ))
      : movies?.map((movie) => (
          <TrendingCard
            key={movie.id}
            id={movie.id}
            mediaType={movie.media_type === "tv" ? "tv" : "movie"}
            poster={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
            releaseDate={movie.release_date}
          />
        ))
  }

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
            variant={activeTab === "movies" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchParams({ tab: "movies" })}
          >
            Movies
          </Button>
          <Button
            variant={activeTab === "shows" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchParams({ tab: "shows" })}
          >
            Shows
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {content()}
      </div>
    </section>
  )
}
