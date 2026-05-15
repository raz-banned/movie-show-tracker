import { Header } from "./Header"
import { Outlet } from "react-router"

export function Layout() {
  return (
    <>
      <Header />
      <main className="px-4 py-8">
        <Outlet />
      </main>
    </>
  )
}
