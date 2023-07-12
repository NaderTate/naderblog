import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
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
  );
}

export default Logo;
