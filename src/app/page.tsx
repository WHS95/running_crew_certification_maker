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
import JsonLd from "@/components/JsonLd";

export default function Home() {
  // SEO를 위한 동적 메타 태그 추가
  useEffect(() => {
    document.title = "Run House Club - 마라톤 기록증 제작 서비스";
  }, []);
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
          // Make the top-most section fully opaque, then gently fade/scale as it scrolls up
          const topProgress = Math.min(
            1,
            Math.max(0, -rect.top / (window.innerHeight * 0.8))
          );

          gsap.to(section, {
            opacity: 1 - topProgress * 0.2, // 1.0 at top, down to 0.8
            scale: 1 - topProgress * 0.08, // subtle scale down
            y: -topProgress * 30,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Run House Club",
    description: "러닝 크루를 위한 맞춤형 마라톤 기록증 제작 서비스",
    url: typeof window !== "undefined" ? window.location.origin : "",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    creator: {
      "@type": "Organization",
      name: "Run House Club",
    },
    featureList: ["커스텀 디자인", "대량 처리", "쉬운 공유"],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
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
                  colors={[
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                  ]}
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
                    router.push("/certification");
                  }}
                >
                  시작하기
                </button>
              </div>
            </ScrollFloat>
          </div>
        </section>

        <section className='min-h-screen flex items-center justify-center relative z-10 scroll-section'>
          <div className='text-center px-4 sm:px-6 md:px-8'>
            <ScrollFloat speed={0.1}>
              <div className='font-bold mb-8 block'>
                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8'>
                  Marathon Certification
                </h2>

                <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
                  <GradientText
                    colors={[
                      "#40ffaa",
                      "#4079ff",
                      "#40ffaa",
                      "#4079ff",
                      "#40ffaa",
                    ]}
                    animationSpeed={3}
                    showBorder={false}
                  >
                    우리 크루 만의 마라톤 대회 기록증 제작
                  </GradientText>
                </div>
              </div>
              <div className='grid md:grid-cols-3 gap-6 md:gap-8 mt-16 scroll-animate px-4 md:px-0'>
                <SpotlightCard
                  className='p-4 sm:p-6 md:p-8 h-48 sm:h-48 md:h-48'
                  spotlightColor='rgba(64, 255, 170, 0.15)'
                  spotlightSize={250}
                >
                  <div className='text-center h-full flex flex-col justify-center'>
                    <h3 className='text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg'>
                      커스텀 디자인
                    </h3>
                    <p className='text-white text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md font-medium'>
                      로고, 색상, 배경을 자유롭게 설정하여 크루만의 기록증을
                      만드세요
                    </p>
                  </div>
                </SpotlightCard>

                <SpotlightCard
                  className='p-4 sm:p-6 md:p-8 h-48 sm:h-48 md:h-48'
                  spotlightColor='rgba(64, 121, 255, 0.15)'
                  spotlightSize={250}
                >
                  <div className='text-center h-full flex flex-col justify-center'>
                    <h3 className='text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg'>
                      대량 처리
                    </h3>
                    <p className='text-white text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md font-medium'>
                      CSV 파일로 여러 참가자의 기록을 한번에 입력하고 관리하세요
                    </p>
                  </div>
                </SpotlightCard>

                <SpotlightCard
                  className='p-4 sm:p-6 md:p-8 h-48 sm:h-48 md:h-48'
                  spotlightColor='rgba(255, 100, 255, 0.15)'
                  spotlightSize={250}
                >
                  <div className='text-center h-full flex flex-col justify-center'>
                    <h3 className='text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg'>
                      쉬운 생성
                    </h3>
                    <p className='text-white text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md font-medium'>
                      전체 이미지 다운로드로 간편하게 전달 해보세요
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
    </>
  );
}
