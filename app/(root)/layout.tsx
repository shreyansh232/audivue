import Nav from "@/components/Nav";
import React, { ReactNode } from "react";
import { getUserDetails } from "@/actions/login";

const Rootlayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserDetails();
  return (
    <div className="relative min-h-screen">
      <Nav user={user} />
      {children}
    </div>
  );
};

export default Rootlayout;
