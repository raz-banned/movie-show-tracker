import { Link } from "react-router"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export function Navbar() {
  return (
    <nav className="md:order-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" className="md:hidden">
            ☰
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-24">
          <ul className={`flex flex-col gap-4`}>
            <li className="cursor-pointer transition hover:text-primary">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer transition hover:text-primary">
              <Link to="/genres">Genres</Link>
            </li>
          </ul>
        </PopoverContent>
      </Popover>

      <ul className="hidden md:flex md:flex-row md:gap-12">
        <li className="cursor-pointer transition hover:text-primary">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer transition hover:text-primary">
          <Link to="/genres">Genres</Link>
        </li>
      </ul>
    </nav>
  )
}
