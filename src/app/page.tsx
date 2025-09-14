"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import ScrollFloat from "@/components/ScrollFloat";
import StaggerdMenu from "@/components/StaggerdMenu";
import DarkVeil from "@/components/DarkVeil";
import GradientText from "@/components/GradientText";
import SpotlightCard from "@/components/SpotlightCard";
import DecryptedText from "@/components/DecryptedText";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".scroll-section");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInView =
          rect.top < window.innerHeight * 1.2 &&
          rect.bottom > -window.innerHeight * 0.2;

        if (isInView) {
          const progress = Math.max(
            0,
            Math.min(
              1,
              (window.innerHeight - rect.top) /
                (window.innerHeight + rect.height * 0.5)
            )
          );

          gsap.to(section, {
            opacity: Math.max(0.4, 1 - progress * 0.6),
            scale: Math.max(0.85, 1 - progress * 0.15),
            y: progress * -50,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(section, {
            opacity: 0.3,
            scale: 0.85,
            y: rect.top < 0 ? -50 : 50,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      // 개별 요소들 애니메이션
      const animatedElements = document.querySelectorAll(".scroll-animate");
      animatedElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isInView =
          rect.top < window.innerHeight * 0.9 &&
          rect.bottom > window.innerHeight * 0.1;

        if (isInView) {
          const progress =
            (window.innerHeight * 0.9 - rect.top) / (window.innerHeight * 0.8);
          gsap.to(element, {
            opacity: Math.max(0.7, 1 - Math.abs(progress - 0.5) * 0.6),
            scale: Math.max(0.9, 1 - Math.abs(progress - 0.5) * 0.2),
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    };

    handleScroll(); // 초기 실행
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
        <div className='text-center px-4 sm:px-6 md:px-8'>
          <ScrollFloat speed={0.1}>
            <div className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 block'>
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
              >
                RUN HOUSE CLUB
              </GradientText>

              <DecryptedText
                text='RUNNING CREW MARATHON CERTIFICATION'
                speed={30}
                maxIterations={15}
                characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
                animateOn='view'
                revealDirection='center'
                className='block mb-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
              />
            </div>
          </ScrollFloat>
          <ScrollFloat speed={0.2}>
            {/* <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
            >
              Made by RunHouseClub
            </GradientText> */}

            <div className='mt-16 mb-16'>
              <button
                className='bg-white text-black px-8 sm:px-12 md:px-16 lg:px-24 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold'
                onClick={() => {
                  router.push("/create");
                }}
              >
                시작하기
              </button>
            </div>
          </ScrollFloat>
        </div>
      </section>

      <section className='min-h-screen flex items-center justify-center relative z-10 scroll-section mb-80'>
        <div className='text-center px-4 sm:px-6 md:px-8'>
          <ScrollFloat speed={0.1}>
            <div className='font-bold mb-8 block'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8'>
                Marathon Certification
              </h2>

              <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={3}
                  showBorder={false}
                >
                  우리 크루 만의 마라톤 대회 기록증 제작
                </GradientText>
              </div>
            </div>
            <div className='grid md:grid-cols-3 gap-8 mt-16 scroll-animate'>
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

            {/* <div className='text-center max-w-4xl mx-auto px-8 scroll-animate'>
            <div className='mt-16 mb-16'>
              <button className='bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors'>
                시작하기
              </button>
            </div>
          </div> */}
          </ScrollFloat>
        </div>
      </section>
    </div>
  );
}
