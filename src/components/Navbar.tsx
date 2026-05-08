import { Button } from "./ui/button"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative md:order-2">
      <Button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </Button>
      <ul
        className={`absolute top-full left-0 z-50 flex-col gap-4 rounded-sm bg-accent p-2 md:static md:flex md:flex-row md:gap-12 md:bg-transparent md:p-0 ${isMenuOpen ? "flex" : "hidden"} md:block`}
      >
        <li className="cursor-pointer transition hover:text-primary">
          Главная
        </li>
        <li className="cursor-pointer transition hover:text-primary">Жанры</li>
        <li className="cursor-pointer transition hover:text-primary">
          Сериалы
        </li>
      </ul>
    </nav>
  )
}
