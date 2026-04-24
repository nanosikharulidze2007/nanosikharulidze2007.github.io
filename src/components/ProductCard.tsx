import React, { FC } from "react";
import styles from "./ProductCard.module.css";
import AnimatedBox from "./AnimatedBox";
import { Colors } from "./Colors";
import { Link } from "react-router";

interface ICardProps {
  img: string;
  title: string;
  description: string;
}

const ProductCard: FC<{ facility: ICardProps }> = ({ facility }) => {
  return (
    <AnimatedBox
      animationClass=" animate-fade-in-right"
      className={styles.card}
    >
      <Link to="/">
        <AnimatedBox
          animationClass="animate-fade-in-left"
          className={styles.cardContainer}
        >
          <img
            src={facility.img}
            style={{
              height: 250,
              width: 250,
              backgroundColor: "transparent",
            }}
          />
        </AnimatedBox>
        <AnimatedBox
          animationClass="animate-fade-in-left"
          className={styles.cardBot}
        >
          <h2 className={styles.title}>{facility.title}</h2>
          <p
            style={{
              textDecoration: "none",
            }}
          >
            {facility.description}{" "}
          </p>
        </AnimatedBox>
      </Link>
    </AnimatedBox>
  );
};

export default ProductCard;
