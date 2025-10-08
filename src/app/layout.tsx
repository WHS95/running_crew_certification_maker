import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Run House Club - 마라톤 기록증 제작 서비스",
  description:
    "러닝 크루를 위한 맞춤형 마라톤 기록증 제작 서비스. 로고, 색상, 배경을 자유롭게 설정하여 크루만의 특별한 기록증을 만들어보세요. CSV 파일로 대량 처리 가능.",
  keywords: [
    "마라톤",
    "기록증",
    "러닝크루",
    "런하우스클럽",
    "Run House Club",
    "마라톤대회",
    "기록증제작",
    "러닝",
    "달리기",
  ],
  authors: [{ name: "Run House Club" }],
  creator: "Run House Club",
  publisher: "Run House Club",
  metadataBase: new URL("https://running-crew-certification-maker.vercel.app"),

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://running-crew-certification-maker.vercel.app",
    siteName: "Run House Club Certification",
    title: "Run House Club - 마라톤 기록증 제작 서비스",
    description:
      "러닝 크루를 위한 맞춤형 마라톤 기록증 제작 서비스. 로고, 색상, 배경을 자유롭게 설정하여 크루만의 특별한 기록증을 만들어보세요.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Run House Club - 마라톤 기록증 제작",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Run House Club - 마라톤 기록증 제작 서비스",
    description: "러닝 크루를 위한 맞춤형 마라톤 기록증 제작 서비스",
    images: ["/og-image.png"],
    creator: "@runhouseclub",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "Fh98xLvkEPY1FDAqNCxWhdjDlQjprcdWLkpwwH6rZNU", // Google Search Console에서 발급받은 코드로 교체
    // yandex: "yandex-verification-code",
    // other: "other-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <link rel='icon' href='/logo.png' />
        <link rel='apple-touch-icon' href='/logo.png' />
        <meta name='theme-color' content='#000000' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
