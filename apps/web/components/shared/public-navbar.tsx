import { MdOutlineLocalGroceryStore } from "react-icons/md"
import { Button } from "../ui/button"
import { IoSearch } from "react-icons/io5"

const PublicNavbar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">Grocery Store</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <IoSearch size={16} />
          </Button>
          <Button variant={'link'} size="sm">
            <MdOutlineLocalGroceryStore size={24} />
          </Button>
          <Button variant={'default'} size="sm">
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default PublicNavbar