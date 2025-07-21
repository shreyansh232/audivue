import { getSession } from "@/actions/auth-actions";
import Nav from "@/components/Nav";
import React, { ReactNode } from "react";

const Rootlayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();
  return (
    <div className="relative min-h-screen">
      <Nav session={session} />
      {children}
    </div>
  );
};

export default Rootlayout;
