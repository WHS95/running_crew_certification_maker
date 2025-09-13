"use client";

import { useState } from "react";
import StaggerdMenu from "@/components/StaggerdMenu";
import GradientText from "@/components/GradientText";
import FileUpload from "@/components/FileUpload";

export default function CertificationPage() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(
    null
  );

  const handleLogoUpload = (file: File) => {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBackgroundUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBackgroundPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const extractColorsFromLogo = () => {
    // TODO: Implement color extraction from logo
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
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

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto'>
          {/* Left Side - Template Setup */}
          <div className='space-y-8'>
            <div className='bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 p-6'>
              {/* Progress Stepper - placeholder for now */}
              <div className='mb-8'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold'>
                      1
                    </div>
                    <span className='text-sm font-medium'>기본 설정</span>
                  </div>
                  <div className='flex-1 mx-4 h-1 bg-gray-600 rounded'>
                    <div className='h-full bg-green-500 rounded w-1/3'></div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold'>
                      2
                    </div>
                    <span className='text-sm font-medium text-gray-400'>
                      참가자 입력
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className='space-y-6'>
                {/* Logo Upload */}
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    크루 로고
                  </label>
                  {logoPreview ? (
                    <div className='relative'>
                      <img
                        src={logoPreview}
                        alt='Logo preview'
                        className='w-full h-32 object-contain bg-gray-800 rounded-lg'
                      />
                      <button
                        onClick={() => {
                          setLogoFile(null);
                          setLogoPreview(null);
                        }}
                        className='absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600'
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <FileUpload
                      onFileSelect={handleLogoUpload}
                      accept='image/*'
                      maxSize={5}
                    />
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className='block text-sm font-medium mb-2'>
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
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    배경 설정
                  </label>
                  <div className='space-y-4'>
                    {/* Color Picker */}
                    <div>
                      <label className='block text-xs font-medium mb-2 text-gray-400'>
                        배경 색상
                      </label>
                      <div className='flex items-center space-x-4'>
                        <input
                          type='color'
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className='w-12 h-12 rounded-lg border border-white/20 cursor-pointer'
                        />
                        <span className='text-sm text-gray-400'>또는</span>
                        <button
                          onClick={extractColorsFromLogo}
                          disabled={!logoFile}
                          className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                          로고에서 색상 추출
                        </button>
                      </div>
                    </div>

                    {/* Background Image */}
                    <div>
                      <label className='block text-xs font-medium mb-2 text-gray-400'>
                        배경 이미지 (선택사항)
                      </label>
                      {backgroundPreview ? (
                        <div className='relative'>
                          <img
                            src={backgroundPreview}
                            alt='Background preview'
                            className='w-full h-24 object-cover bg-gray-800 rounded-lg'
                          />
                          <button
                            onClick={() => {
                              setBackgroundPreview(null);
                            }}
                            className='absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600'
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <FileUpload
                          onFileSelect={handleBackgroundUpload}
                          accept='image/*'
                          maxSize={10}
                          className=''
                        >
                          <div className='text-gray-500 text-sm py-4'>
                            <p>배경 이미지 업로드 (선택사항)</p>
                          </div>
                        </FileUpload>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex space-x-4 pt-6'>
                  <button className='flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'>
                    초기화
                  </button>
                  <button className='flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                    미리보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Live Preview */}
          <div className='space-y-8'>
            <div className='bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 p-6'>
              {/* <h2 className="text-2xl font-bold mb-6">실시간 미리보기</h2> */}

              {/* Certificate Preview */}
              <div
                className='aspect-[4/3] border border-white/20 rounded-lg p-8 flex flex-col justify-center items-center relative overflow-hidden'
                style={{
                  backgroundColor: backgroundColor,
                  backgroundImage: backgroundPreview
                    ? `url(${backgroundPreview})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {backgroundPreview && (
                  <div className='absolute inset-0 bg-black/40'></div>
                )}

                <div className='text-center space-y-6 relative z-10'>
                  {/* Logo */}
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt='Logo'
                      className='w-16 h-16 object-contain mx-auto'
                    />
                  ) : (
                    <div className='w-16 h-16 bg-gray-600 rounded-full mx-auto'></div>
                  )}

                  {/* Certificate Title */}
                  <div>
                    <h3 className='text-2xl font-bold text-white mb-2'>
                      MARATHON CERTIFICATE
                    </h3>
                    <p className='text-gray-200 text-sm'>
                      {description || "크루 소개글이 여기에 표시됩니다"}
                    </p>
                  </div>

                  {/* Participant Info Placeholder */}
                  <div className='space-y-2 text-center'>
                    <p className='text-lg font-semibold text-white'>참가자명</p>
                    <p className='text-sm text-gray-200'>
                      거리: 00km | 시간: 00:00:00
                    </p>
                    <p className='text-sm text-gray-200'>날짜: YYYY-MM-DD</p>
                  </div>
                </div>
              </div>

              <p className='text-sm text-gray-400 mt-4 text-center'>
                왼쪽에서 설정을 변경하면 실시간으로 반영됩니다
              </p>
            </div>

            {/* Next Step Button */}
            <div className='text-center'>
              <button
                className='px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                disabled
              >
                참여자 기록 입력하기
              </button>
              <p className='text-sm text-gray-400 mt-2'>
                템플릿 설정을 완료하면 활성화됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
