"use client";

import { useRef, useEffect, useState } from "react";
import DraggableResizable from "@/components/DraggableResizable";

interface CertificatePreviewProps {
  backgroundColor: string;
  backgroundPreview: string | null;
  logoPreview: string | null;
  logoText: string;
  logoFont: string;
  logoFontSize: number;
  logoPosition: { x: number; y: number };
  logoSize: { width: number; height: number };
  description: string;
  onLogoPositionChange: (position: { x: number; y: number }) => void;
  onLogoSizeChange: (size: { width: number; height: number }) => void;
}

export default function CertificatePreview({
  backgroundColor,
  backgroundPreview,
  logoPreview,
  logoText,
  logoFont,
  logoFontSize,
  logoPosition,
  logoSize,
  description,
  onLogoPositionChange,
  onLogoSizeChange,
}: CertificatePreviewProps) {
  const [containerBounds, setContainerBounds] = useState<DOMRect | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBounds = () => {
      if (certificateRef.current) {
        const rect = certificateRef.current.getBoundingClientRect();
        // Account for padding (24px on each side = 48px total)
        setContainerBounds({
          ...rect,
          width: rect.width - 48,
          height: rect.height - 48,
          left: rect.left + 24,
          top: rect.top + 24,
        } as DOMRect);
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  return (
    <div className='lg:sticky lg:top-24 lg:self-start'>
      <div className='bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 p-6'>
        {/* A4 비율 Certificate Preview */}
        <div
          ref={certificateRef}
          className='w-full border border-white/20 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden'
          style={{
            aspectRatio: "210/297", // A4 비율
            backgroundColor: backgroundColor,
            backgroundImage: backgroundPreview
              ? `url(${backgroundPreview})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "400px",
          }}
        >
          {backgroundPreview && (
            <div className='absolute inset-0 bg-black/40'></div>
          )}

          {/* Certificate Content */}
          <div className='relative z-10 h-full flex flex-col justify-between text-center text-white'>
            {/* Header */}
            <div className='space-y-3'>
              {/* Draggable Logo */}
              <DraggableResizable
                initialPosition={logoPosition}
                initialSize={logoSize}
                onPositionChange={onLogoPositionChange}
                onSizeChange={onLogoSizeChange}
                containerBounds={containerBounds || undefined}
                className='z-20'
              >
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt='Logo'
                    className='w-full h-full object-contain'
                  />
                ) : (
                  <div
                    className='w-full h-full flex items-center justify-center text-white font-bold bg-white/5 rounded border border-white/20 relative cursor-move'
                    style={{
                      fontFamily: logoFont,
                      lineHeight: "1.2",
                    }}
                  >
                    <span
                      className='text-center select-none pointer-events-none'
                      style={{
                        fontSize: `${Math.min(
                          logoFontSize,
                          (logoSize.width / logoText.length) * 1.5,
                          logoSize.height * 0.7
                        )}px`,
                        maxWidth: "100%",
                        maxHeight: "100%",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        letterSpacing: "1px",
                      }}
                    >
                      {logoText}
                    </span>
                  </div>
                )}
              </DraggableResizable>
            </div>

            {/* Main Content */}
            <div className='space-y-4'>
              <div>
                <div className='text-sm font-medium mb-1'>RUNNER</div>
                <div className='text-3xl font-bold korean-text'>참가자명</div>
              </div>

              <div>
                <div className='text-sm font-medium mb-1'>RECORD</div>
                <div className='text-2xl font-bold'>10K 00:54:36</div>
              </div>
            </div>

            {/* Footer */}
            <div className='space-y-2 text-xs'>
              <div className='flex justify-between'>
                <div>
                  <div className='font-medium'>PLACE</div>
                  <div> KOREA</div>
                </div>
                <div>
                  <div className='font-medium'>DATE</div>
                  <div>2025.09.13(SAT)</div>
                </div>
              </div>
              <div className='text-center mt-4'>
                <p className='text-xs opacity-80'>
                  {description || "크루 소개글이 여기에 표시됩니다"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className='text-sm text-gray-400 mt-4 text-center'>
          A4 비율로 미리보기 (New Balance 스타일)
        </p>
      </div>
    </div>
  );
}
