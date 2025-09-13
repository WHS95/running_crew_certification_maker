"use client";

import { useRef, useEffect, useState } from "react";

interface TiltedCardProps {
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
  className?: string;
}

export default function TiltedCard({
  captionText,
  containerHeight = "300px",
  containerWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.2,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = true,
  overlayContent,
  className = "",
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = ((e.clientY - centerY) / rect.height) * rotateAmplitude;
      const rotateY =
        ((e.clientX - centerX) / rect.width) * rotateAmplitude * -1;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${
        isHovered ? scaleOnHover : 1
      })`;
    };

    const handleMouseLeave = () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [rotateAmplitude, scaleOnHover, isHovered]);

  return (
    <div className={`tilted-card-container ${className}`}>
      <div
        ref={cardRef}
        className='tilted-card'
        style={{
          width: containerWidth,
          height: containerHeight,
          position: "relative",
          cursor: "pointer",
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {displayOverlayContent && overlayContent && (
          <div
            className='overlay-content'
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              right: "10px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "14px",
              opacity: isHovered ? 1 : 0.8,
              transition: "opacity 0.3s ease",
            }}
          >
            {overlayContent}
          </div>
        )}

        {showTooltip && captionText && (
          <div
            className='tooltip'
            style={{
              position: "absolute",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "black",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
          >
            {captionText}
          </div>
        )}
      </div>

      {showMobileWarning && (
        <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
          Best experienced on desktop
        </p>
      )}
    </div>
  );
}
