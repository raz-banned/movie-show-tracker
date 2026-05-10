import { Header } from "@/components/Header"
import { MainMovieCard } from "@/components/MainMovieCard"
import { MovieCards } from "@/components/MovieCards"

function Homepage() {
  return (
    <>
      <Header />
      <main className="px-4 py-8">
        <MainMovieCard />
        <MovieCards />
      </main>
    </>
  )
}

export default Homepage
