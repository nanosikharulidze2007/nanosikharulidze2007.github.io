import React, { FC, ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Heading from "./Heading";

const NextLevel: FC<{ children?: ReactNode }> = ({ children }) => {
  const { level } = useParams();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link
        style={{
          flex: 1,
        }}
        to={`/level/${level}`}
      >
        <Heading title="Next Level" />
      </Link>
      {children && children}
    </div>
  );
};

export default NextLevel;
