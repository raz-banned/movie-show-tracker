import { ArrowRightIcon } from "@phosphor-icons/react"
import { Button } from "./ui/button"
import { Link, useSearchParams } from "react-router"
import { useMovies } from "@/hooks/useMovies"
import { TrendingCard } from "./TrendingCard"
import { TrendingCardsSkeleton } from "./TrendingCardsSkeleton"
import { useShows } from "@/hooks/useShows"

export function TrendingCards() {
  const [searchParams, setSearchParams] = useSearchParams({ tab: "movies" })
  const activeTab = searchParams.get("tab")

  const { movies, isMoviesPending, isMoviesError, moviesError, refetchMovies } =
    useMovies()
  const { shows, isShowsPending, isShowsError, showsError, refetchShows } =
    useShows()

  const isLoading = isMoviesPending || isShowsPending
  const isError = isMoviesError || isShowsError
  const items = activeTab === "shows" ? shows : movies

  const content = () => {
    if (isLoading) return <TrendingCardsSkeleton />
    if (isError)
      return (
        <div className="flex flex-col items-center gap-2">
          <p>
            Не удалось загрузить фильмы
            {isMoviesError ? moviesError?.message : showsError?.message}
          </p>
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
    return items?.map((item) => (
      <TrendingCard
        key={item.id}
        id={item.id}
        mediaType={item.mediaType}
        posterPath={item.posterPath}
        title={item.title}
        voteAverage={item.voteAverage}
        releaseDate={item.releaseDate}
        genreIds={item.genreIds}
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
