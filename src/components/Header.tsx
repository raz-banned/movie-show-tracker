import { BookmarkSimpleIcon } from "@phosphor-icons/react"
import { Navbar } from "./Navbar"
import { Searchbar } from "./Searchbar"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export function Header() {
  return (
    <>
      <header className="p-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:gap-16 md:p-6">
          <div className="flex items-center justify-between md:contents">
            <Navbar />
            <h1 className="text-2xl font-bold md:order-first">
              cine<span className="text-primary">bon</span>
            </h1>
            <Button size="icon" variant="ghost" className="md:order-last">
              <BookmarkSimpleIcon size={24} />
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
