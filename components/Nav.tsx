import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { LogOut } from "lucide-react";

const Nav = ({ user }: { user: any }) => {
  return (
    <>
      <nav className="py-10 lg:mx-30 mx-6 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={"/audivue-logo.svg"}
            alt="audivue-logo"
            height={45}
            width={45}
          />
          <Link href={"/"} className="flex items-center">
            <h1 className="lg:text-3xl text-lg font-semibold bg-gradient-to-b from-gray-200 via-gray-300 to-gray-600 bg-clip-text text-transparent">
              Audivue AI
            </h1>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            {user.user_metadata?.avatar_url && (
              <Image
                src={user.user_metadata.avatar_url}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="text-white font-semibold">
              {user.user_metadata?.full_name || user.email}
            </span>
            <form action={signOut}>
              <Button
                className="font-semibold lg:text-base text-sm rounded-full bg-accent lg:px-6 lg:py-5 px-3 py-2 cursor-pointer hover:bg-orange-400"
                type="submit"
              >
                Sign Out
                <LogOut />
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex items-center">
            <Link href="/sign-up">
              {" "}
              <Button className=" rounded-full tracking-widest font-semibold text-white hover:text-gray-400 hover:bg-transparent bg-transparent cursor-pointer lg:text-lg text-sm">
                Sign up
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="font-semibold lg:text-lg text-sm rounded-full bg-accent lg:px-6 lg:py-5 px-3 py-2 cursor-pointer hover:bg-orange-400">
                Log in
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
