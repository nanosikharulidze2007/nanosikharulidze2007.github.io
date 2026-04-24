import React, { FC, ReactNode } from "react";

const Margin: FC<{ children: ReactNode }> = ({ children }) => {
  return <div style={{ marginTop: 60 }}>{children}</div>;
};

export default Margin;
