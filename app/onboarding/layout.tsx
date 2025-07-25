import Nav from "@/components/Nav";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
