import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Heading from "./Heading";
import Margin from "./Margin";
import SendToGmailForm from "./SendToGmailForm";
import { getLevel, incrementLevel } from "../lib/game";
import { Colors } from "./Colors";

const Level1: FC<{ level: string }> = ({ level }) => {
  const [lvl, setLvl] = useState(0);
  useEffect(() => {
    const getLvel = async () => {
      try {
        const res = await getLevel();
        setLvl(res);
      } catch (error) {
        console.log(error);
      }
    };
    getLvel();
  }, [level]);
  console.log(lvl);
  return (
    <div>
      <Heading title={`${lvl} Level`} />
      <Margin>
        <div className="custom-container">
          <h1
            style={{
              textAlign: "center",
            }}
          >
            უპასუხე კითხვებს და გადადი შემდეგ დონეზე
          </h1>
          <SendToGmailForm level={level} />
        </div>
      </Margin>
    </div>
  );
};
import SsVideo from "../assets/ss.mp4";

const Level2: FC<{ level: string }> = ({ level }) => {
  const [lvl, setLvl] = useState(0);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getLvel = async () => {
      try {
        const res = await getLevel();
        setLvl(res);
      } catch (err) {
        console.log(err);
      }
    };
    getLvel();
  }, [level]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const secret = import.meta.env.VITE_LEVEL2_CODE as string;
    if (code === secret) {
      await incrementLevel();
      navigate(`/next/${Number(level) + 1}`);
    } else {
      setError(true);
    }
  };
  return (
    <div>
      <Heading title={`${lvl} Level`} />
      <Margin>
        <div className="custom-container">
          <video
            autoPlay
            controls
            width="100%"
            style={{ aspectRatio: "16/9", width: "100%", backgroundColor: Colors.hover }}
          >
            <source src={SsVideo} type="video/mp4" />
          </video>
          <h1 style={{ marginTop: 24, textAlign: "center" }}>
            Enter Secret code:
          </h1>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: "center" }}
          >
            <input
              style={{ color: Colors.hover }}
              onChange={(e: any) => { setCode(e.target.value); setError(false); }}
              placeholder="Code"
              required
            />
            <button className="btn" type="submit">Submit</button>
          </form>
          {error && (
            <p style={{ color: "#dc2626", textAlign: "center", marginTop: 8 }}>
              Wrong code, try again!
            </p>
          )}
        </div>
      </Margin>
    </div>
  );
};
const Level3: FC<{ level: string }> = ({ level }) => {
  const [lvl, setLvl] = useState(0);
  useEffect(() => {
    const getLvel = async () => {
      try {
        const res = await getLevel();
        setLvl(res);
      } catch (error) {
        console.log(error);
      }
    };
    getLvel();
  }, [level]);
  return (
    <div>
      <Heading title={`${lvl} Level`} />
      <Margin>
        <div className="custom-container">
          <h2
            style={{
              fontSize: 32,
              textAlign: "center",
              marginTop: 12,
              marginBottom: 32,
            }}
          >
            You Need To Visit this location to get a hint
          </h2>
          <iframe
            style={{ width: "100%", border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.865616803461!2d44.75024020000001!3d41.78810970000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40446f1d7dbae415%3A0xbc17b679a751f59c!2sDidi%20Dighomi%20Park!5e0!3m2!1sru!2sge!4v1777019467154!5m2!1sru!2sge"
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Margin>
    </div>
  );
};
const Level4: FC<{ level: string }> = ({ level }) => {
  const [lvl, setLvl] = useState(0);
  useEffect(() => {
    const getLvel = async () => {
      try {
        const res = await getLevel();
        setLvl(res);
      } catch (error) {
        console.log(error);
      }
    };
    getLvel();
  }, [level]);
  return (
    <div>
      <Heading title={`${lvl} Level`} />
      <Margin>
        <div className="custom-container"></div>
      </Margin>
    </div>
  );
};

const Level = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getLevel().then((currentLevel) => {
      const requested = Number(level);
      if (!level || isNaN(requested) || requested > currentLevel) {
        navigate(currentLevel ? `/level/${currentLevel}` : "/", { replace: true });
      } else {
        setChecking(false);
      }
    }).catch(() => navigate("/", { replace: true }));
  }, [level]);

  if (checking) return null;

  switch (level) {
    case "1":
      return <Level1 level={level} />;
    case "2":
      return <Level2 level={level} />;
    case "3":
      return <Level3 level={level} />;
    case "4":
      return <Level4 level={level} />;
    default:
      return (
        <p style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          I appreciate, that you are smart girl, but that doesnt work with me =)
        </p>
      );
  }
};

export default Level;
