import { Header } from "@/components/Header"
import { MainMovieCard } from "@/components/MainMovieCard"

function Homepage() {
  return (
    <>
      <Header />
      <main className="px-4 py-8">
        <MainMovieCard />
      </main>
    </>
  )
}

export default Homepage
