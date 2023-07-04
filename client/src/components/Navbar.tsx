import { Home } from "lucide-react";
import { buttonVariants } from "./ui/Button";
const Navbar = () => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <a href="/" className="flex gap-2 items-center">
          <Home className="h-8 w-8 sm:h-6 sm:w-6" />

          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            EstateViewer
          </p>
        </a>

        <a href="/" className={buttonVariants()}>
          Sign In
        </a>
      </div>
    </div>
  );
};

export default Navbar;
