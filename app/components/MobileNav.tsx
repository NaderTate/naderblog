"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeButton from "./ThemeButton";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { useRouter } from "next/navigation";
function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const router = useRouter();
  const itemStyle =
    "p-2 w-full dark:bg-[#3B3B3B] bg-white flex flex-col items-center rounded-md font-bold tracking-widest space-y-2";
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
    <div className="">
      <div
        className={`menuBtn  ${isMenuOpen ? "closer" : null}`}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <div
          className={`btnLine bg-black dark:bg-white ${
            isMenuOpen ? "closer" : null
          }`}
        />
        <div
          className={`btnLine bg-black dark:bg-white ${
            isMenuOpen ? "closer" : null
          }`}
        />
        <div
          className={`btnLine bg-black dark:bg-white ${
            isMenuOpen ? "closer" : null
          }`}
        />
      </div>
      <nav
        aria-label="Main Nav"
        className={`pt-16 mt-1 rounded-md border border-b border-white bg-[#efefef] menuOverlay dark:bg-[#121212] ${
          isMenuOpen ? "show" : null
        } `}
      >
        <div className="px-1 flex flex-col justify-center items-center space-y-2 ">
          <div className="relative w-full">
            <form action="">
              <input
                type="text"
                placeholder="Search anything..."
                className="rounded-md py-1 px-3 dark:border-none border border-gray-400 w-full"
                onChange={async (e) => {
                  setSearchTerms(e.target.value);
                }}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (searchTerms.length > 2) {
                    router.push(`/search?s=${searchTerms}`);
                  }
                }}
              ></button>
            </form>
            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <PiMagnifyingGlassBold
                onClick={(e: React.FormEvent<EventTarget>) => {
                  e.preventDefault();
                  if (searchTerms.length > 2) {
                    router.push(`/?s=${searchTerms}`);
                    setIsMenuOpen(false);
                  }
                }}
                className="w-6 h-6 cursor-pointer"
              />
            </span>
          </div>
          <div className="flex flex-col items-center space-y-2 w-full">
            {navLinks.map((link) => (
              <Link
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className={itemStyle}
                href={{ pathname: link.link, query: link.query }}
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {/* <Link className={itemStyle} href={{ pathname: "/" }}>
            <div>
              <div className="flex gap-1">
                <h1>Home</h1>
                <AiOutlineHome />
              </div>
            </div>
          </Link>
          <div className={itemStyle}>
            <h1>Trending </h1>

            <Link
              href={{ pathname: "/categories/648337b7223afa484880f4fb" }}
              className=" font-normal  w-full text-center"
            >
              Women&apos;s Fashion
            </Link>
          </div>
          <div className={itemStyle}>
            <h1>Hot Deals</h1>
            <Link
              href={{ pathname: "/categories/64835031082e25fade6967c6" }}
              className=" font-normal  w-full text-center"
            >
              Fitness Equimpents
            </Link>
            <Link
              href={{ pathname: "/categories/648349423d5e7e6f8b55811c" }}
              className=" font-normal w-full text-center"
            >
              Pearl Jewelery
            </Link>
          </div>
          <div> </div> */}
          <ThemeButton />
        </div>
      </nav>
    </div>
  );
}

export default MobileMenu;
