import Nav from "@/components/Nav";
import Link from "next/link";
import React, { ReactNode } from "react";

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <Nav />
      {children}
    </div>
  );
};

export default Rootlayout;
