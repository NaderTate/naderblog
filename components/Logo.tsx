import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href={{ pathname: "/" }}>
      <Image
        src="https://res.cloudinary.com/dqkyatgoy/image/upload/v1689069033/nailedit/Frame_2_yrkykb.png"
        alt="Logo"
        height={100}
        width={250}
        className="object-contain"
      />
    </Link>
  );
}

export default Logo;
