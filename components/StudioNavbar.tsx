import Link from "next/link";
import { LuArrowLeftCircle } from "react-icons/lu";

function StudioNavbar(props: any) {
  return (
    <div className="bg-[#101112]">
      <div className="p-5">
        <Link href="/">
          <div className="flex gap-2 items-center text-white">
            <LuArrowLeftCircle />
            Go to the website
          </div>
        </Link>
      </div>
      {props.renderDefault(props)}
    </div>
  );
}

export default StudioNavbar;
