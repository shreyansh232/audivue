import Link from "next/link";

const Nav = () => {
  return (
    <>
      <nav className="py-8 mx-10">
        <Link href={"/"} className="flex items-center">
          <h1 className="text-3xl font-semibold">Audivue AI</h1>
        </Link>
      </nav>
    </>
  );
};

export default Nav;
