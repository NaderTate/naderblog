import Link from "next/link";
import Image from "next/image";
import { Divider } from "@nextui-org/react";

import { GrGithub } from "react-icons/gr";
import { IoLogoLinkedin } from "react-icons/io5";

type Props = {};

const Footer = ({}: Props) => {
  return (
    <footer className="flex flex-col-reverse gap-5 md:flex-row justify-between bg-content4 p-10 mt-10 rounded-md">
      <div>
        <h1 className="text-lg font-semibold">Quick links</h1>
        <ul className="ml-3">
          <li>
            <Link href={{ pathname: "/" }}>Home</Link>
          </li>
          <li>
            <Link href={{ pathname: "/", query: { tag: "app-router" } }}>
              App router
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/", query: { tag: "backend" } }}>
              Backend
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/", query: { tag: "beginners-guide" } }}>
              Beginners guide
            </Link>
          </li>
        </ul>
      </div>
      <Divider orientation="vertical" className="my-auto md:h-28 " />
      <div>
        <h1 className="text-lg font-semibold">Follow us on</h1>
        <div className="flex gap-5">
          <Link
            href="https://www.linkedin.com/in/nader-elmahdy-1b8557272/"
            target="_blank"
          >
            <IoLogoLinkedin size={25} />
          </Link>

          <Link href="https://github.com/NaderTate" target="_blank">
            <GrGithub size={25} />
          </Link>
        </div>
      </div>
      <Divider orientation="vertical" className="my-auto md:h-28" />

      <Image
        src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1689069033/nailedit/Frame_2_yrkykb.png"
        width={400}
        height={200}
        alt="logo"
        className="object-contain"
      />
    </footer>
  );
};

export default Footer;
