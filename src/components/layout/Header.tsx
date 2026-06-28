import { BookmarkSimpleIcon } from "@phosphor-icons/react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Link, useLocation } from "react-router"
import { Navbar } from "../Navbar"
import { Searchbar } from "@/features/media"

export function Header() {
  const location = useLocation()

  return (
    <>
      <header className="p-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:gap-8 md:p-4">
          <div className="flex items-center justify-between md:contents">
            <Navbar />
            <h1 className="text-2xl font-bold md:order-first lg:mr-12">
              cine<span className="text-primary">bon</span>
            </h1>
            <Button asChild size="icon" variant="ghost">
              <Link to="/watchlist" className="md:order-last">
                <BookmarkSimpleIcon
                  size={24}
                  weight={
                    location.pathname === "/watchlist" ? "fill" : "regular"
                  }
                />
              </Link>
            </Button>
          </div>
          <div className="md:order-3 md:flex-1">
            <Searchbar />
          </div>
        </div>
      </header>
      <Separator className="hidden md:block" />
    </>
  )
}
