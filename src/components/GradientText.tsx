"use client";

import { useEffect, useRef } from "react";

interface GradientTextProps {
  colors: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function GradientText({
  colors,
  animationSpeed = 3,
  showBorder = false,
  className = "",
  children,
}: GradientTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const colorStops = colors
      .map((color, index) => {
        const position = (index / (colors.length - 1)) * 100;
        return `${color} ${position}%`;
      })
      .join(", ");

    element.style.background = `linear-gradient(90deg, ${colorStops})`;
    element.style.backgroundSize = "200% 100%";
    element.style.backgroundClip = "text";
    element.style.webkitBackgroundClip = "text";
    element.style.webkitTextFillColor = "transparent";
    element.style.animation = `gradientMove ${animationSpeed}s ease-in-out infinite`;

    // Add CSS animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gradientMove {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [colors, animationSpeed]);

  return (
    <span
      ref={textRef}
      className={`gradient-text ${
        showBorder ? "border-gradient" : ""
      } ${className}`}
      style={{
        display: "inline-block",
        fontWeight: "inherit",
        fontSize: "inherit",
        lineHeight: "inherit",
        ...(showBorder && {
          border: "2px solid",
          borderImage: `linear-gradient(90deg, ${colors.join(", ")}) 1`,
          padding: "0.5rem 0.5rem",
          borderRadius: "0.5rem",
        }),
      }}
    >
      {children}
    </span>
  );
}
