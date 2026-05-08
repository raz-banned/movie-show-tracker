import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { Input } from "./ui/input"

export function Searchbar() {
  return (
    <div className="mx-auto flex max-w-3xl items-center gap-2">
      <MagnifyingGlassIcon size={24} />
      <Input placeholder="Search movies..." />
    </div>
  )
}
