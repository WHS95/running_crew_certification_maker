"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import SplitText from "@/components/SplitText";
import PrismaticBurst from "@/components/PrismaticBurst";
import ScrollFloat from "@/components/ScrollFloat";
import StaggerdMenu from "@/components/StaggerdMenu";

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
      <PrismaticBurst />
      <StaggerdMenu />

      <section className='min-h-screen flex items-center justify-center relative z-10 scroll-section'>
        <div className='text-center'>
          <ScrollFloat speed={0.2}>
            <SplitText
              text='OUR RUNNING MARATHON'
              className='text-6xl md:text-8xl font-bold mb-8'
              delay={0.5}
            />
          </ScrollFloat>
          <ScrollFloat speed={0.1}>
            <p className='text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed'>
              Made by RunHouse Club
            </p>
          </ScrollFloat>
        </div>
      </section>

      <section className='min-h-screen flex items-center justify-center relative z-10 scroll-section'>
        <ScrollFloat speed={0.3}>
          <div className='text-center max-w-4xl mx-auto px-8'>
            <h2 className='text-4xl md:text-6xl font-bold mb-8'>
              Create Beautiful
              <br />
              Marathon Certificates
            </h2>
            <p className='text-lg md:text-xl text-gray-400 mb-12'>
              러닝크루 자체 마라톤 기록증을 정식 마라톤 대회처럼 멋있게
              만들어보세요
            </p>
            <button className='bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors'>
              시작하기
            </button>
          </div>
        </ScrollFloat>
      </section>

      <section className='min-h-screen flex items-center justify-center relative z-10 scroll-section'>
        <ScrollFloat speed={0.4}>
          <div className='text-center max-w-4xl mx-auto px-8'>
            <h2 className='text-4xl md:text-6xl font-bold mb-8'>
              Simple & Powerful
            </h2>
            <div className='grid md:grid-cols-3 gap-8 mt-16'>
              <div className='p-6 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm'>
                <div className='text-4xl mb-4'>🎨</div>
                <h3 className='text-xl font-bold mb-3'>커스텀 디자인</h3>
                <p className='text-gray-400'>
                  로고, 색상, 배경을 자유롭게 설정하여 크루만의 기록증을
                  만드세요
                </p>
              </div>
              <div className='p-6 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm'>
                <h3 className='text-xl font-bold mb-3'>대량 처리</h3>
                <p className='text-gray-400'>
                  CSV 파일로 여러 참가자의 기록을 한번에 입력하고 관리하세요
                </p>
              </div>
              <div className='p-6 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm'>
                <div className='text-4xl mb-4'>📱</div>
                <h3 className='text-xl font-bold mb-3'>쉬운 공유</h3>
                <p className='text-gray-400'>
                  카카오톡 공유와 이미지 다운로드로 간편하게 배포하세요
                </p>
              </div>
            </div>
          </div>
        </ScrollFloat>
      </section>
    </div>
  );
}
