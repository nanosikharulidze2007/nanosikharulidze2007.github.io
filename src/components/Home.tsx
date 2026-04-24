import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Margin from "./Margin";
import Gino from "../assets/gino1.jpg";
import ProductCard from "./ProductCard";
import ReactPlayer from "react-player";
import { Colors } from "./Colors";
import AnimatedBox from "./AnimatedBox";
import { useNavigate } from "react-router";
const Home = () => {
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE}/api/game`,
        );
        if (!response.ok) throw new Error("Failed to fetch level");
        const data = await response.json();
        setLevel(data.level);
      } catch (error) {
        console.error("Error fetching level:", error);
      }
    };
    fetchLevel();
  }, []);
  return (
    <div>
      <Heading title="For Nano" />
      <div className="custom-container ">
        <Margin>
          <AnimatedBox
            animationClass="nimate-zoom-in"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            <h1 className="text-2xl font-bold mb-4" style={{ color: Colors.hover }}>Lets start a Game?</h1>
            <div style={{ position: "relative", width: "100%" }}>
              <iframe
                width="100%"
                style={{ aspectRatio: "16/9", border: 0 }}
                src="https://drive.google.com/file/d/1Ju1QfsXi6BMULbSP03BOh5CXOddm4ByQ/preview"
                allow="autoplay"
              />
            </div>
            <button className="btn" onClick={() => navigate(`/level/${level}`)}>
              Start Game
            </button>
            <h2 style={{ color: Colors.hover }}>you are on a {level} level </h2>
          </AnimatedBox>
        </Margin>
      </div>
    </div>
  );
};

export default Home;
