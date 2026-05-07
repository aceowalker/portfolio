import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayumu Ota | AI Engineer × Bakery Owner",
  description:
    "ベーカリー12年の現場知識と生成AI技術を掛け合わせ、中小企業・個人事業主の業務を本当に使えるAIで自動化します。",
  openGraph: {
    title: "Ayumu Ota | AI Engineer × Bakery Owner",
    description:
      "RAGシステム・業務自動化ツール・LP生成ツールの開発依頼・ご相談はお気軽にどうぞ。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Noto+Sans+JP:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
