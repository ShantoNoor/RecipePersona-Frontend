import { CircleUser, Menu, Search, UtensilsCrossed } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ui/mode-toggle";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import useAuth from "@/hooks/useAuth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const links = [
    { text: "Home", to: "/" },
    { text: "Recipes", to: "/recipes" },
  ];

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-lg font-semibold md:text-base"
          >
            <UtensilsCrossed className="h-6 w-6" />
            <span className="text-nowrap">Recipe Persona</span>
          </Link>

          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="text-foreground transition-colors hover:text-foreground"
            >
              {link.text}
            </Link>
          ))}

          {!user && (
            <Link
              to="/login"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Login
            </Link>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <span className="text-nowrap text-lg font-semibold md:text-base md:hidden">
            Recipe Persona
          </span>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <UtensilsCrossed className="h-6 w-6" />
                <span className="text-nowrap">Recipe Persona</span>
              </Link>
              {links.map((link, idx) => (
                <Link key={idx} to={link.to} className="hover:text-foreground">
                  {link.text}
                </Link>
              ))}
              {!user && (
                <Link to="/login" className="hover:text-foreground">
                  Login
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="flex-1" />
          <ModeToggle />
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  {user ? (
                    <>
                      <Avatar>
                        <AvatarImage src={user.photoURL} />
                        <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                      </Avatar>
                    </>
                  ) : (
                    <CircleUser className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/my-profile">
                  <DropdownMenuItem className="cursor-pointer">
                    My Profile
                  </DropdownMenuItem>
                </Link>
                <Link to="/my-recipes">
                  <DropdownMenuItem className="cursor-pointer">
                    My Recipes
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => await signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
