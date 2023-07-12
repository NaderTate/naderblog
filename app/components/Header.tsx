"use client";
import React from "react";
import ThemeSwitcher from "./ThemeButton";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileMenu from "./MobileNav";

function Header() {
  const router = useRouter();
  const [searchTerms, setSearchTerms] = React.useState("");
  const navLinks = [
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
    <div>
      <div className="lg:flex justify-between items-center mt-5 hidden ">
        <div className="flex gap-10 items-center">
          <div>
            <Link href={{ pathname: "/" }}>
              <div>
                <Image
                  src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1689069033/nailedit/Frame_2_yrkykb.png"
                  alt="Logo"
                  height={100}
                  width={250}
                  className="object-contain cursor-pointer"
                />
              </div>
            </Link>
          </div>
          {navLinks.map((link) => (
            <Link
              className="group text-dark-blue dark:text-super-light-blue transition duration-300"
              href={{ pathname: link.link, query: link.query }}
              key={link.name}
            >
              <div className="cursor-pointer">{link.name}</div>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-yellow"></span>
            </Link>
          ))}
        </div>

        <div className="flex gap-5 items-center">
          <div className="relative">
            <form action="">
              <input
                type="text"
                placeholder="Search anything..."
                className="rounded-md py-1 px-3 dark:border-none border border-gray-400"
                onChange={(e) => {
                  if (e.target.value.length > 2) {
                    router.push(`/?s=${e.target.value}`);
                    setSearchTerms(e.target.value);
                  }
                }}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (searchTerms.length > 2) {
                    router.push(`/?s=${searchTerms}`);
                  }
                }}
              >
                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <PiMagnifyingGlassBold size={25} className="cursor-pointer" />
                </span>
              </button>
            </form>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="block lg:hidden">
        <MobileMenu />
      </div>
    </div>
  );
}

export default Header;
