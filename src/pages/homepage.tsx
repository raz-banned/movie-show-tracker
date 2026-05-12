import { Header } from "@/components/Header"
import { MainMovieCard } from "@/components/MainMovieCard"
import { TrendingCards } from "@/components/TrendingCards"

function Homepage() {
  return (
    <>
      <Header />
      <main className="px-4 py-8">
        <MainMovieCard />
        <TrendingCards />
      </main>
    </>
  )
}

export default Homepage
