import { useEffect, useRef, useState } from "react";

interface AnimatedBoxProps {
  children: React.ReactNode;
  animationClass: string;
  className?: string; // Additional CSS classes
  style?: React.CSSProperties; // Additional inline styles
  containerProps?: React.HTMLAttributes<HTMLDivElement>; // Additional props for the div element
}

const getInitialTransformStyle = (animationClass: string): string => {
  switch (animationClass) {
    case "animate-fade-in-up":
      return "translateY(20px)";
    case "animate-zoom-in":
      return "scale(0.8)";
    case "animate-rotate-fade-in":
      return "rotate(-15deg) translateY(25px)";
    case "animate-fade-in-left":
      return "translateX(-10%)";
    case "animate-fade-in-right":
      return "translateX(10%)";
    default:
      return "none";
  }
};

const AnimatedBox = ({
  children,
  animationClass,
  className = "",
  style = {},
  containerProps = {},
}: AnimatedBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
      observer.disconnect();
    };
  }, []);

  // Combine default styles with user-provided styles
  const combinedStyle = {
    ...(!isVisible
      ? { transform: getInitialTransformStyle(animationClass), opacity: 0 }
      : {}),
    ...style, // User styles override defaults
  };

  return (
    <div
      ref={boxRef}
      {...containerProps} // Spread additional props first
      className={`
        p-8 mb-12 rounded-lg shadow-xl 
        transition-all duration-700 ease-out
        ${isVisible ? animationClass : ""}
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")} // Clean up whitespace
      style={combinedStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedBox;
