import React, { FC } from "react";
import MuscleRight from "../../assets/muscleRight.png";
import AnimatedBox from "./AnimatedBox";
// import Rose from "../assets/roose.svg";
import Rose from "../assets/roose.svg";
import RoseSvg from "./RoseSvg";
// import  from "./RoseSvg";

const Heading: FC<{ title: string; fontSize?: number }> = ({
  title,
  fontSize = 45,
}) => {
  return (
    <div
      className="heading"
      style={{
        marginTop: 12,
        marginBottom: 12,
        padding: 12,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatedBox animationClass="animate-rotate-fade-in">
        <RoseSvg className="deg270" />
      </AnimatedBox>
      <AnimatedBox animationClass="animate-zoom-in">
        <h2
          style={{
            fontSize: fontSize,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="title"
        >
          {title}
        </h2>
      </AnimatedBox>
      <AnimatedBox animationClass="animate-rotate-fade-in">
        <RoseSvg className="deg90" />
      </AnimatedBox>
    </div>
  );
};

export default Heading;
