import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { Button } from "../ui/button";
import { IoSearch } from "react-icons/io5";
import { Heart } from "lucide-react";

const PublicNavbar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">Grocery Store</span>
        </div>

        {/* <div className="">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <IoSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          </div>
        </div> */}

        <div className="">
          
        </div>

        <div className="flex items-center gap-3">
          <div className="">
            <Button variant={"link"} size="sm" className="text-black">
              <Heart className="size-6" />
            </Button>
            <Button variant={"link"} size="sm" className="text-black">
              <MdOutlineLocalGroceryStore className="size-6" />
            </Button>
          </div>
          <Button variant={"default"} size="sm">
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;
