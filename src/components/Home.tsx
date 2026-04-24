import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Margin from "./Margin";
import Gino from "../assets/gino1.jpg";
import ProductCard from "./ProductCard";
import ReactPlayer from "react-player";
import StarWars from "../assets/star wars.mp4";
import { Colors } from "./Colors";
import AnimatedBox from "./AnimatedBox";
import { useNavigate } from "react-router";
const Home = () => {
  const [level, setLevel] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
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
              <video
                autoPlay
                controls
                width="100%"
                style={{ aspectRatio: "16/9", width: "100%", backgroundColor: Colors.hover }}
                onEnded={() => setIsVideoEnded(true)}
              >
                <source src={StarWars} type="video/mp4" />
              </video>
              {!isVideoEnded && (
                <button
                  className="btn"
                  onClick={() => navigate(`/level/${level}`)}
                  style={{ position: "absolute", bottom: 80, right: 12, opacity: 0.85 }}
                >
                  Skip
                </button>
              )}
            </div>
            {isVideoEnded && (
              <button className="btn" onClick={() => navigate(`/level/${level}`)}>
                Start Game
              </button>
            )}
            <h2 style={{ color: Colors.hover }}>you are on a {level} level </h2>
          </AnimatedBox>
        </Margin>
      </div>
    </div>
  );
};

export default Home;
