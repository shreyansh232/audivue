import Link from "next/link";
import React, { ReactNode } from "react";

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <Link href={"/"} className="flex items-center ">
          <h1 className="text-xl font-semibold">Audivue AI</h1>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default Rootlayout;
