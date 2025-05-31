import Link from "next/link";

const Nav = () => {
  return (
    <>
      <nav>
        <Link href={"/"} className="flex items-center ">
          <h1 className="text-xl font-semibold">Audivue AI</h1>
        </Link>
      </nav>
    </>
  );
};

export default Nav;
