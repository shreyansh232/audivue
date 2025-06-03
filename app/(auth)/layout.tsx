import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const gradientStyle = {
    background: "radial-gradient(125% 125% at 50% 10%, #000 40%, #ff8904 100%)",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <div style={gradientStyle}>{children}</div>;
};

export default AuthLayout;
