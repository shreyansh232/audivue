import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const Nav = () => {
  return (
    <>
      <nav className="py-10 mx-30 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={"/audivue-logo.svg"}
            alt="audivue-logo"
            height={45}
            width={45}
          />
          <Link href={"/"} className="flex items-center">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
              Audivue AI
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <Button className="px-6 py-5 rounded-full tracking-widest font-semibold text-white hover:text-gray-400 hover:bg-transparent bg-transparent cursor-pointer text-lg">
            Sign up
          </Button>
          <Button className="font-semibold text-lg rounded-full bg-accent px-6 py-5 cursor-pointer hover:bg-orange-400">
            Log in
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Nav;
