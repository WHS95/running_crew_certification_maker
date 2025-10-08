"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MenuItem {
  label: string;
  href: string;
  icon?: string;
}

const menuItems: MenuItem[] = [
  { label: "HOME", href: "/", icon: "" },
  { label: "CREATE", href: "/certification", icon: "" },
  { label: "CONTACT", href: "https://open.kakao.com/me/runhouse", icon: "" },
];

export default function StaggerdMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    const items = itemsRef.current;
    const overlay = overlayRef.current;

    if (isOpen) {
      gsap.set(items, { x: 100, opacity: 0 });
      gsap.set(overlay, { opacity: 0 });

      const tl = gsap.timeline();

      tl.to(overlay, {
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      }).to(
        items,
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.1"
      );
    } else {
      const tl = gsap.timeline();

      tl.to(items, {
        x: 100,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      }).to(
        overlay,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      );
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors'
      >
        <div className='relative w-5 h-5 sm:w-6 sm:h-6'>
          <span
            className={`absolute top-1 left-0 w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 sm:top-3 top-2" : ""
            }`}
          />
          <span
            className={`absolute sm:top-3 top-2 left-0 w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute sm:top-5 top-3 left-0 w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 sm:top-3 top-2" : ""
            }`}
          />
        </div>
      </button>

      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black z-40 pointer-events-none ${
          isOpen ? "pointer-events-auto" : ""
        }`}
        onClick={() => setIsOpen(false)}
      />

      <nav
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 md:w-80 z-40 transform transition-transform duration-500 ease-out ${
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none"
        }`}
      >
        <div className='h-full bg-black/80 backdrop-blur-lg border-l border-white/20'>
          <div className='pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8'>
            <div className='mb-6 sm:mb-8'>
              <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2'>
                OUR RUNNING
              </h2>
              <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white'>
                MARATHON
              </h2>
            </div>

            <ul className='space-y-2 sm:space-y-3 md:space-y-4'>
              {menuItems.map((item, index) => (
                <li key={item.href}>
                  <div
                    ref={(el) => {
                      if (el) itemsRef.current[index] = el;
                    }}
                    className='group'
                  >
                    <a
                      href={item.href}
                      className='flex items-center space-x-3 sm:space-x-4 text-white hover:text-gray-300 transition-colors text-base sm:text-lg py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-white/10'
                      onClick={() => setIsOpen(false)}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <span className='text-lg sm:text-xl md:text-2xl'>
                        {item.icon}
                      </span>
                      <span className='font-medium'>{item.label}</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
