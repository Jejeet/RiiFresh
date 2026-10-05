"use client";

import Link from "next/link";
import Image from "next/image";
import logoAsset from "../../../assets/logo.png";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
   DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/rewards", label: "Rewards" },
  { href: "/track", label: "Track order" },
];

const NavBar = () => {
  const pathname = usePathname(); // Get the current active URL path

  return (
    <div className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/">
          <Image
            src={logoAsset}
            alt="Picture of the logo"
            placeholder="blur"
            width={100}
            height={100}
          />
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {links.map((link) => {
            // Check if the link matches the current URL path
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary hover:text-foreground ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Link href="/">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full" />
              }
            >
              <User className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
                  <DropdownMenuLabel className="truncate">
                123452@gmail.com
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/account">My account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/rewards">Rewards</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

           <Button  size="sm" className="hidden rounded-full sm:inline-flex bg-red-700 hover:bg-red-500">
              <Link href="/auth">Sign in</Link>
            </Button>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
