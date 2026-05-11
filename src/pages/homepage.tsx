import { Header } from "@/components/Header"
import { MainMovieCard } from "@/components/MainMovieCard"
import { TrendingMovieCards } from "@/components/TrendingMovieCards"

function Homepage() {
  return (
    <>
      <Header />
      <main className="px-4 py-8">
        <MainMovieCard />
        <TrendingMovieCards />
      </main>
    </>
  )
}

export default Homepage
