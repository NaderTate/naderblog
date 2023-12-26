"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

import Logo from "./Logo";

import { PiMagnifyingGlassBold } from "react-icons/pi";

function Header() {
  const router = useRouter();
  const [searchTerms, setSearchTerms] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "App router",
      link: "/",
      query: { tag: "app-router" },
    },
    {
      name: "Backend",
      link: "/",
      query: { tag: "backend" },
    },
    {
      name: "Beginners guide",
      link: "/",
      query: { tag: "beginners-guide" },
    },
  ];
  return (
    <Navbar
      maxWidth="full"
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand className="hidden sm:block">
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((link) => (
          <NavbarItem key={link.link}>
            <Link
              className="group text-dark-blue dark:text-super-light-blue transition duration-300"
              href={{ pathname: link.link, query: link.query }}
            >
              <div className="cursor-pointer">{link.name}</div>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-yellow"></span>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <form>
            <Input
              size="sm"
              variant="bordered"
              label="Search anything..."
              onValueChange={(e) => {
                if (e.length > 2) {
                  router.push(`/?s=${e}`);
                  setSearchTerms(e);
                }
              }}
              endContent={
                <Button
                  size="sm"
                  className="m-auto"
                  radius="full"
                  variant="light"
                  type="submit"
                  isIconOnly
                  aria-label="search"
                  onClick={(e) => {
                    e.preventDefault();
                    if (searchTerms.length > 2) {
                      router.push(`/?s=${searchTerms}`);
                    }
                  }}
                >
                  <PiMagnifyingGlassBold size={25} className="cursor-pointer" />
                </Button>
              }
            />
          </form>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem
            key={item.link}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <Link href={{ pathname: item.link, query: item.query }}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
