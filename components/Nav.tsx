"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "@/actions/auth-actions";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Nav = () => {
  const { data: session, refetch } = authClient.useSession();
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
        {session ? (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="outline-none cursor-pointer"
              >
                <div>
                  {" "}
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      alt="User Avatar"
                      src={session?.user?.image as string}
                    />
                    <AvatarFallback> {session?.user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={async () => {
                    await signOut();
                    refetch();
                  }}
                  className="cursor-pointer"
                >
                  Sign Out <LogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
