"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollFloat from "@/components/ScrollFloat";
import StaggerdMenu from "@/components/StaggerdMenu";
import DarkVeil from "@/components/DarkVeil";
import GradientText from "@/components/GradientText";
import SpotlightCard from "@/components/SpotlightCard";
import DecryptedText from "@/components/DecryptedText";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".scroll-section");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
          const progress =
            (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height);
          gsap.to(section, {
            opacity: Math.max(0.3, 1 - progress * 0.7),
            scale: Math.max(0.8, 1 - progress * 0.2),
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-black text-white relative overflow-x-hidden'>
      <div
        style={{
          width: "100%",
          height: "1200px",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <DarkVeil />
      </div>
      <StaggerdMenu />

      <section className='min-h-screen flex items-center justify-center relative z-10 scroll-section'>
        <div className='text-center'>
          <ScrollFloat speed={0.2}>
            <div className='text-6xl md:text-8xl font-bold mb-8 block'>
              <DecryptedText
                text='RUNNING CREW MARATHON CERTIFICATION'
                speed={30}
                maxIterations={15}
                characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
                animateOn='view'
                revealDirection='center'
                className='block mb-4'
              />
            </div>
          </ScrollFloat>
          <ScrollFloat speed={0.2}>
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
            >
              Made by RunHouseClub
            </GradientText>
          </ScrollFloat>
        </div>
      </section>

      <section className='min-h-screen flex items-center justify-center relative z-10 scroll-section mb-80'>
        <ScrollFloat speed={0.3}>
          <div className='text-center max-w-4xl mx-auto px-8 mb-4'>
            <h2 className='text-4xl md:text-6xl font-bold mb-8'>
              Create Beautiful Marathon Certificates
            </h2>

            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
            >
              자체 마라톤 기록을 정식 마라톤 대회 기록증처럼 만들어보세요
            </GradientText>
          </div>
          <div className='text-center max-w-4xl mx-auto px-8'></div>
          <ScrollFloat speed={0.1}>
            <div className='grid md:grid-cols-3 gap-8 mt-16'>
              <SpotlightCard
                className='p-6 h-80'
                spotlightColor='rgba(64, 255, 170, 0.15)'
                spotlightSize={250}
              >
                <div className='text-center h-full flex flex-col justify-center'>
                  <h3 className='text-xl font-bold mb-3 text-white'>
                    커스텀 디자인
                  </h3>
                  <p className='text-gray-300 text-sm'>
                    로고, 색상, 배경을 자유롭게 설정하여 크루만의 기록증을
                    만드세요
                  </p>
                </div>
              </SpotlightCard>

              <SpotlightCard
                className='p-6 h-80'
                spotlightColor='rgba(64, 121, 255, 0.15)'
                spotlightSize={250}
              >
                <div className='text-center h-full flex flex-col justify-center'>
                  <h3 className='text-xl font-bold mb-3 text-white'>
                    대량 처리
                  </h3>
                  <p className='text-gray-300 text-sm'>
                    CSV 파일로 여러 참가자의 기록을 한번에 입력하고 관리하세요
                  </p>
                </div>
              </SpotlightCard>

              <SpotlightCard
                className='p-6 h-80'
                spotlightColor='rgba(255, 100, 255, 0.15)'
                spotlightSize={250}
              >
                <div className='text-center h-full flex flex-col justify-center'>
                  <h3 className='text-xl font-bold mb-3 text-white'>
                    쉬운 공유
                  </h3>
                  <p className='text-white/30 text-sm'>
                    카카오톡 공유와 이미지 다운로드로 간편하게 배포하세요
                  </p>
                </div>
              </SpotlightCard>
            </div>

            <div className='text-center max-w-4xl mx-auto px-8'>
              <div className='mt-16 mb-16'>
                <button className='bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors'>
                  시작하기
                </button>
              </div>
            </div>
          </ScrollFloat>
        </ScrollFloat>
      </section>
    </div>
  );
}
