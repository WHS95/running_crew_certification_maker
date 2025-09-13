"use client";

import { useState } from "react";
import StaggerdMenu from "@/components/StaggerdMenu";
import GradientText from "@/components/GradientText";
import Stepper, { Step } from "@/components/Stepper";
import LogoSettings from "@/components/certification/LogoSettings";
import BackgroundSettings from "@/components/certification/BackgroundSettings";
import CertificatePreview from "@/components/certification/CertificatePreview";

export default function CertificationPage() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoText, setLogoText] = useState("크루명");
  const [logoFont, setLogoFont] = useState("Arial");
  const [logoFontSize, setLogoFontSize] = useState(16);
  const [logoPosition, setLogoPosition] = useState({ x: 20, y: 20 });
  const [logoSize, setLogoSize] = useState({ width: 100, height: 60 });
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(
    null
  );

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoRemove = () => {
    setLogoPreview(null);
  };

  const handleBackgroundUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBackgroundPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBackgroundRemove = () => {
    setBackgroundPreview(null);
  };

  const generateRandomColor = () => {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#f9ca24",
      "#6c5ce7",
      "#e17055",
      "#00b894",
      "#0984e3",
      "#fdcb6e",
      "#a29bfe",
      "#fd79a8",
      "#00cec9",
      "#74b9ff",
      "#ffeaa7",
      "#dda0dd",
      "#ff7675",
      "#00b894",
      "#6c5ce7",
      "#fdcb6e",
      "#fd79a8",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  };

  const extractColorsFromLogo = () => {
    if (!logoPreview) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Canvas 생성하여 이미지 분석
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // 이미지를 작은 크기로 리사이즈하여 성능 최적화
      const size = 50;
      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(img, 0, 0, size, size);

      // 픽셀 데이터 추출
      const imageData = ctx.getImageData(0, 0, size, size);
      const data = imageData.data;

      // 색상 빈도 계산
      const colorMap = new Map<string, number>();

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // 투명하거나 너무 밝거나 어두운 색상 제외
        if (
          a < 128 ||
          (r > 240 && g > 240 && b > 240) ||
          (r < 15 && g < 15 && b < 15)
        ) {
          continue;
        }

        // 색상을 그룹화하기 위해 값을 반올림
        const roundedR = Math.round(r / 32) * 32;
        const roundedG = Math.round(g / 32) * 32;
        const roundedB = Math.round(b / 32) * 32;

        const colorKey = `${roundedR},${roundedG},${roundedB}`;
        colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
      }

      if (colorMap.size === 0) {
        // 추출된 색상이 없으면 기본 색상 사용
        const fallbackColors = [
          "#ff6b6b",
          "#4ecdc4",
          "#45b7d1",
          "#f9ca24",
          "#6c5ce7",
        ];
        const randomColor =
          fallbackColors[Math.floor(Math.random() * fallbackColors.length)];
        setBackgroundColor(randomColor);
        return;
      }

      // 가장 빈도가 높은 색상들을 정렬
      const sortedColors = Array.from(colorMap.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

      // 가장 빈도가 높은 색상을 배경색으로 설정
      const [mostFrequentColor] = sortedColors[0];
      const [r, g, b] = mostFrequentColor.split(",").map(Number);

      // RGB를 HEX로 변환
      const hex = `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
      setBackgroundColor(hex);
    };

    img.onerror = () => {
      // 이미지 로드 실패시 기본 색상 사용
      const fallbackColors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#f9ca24",
        "#6c5ce7",
      ];
      const randomColor =
        fallbackColors[Math.floor(Math.random() * fallbackColors.length)];
      setBackgroundColor(randomColor);
    };

    img.src = logoPreview;
  };

  return (
    <div className='min-h-screen bg-black text-white relative'>
      <StaggerdMenu />

      <div className='container mx-auto px-4 pt-20'>
        <div className='text-center mb-12'>
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className='text-4xl md:text-6xl font-bold mb-4'
          >
            Marathon Certificate Creator
          </GradientText>
          <p className='text-gray-400 text-lg'>
            크루만의 특별한 마라톤 기록증을 만들어보세요
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto'>
          {/* Left: Stepper */}
          <div>
            <Stepper
              initialStep={1}
              nextButtonText='다음 단계'
              backButtonText='이전'
              stepCircleContainerClassName='w-full'
              className='h-full'
            >
              <Step>
                <div className='space-y-6'>
                  <h2 className='text-2xl font-bold mb-6 text-center text-white'>
                    템플릿 설정
                  </h2>

                  {/* Logo Setup */}
                  <LogoSettings
                    logoFile={null}
                    logoPreview={logoPreview}
                    logoText={logoText}
                    logoFont={logoFont}
                    logoFontSize={logoFontSize}
                    onLogoUpload={handleLogoUpload}
                    onLogoRemove={handleLogoRemove}
                    onLogoTextChange={setLogoText}
                    onLogoFontChange={setLogoFont}
                    onLogoFontSizeChange={setLogoFontSize}
                  />

                  {/* Description */}
                  <div>
                    <label className='block text-sm font-medium mb-2 text-white'>
                      소개글
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className='w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500'
                      rows={3}
                      placeholder='크루 소개글을 입력하세요...'
                    />
                    <p className='text-xs text-gray-400 mt-1'>
                      {description.length}/200자
                    </p>
                  </div>

                  {/* Background Options */}
                  <BackgroundSettings
                    backgroundColor={backgroundColor}
                    backgroundPreview={backgroundPreview}
                    logoPreview={logoPreview}
                    onBackgroundColorChange={setBackgroundColor}
                    onBackgroundUpload={handleBackgroundUpload}
                    onBackgroundRemove={handleBackgroundRemove}
                    onRandomColor={generateRandomColor}
                    onExtractColor={extractColorsFromLogo}
                  />
                </div>
              </Step>

              <Step>
                <div className='space-y-6'>
                  <h2 className='text-2xl font-bold mb-6 text-center text-white'>
                    참가자 기록 입력
                  </h2>

                  <div className='text-center text-gray-400'>
                    <p>참가자 기록 입력 폼이 여기에 표시됩니다.</p>
                    <p className='mt-2'>
                      개별 입력 또는 CSV 파일 업로드가 가능합니다.
                    </p>
                  </div>
                </div>
              </Step>
            </Stepper>
          </div>

          {/* Right: Live Preview */}
          <CertificatePreview
            backgroundColor={backgroundColor}
            backgroundPreview={backgroundPreview}
            logoPreview={logoPreview}
            logoText={logoText}
            logoFont={logoFont}
            logoFontSize={logoFontSize}
            logoPosition={logoPosition}
            logoSize={logoSize}
            description={description}
            onLogoPositionChange={setLogoPosition}
            onLogoSizeChange={setLogoSize}
          />
        </div>
      </div>
    </div>
  );
}
