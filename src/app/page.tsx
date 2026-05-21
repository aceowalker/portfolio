"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Intersection Observer hook ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Skills", href: "#skills" },
    { label: "Works", href: "#works" },
    { label: "Profile", href: "#profile" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(184,134,78,0.15)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-xl tracking-widest"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1C1916", fontWeight: 300 }}
        >
          Ayumu Ota
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm tracking-widest transition-colors duration-200"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "#6B6158",
                fontSize: "0.75rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#B8864E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6158")}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
        >
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: "#B8864E",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{ background: "#B8864E", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              background: "#B8864E",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(255,255,255,0.98)", borderTop: "1px solid rgba(184,134,78,0.15)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm tracking-widest"
              style={{ fontFamily: "'DM Mono', monospace", color: "#6B6158" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-6";
  const shown = "opacity-100 translate-y-0";

  const sections = [
    { num: "01", label: "Skills", sub: "スキル・対応内容", href: "#skills" },
    { num: "02", label: "Works", sub: "制作実績", href: "#works" },
    { num: "03", label: "Profile", sub: "経歴・プロフィール", href: "#profile" },
    { num: "04", label: "Contact", sub: "お問い合わせ", href: "#contact" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="max-w-5xl mx-auto px-6 w-full pt-24 pb-16 flex flex-col items-center gap-20">
        {/* Main headline */}
        <div className="flex flex-col items-center gap-6 text-center">
          <p
            className={`${base} ${mounted ? shown : hidden} text-xs tracking-[0.25em] uppercase`}
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#B8864E",
              transitionDelay: "0ms",
            }}
          >
            AI Engineer × Bakery Owner
          </p>

          <h1
            className={`${base} ${mounted ? shown : hidden}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#1C1916",
              letterSpacing: "0.02em",
              transitionDelay: "150ms",
            }}
          >
            現場経営者が
            <br />
            つくるAI
          </h1>

          <p
            className={`${base} ${mounted ? shown : hidden} leading-relaxed`}
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: "0.9rem",
              color: "#6B6158",
              maxWidth: "480px",
              transitionDelay: "300ms",
            }}
          >
            ベーカリー14年の現場知識と生成AI技術を掛け合わせ、
            <br />
            中小企業・個人事業主の業務を本当に使えるAIで自動化します。
          </p>

          <div
            className={`${base} ${mounted ? shown : hidden}`}
            style={{ transitionDelay: "450ms" }}
          >
            <a
              href="#works"
              className="inline-block px-8 py-3 text-sm tracking-widest transition-all duration-300"
              style={{
                fontFamily: "'DM Mono', monospace",
                border: "1px solid #B8864E",
                color: "#B8864E",
                fontSize: "0.75rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#B8864E";
                e.currentTarget.style.color = "#0A0908";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#B8864E";
              }}
            >
              成果物を見る →
            </a>
          </div>
        </div>

        {/* Contents index */}
        <div
          className={`${base} ${mounted ? shown : hidden} w-full`}
          style={{ transitionDelay: "600ms" }}
        >
          <p
            className="text-center text-xs tracking-[0.2em] uppercase mb-6"
            style={{ fontFamily: "'DM Mono', monospace", color: "#B8864E" }}
          >
            — Contents —
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sections.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex flex-col gap-2 p-5 transition-all duration-300"
                style={{
                  background: "white",
                  border: "1px solid rgba(184,134,78,0.2)",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(184,134,78,0.6)";
                  el.style.boxShadow = "0 4px 20px rgba(184,134,78,0.14)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(184,134,78,0.2)";
                  el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#B8864E",
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    color: "#1C1916",
                    letterSpacing: "0.03em",
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize: "0.75rem",
                    color: "#6B6158",
                  }}
                >
                  {s.sub}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

/* ─── Skills ─── */
const skillCards = [
  {
    icon: "🔍",
    title: "RAG システム開発",
    body: "LangChain（Agents・Retrieval）を用いたRAGシステムの設計・構築。業種特化型ナレッジベースの作成と精度チューニングが得意。",
  },
  {
    icon: "⚡",
    title: "AI アプリ開発",
    body: "OpenAI API × Streamlit/Pythonでの業務自動化ツール開発。コスト効率を意識した設計で運用しやすいアプリを提供。",
  },
  {
    icon: "✦",
    title: "LP・コンテンツ生成",
    body: "商品情報からキャッチコピー・LP・商品画像を一括生成。AIを活用したマーケティングコンテンツの自動化。",
  },
  {
    icon: "🛠",
    title: "技術スタック",
    body: "Python / LangChain / Streamlit\nOpenAI API / GPT-4o / gpt-image-1\nNext.js / Vercel / Wix",
  },
  {
    icon: "🏪",
    title: "得意な業種",
    body: "飲食・小売業／中小企業・個人事業主\n「現場の課題」を知っているからこそ\n本当に使えるものが作れる。",
  },
  {
    icon: "📋",
    title: "対応可能な依頼",
    body: "・RAGチャットボット構築\n・業務自動化ツール開発\n・LP・コピー自動生成ツール\n・既存システムへのAI組み込み",
  },
];

function SkillCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="p-6 flex flex-col gap-4 transition-all duration-300 cursor-default"
      style={{
        background: "white",
        border: hovered ? "1px solid rgba(184,134,78,0.6)" : "1px solid rgba(184,134,78,0.15)",
        borderRadius: "4px",
        boxShadow: hovered ? "0 4px 24px rgba(184,134,78,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-2xl">{icon}</span>
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.25rem",
          fontWeight: 400,
          color: "#1C1916",
          letterSpacing: "0.03em",
        }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed whitespace-pre-line"
        style={{ color: "#6B6158" }}
      >
        {body}
      </p>
    </div>
  );
}

function Skills() {
  const ref = useFadeIn();

  return (
    <section id="skills" style={{ background: "transparent" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div ref={ref} className="fade-in flex flex-col gap-12">
          <h2 className="section-heading">
            Ski<span>lls</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCards.map((c) => (
              <SkillCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </div>
      <div className="gold-divider" />
    </section>
  );
}

/* ─── Works ─── */
function WorkCard1() {
  const ref = useFadeIn();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="fade-in transition-all duration-300"
      style={{
        background: "white",
        border: "1px solid rgba(184,134,78,0.15)",
        borderRadius: "4px",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 8px 32px rgba(184,134,78,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
          <Image
            src="/bakery_chatbot_screen.jpg"
            alt="ベーカリー特化型RAGチャットボット"
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="p-8 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {["RAG", "Chatbot", "実運用中"].map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 tracking-widest"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  background: "rgba(184,134,78,0.08)",
                  border: "1px solid rgba(184,134,78,0.3)",
                  color: "#B8864E",
                  borderRadius: "2px",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.6rem",
              fontWeight: 400,
              color: "#1C1916",
            }}
          >
            ベーカリー専用 AI チャットボット
          </h3>

          <p className="text-sm leading-relaxed" style={{ color: "#6B6158" }}>
            自店のメニュー・アレルゲン・店舗情報をナレッジ化し、顧客からの問い合わせに24時間自動回答するRAGシステム。自社HPに実装し、現在稼働中。
          </p>

          <div className="flex flex-col gap-2 text-sm" style={{ color: "#4A4440" }}>
            <p>
              <span style={{ color: "#B8864E" }}>Before: </span>
              電話・SNSでの問い合わせ対応に時間・スタッフ不在時の対応遅延・繰り返し対応の非効率
            </p>
            <p>
              <span style={{ color: "#B8864E" }}>Solution: </span>
              RAG化で24時間自動対応・自社HPに直接埋め込み
            </p>
          </div>

          <p
            className="text-xs"
            style={{ fontFamily: "'DM Mono', monospace", color: "#6B6158" }}
          >
            Python / LangChain / OpenAI API / Streamlit / Wix
          </p>

          <a
            href="https://www.bakerydemain.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-6 py-2.5 text-xs tracking-widest transition-all duration-300 self-start"
            style={{
              fontFamily: "'DM Mono', monospace",
              border: "1px solid #B8864E",
              color: "#B8864E",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B8864E";
              e.currentTarget.style.color = "#0A0908";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#B8864E";
            }}
          >
            自社HPで動作を確認する →
          </a>
        </div>
      </div>
    </div>
  );
}

function WorkCard2() {
  const ref = useFadeIn();
  const [hovered, setHovered] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const screenshots = [
    { src: "/bakery_adviser_001.jpg", alt: "機能一覧",    zoomable: true },
    { src: "/bakery_adviser_02.jpg",  alt: "メイン画面",   zoomable: true },
    { src: "/bakery_adviser_03.jpg",  alt: "AIアドバイス例", zoomable: true },
  ];

  return (
    <>
      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }}
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="拡大表示"
              width={1400}
              height={900}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                display: "block",
                borderRadius: "4px",
              }}
            />
            <button
              onClick={() => setLightboxSrc(null)}
              style={{
                position: "absolute",
                top: "-14px",
                right: "-14px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#B8864E",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
        </div>
      )}

    <div
      ref={ref}
      className="fade-in transition-all duration-300"
      style={{
        background: "white",
        border: "1px solid rgba(184,134,78,0.15)",
        borderRadius: "4px",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 8px 32px rgba(184,134,78,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Full-width video */}
      <div className="overflow-hidden" style={{ borderRadius: "4px 4px 0 0" }}>
        <video
          src="/bakery_rag_video.mp4"
          controls
          muted
          playsInline
          className="w-full"
          style={{ display: "block", maxHeight: "70vh", background: "#F0EAE0" }}
          onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).playbackRate = 2; }}
        />
      </div>

      {/* Screenshot gallery */}
      <div
        className="grid grid-cols-3 gap-0"
        style={{ borderTop: "1px solid rgba(184,134,78,0.1)" }}
      >
        {screenshots.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{
              height: "220px",
              background: "#F8F5F0",
              borderRight: i < 2 ? "1px solid rgba(184,134,78,0.1)" : "none",
              cursor: img.zoomable ? "zoom-in" : "default",
            }}
            onClick={() => img.zoomable && setLightboxSrc(img.src)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: "contain", objectPosition: "center top" }}
            />
            {img.zoomable && (
              <div
                style={{
                  position: "absolute",
                  bottom: "6px",
                  right: "6px",
                  background: "rgba(184,134,78,0.85)",
                  color: "white",
                  fontSize: "0.6rem",
                  padding: "2px 6px",
                  borderRadius: "2px",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.05em",
                  pointerEvents: "none",
                }}
              >
                クリックで拡大
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Text */}
      <div className="p-8 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {["RAG", "Business Intelligence", "コンサルティング"].map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 tracking-widest"
              style={{
                fontFamily: "'DM Mono', monospace",
                background: "rgba(184,134,78,0.08)",
                border: "1px solid rgba(184,134,78,0.3)",
                color: "#B8864E",
                borderRadius: "2px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.6rem",
            fontWeight: 400,
            color: "#1C1916",
          }}
        >
          パン屋の売上分析を自動化する
          <br />
          AI コンサルティングツール
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: "#6B6158" }}>
          売上データをアップロードするだけで、AIが商品分析・改善提案を行うWEBアプリ。現場の意思決定をデータドリブンに変えることを目的に開発。
        </p>

        <div className="flex flex-col gap-2 text-sm" style={{ color: "#4A4440" }}>
          <p>
            <span style={{ color: "#B8864E" }}>主な機能: </span>
            CSVデータ読み込み・ABC分析・AIによる改善提案・チャット形式での相談
          </p>
          <p>
            <span style={{ color: "#B8864E" }}>成果: </span>
            売上分析の時間を大幅に削減・データに基づく意思決定が可能に
          </p>
        </div>

        <p
          className="text-xs"
          style={{ fontFamily: "'DM Mono', monospace", color: "#6B6158" }}
        >
          Python / Streamlit / OpenAI API（GPT-4o）/ RAG構成
        </p>
      </div>
    </div>
    </>
  );
}

function WorkCard3() {
  const ref = useFadeIn();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="fade-in transition-all duration-300"
      style={{
        background: "white",
        border: "1px solid rgba(184,134,78,0.15)",
        borderRadius: "4px",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 8px 32px rgba(184,134,78,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* iframe */}
      <div className="overflow-hidden" style={{ borderRadius: "4px 4px 0 0", position: "relative" }}>
        <iframe
          src="https://lp-generator-rkatetxhs6qghvbffmqfgn.streamlit.app/?embedded=true"
          width="100%"
          height="1000px"
          style={{ border: "none", display: "block" }}
          title="LP生成ツール デモ"
          allow="clipboard-write; clipboard-read"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        />
        <div className="absolute top-3 right-3">
          <a
            href="https://lp-generator-rkatetxhs6qghvbffmqfgn.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs tracking-widest transition-all duration-200"
            style={{
              fontFamily: "'DM Mono', monospace",
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(184,134,78,0.5)",
              color: "#B8864E",
              borderRadius: "2px",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B8864E";
              e.currentTarget.style.color = "#0A0908";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.92)";
              e.currentTarget.style.color = "#B8864E";
            }}
          >
            別タブで開く ↗
          </a>
        </div>
      </div>

      {/* Text */}
      <div className="p-8 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {["AI Generation", "LP", "Copywriting", "Image"].map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 tracking-widest"
              style={{
                fontFamily: "'DM Mono', monospace",
                background: "rgba(184,134,78,0.08)",
                border: "1px solid rgba(184,134,78,0.3)",
                color: "#B8864E",
                borderRadius: "2px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.6rem",
            fontWeight: 400,
            color: "#1C1916",
          }}
        >
          商品情報を入力するだけで LP・コピー・画像を
          <br />
          一括生成するツール
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: "#6B6158" }}>
          商品名・特徴・ターゲット・価格を入力するだけで、キャッチコピー・リード文・商品画像・LP HTMLを自動生成するWebアプリ。↑上のフォームで今すぐ試せます。
        </p>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p style={{ color: "#B8864E", marginBottom: "4px" }}>主な機能</p>
            <p style={{ color: "#6B6158" }}>
              キャッチコピー3パターン生成・リード文自動生成・gpt-image-1による商品画像生成・LP HTMLダウンロード
            </p>
          </div>
          <div>
            <p style={{ color: "#B8864E", marginBottom: "4px" }}>技術スタック</p>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "#6B6158",
                fontSize: "0.75rem",
              }}
            >
              Python / Streamlit / OpenAI API（GPT-4o-mini・gpt-image-1）
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Works() {
  const ref = useFadeIn();

  return (
    <section id="works" style={{ background: "transparent" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col gap-16">
          <div ref={ref} className="fade-in">
            <h2 className="section-heading">
              Wor<span>ks</span>
            </h2>
          </div>
          <WorkCard1 />
          <WorkCard2 />
          <WorkCard3 />
        </div>
      </div>
      <div className="gold-divider" />
    </section>
  );
}

/* ─── About ─── */
function About() {
  const ref = useFadeIn();

  return (
    <section id="profile" style={{ background: "transparent" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div ref={ref} className="fade-in flex flex-col gap-12">
          <h2 className="section-heading">
            Pro<span>file</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Text */}
            <div className="flex flex-col gap-6">
              <div
                className="flex flex-col gap-4 leading-relaxed"
                style={{ fontSize: "0.95rem" }}
              >
                <p style={{ color: "#1C1916" }}>
                  岐阜県岐阜市で石窯パン工房Demainを2012年より経営。
                </p>
                <p style={{ color: "#4A4440" }}>
                  現場経営者として
                  「現場で本当に使えるAIツール」を自分の手で作ることを決意。
                </p>
                <p style={{ color: "#4A4440" }}>
                  DMM生成AIエンジニアコース及びRootAIスクールでAIについて学び、
                  RAGシステム・LP制作・画像生成・業務自動化ツールをメインに
                  AIフリーランスとして活動開始。
                </p>
                <p
                  className="pt-2 text-sm tracking-wide"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: "#B8864E",
                    borderLeft: "2px solid #B8864E",
                    paddingLeft: "1rem",
                  }}
                >
                  「技術と現場の両方を知っている」ことが最大の強みです。
                </p>
              </div>
            </div>

            {/* Photo + Badge */}
            <div className="flex flex-col items-center gap-6">
              {/* Profile Photo */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: "min(260px, 80vw)",
                  aspectRatio: "3/4",
                  borderRadius: "4px",
                }}
              >
                <Image
                  src="/portfolio_profile.png"
                  alt="Ayumu Ota"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Badge */}
              <a
                href="https://www.openbadge-global.com/ns/portal/openbadge/public/assertions/unAcquired/anMvM3NKUnBWTkl3NmttWWdNdkcvdz09"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block transition-all duration-300"
                style={{ width: "min(180px, 60vw)" }}
              >
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ borderRadius: "8px", border: "1px solid rgba(184,134,78,0.2)" }}
                >
                  <Image
                    src="/openbadge.jpg"
                    alt="DMM 生成AIエンジニアスクール修了バッジ"
                    width={180}
                    height={180}
                    className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                    style={{ boxShadow: "0 0 30px rgba(184,134,78,0.3)" }}
                  />
                </div>
              </a>
              <p
                className="text-center text-sm"
                style={{ fontFamily: "'Noto Sans JP', sans-serif", color: "#6B6158" }}
              >
                DMM 生成AIエンジニアスクール修了
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="gold-divider" />
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const ref = useFadeIn();

  return (
    <section id="contact" style={{ background: "transparent" }}>
      <div className="max-w-2xl mx-auto px-6 py-24 md:py-32 text-center">
        <div ref={ref} className="fade-in flex flex-col gap-8 items-center">
          <h2 className="section-heading">
            Con<span>tact</span>
          </h2>

          <div
            className="w-full flex flex-col gap-6 items-center p-10"
            style={{
              background: "white",
              border: "1px solid rgba(184,134,78,0.2)",
              borderRadius: "4px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <p className="leading-relaxed" style={{ color: "#4A4440" }}>
              RAGシステム・業務自動化ツール・LP生成ツールの
              <br />
              開発依頼・ご相談はお気軽にどうぞ。
            </p>

            <p
              className="text-sm tracking-widest"
              style={{ fontFamily: "'DM Mono', monospace", color: "#B8864E" }}
            >
              初回相談は無料です。
            </p>

            <a
              href="mailto:ace.o.walker@gmail.com"
              className="inline-flex flex-col items-center gap-1.5 px-10 py-4 tracking-widest transition-all duration-300"
              style={{
                fontFamily: "'DM Mono', monospace",
                border: "1px solid #B8864E",
                color: "#B8864E",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#B8864E";
                e.currentTarget.style.color = "#0A0908";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#B8864E";
              }}
            >
              <span className="text-sm">お問い合わせはこちら →</span>
              <span style={{ fontSize: "0.7rem", opacity: 0.75 }}>ace.o.walker@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background: "#F0EAE0", borderTop: "1px solid rgba(184,134,78,0.2)" }}>
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-xs"
          style={{ fontFamily: "'DM Mono', monospace", color: "#6B6158" }}
        >
          © 2025 Ayumu Ota. All rights reserved.
        </p>

        <a
          href="https://github.com/aceowalker"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200"
          style={{ color: "#6B6158" }}
          aria-label="GitHub"
          onMouseEnter={(e) => (e.currentTarget.style.color = "#B8864E")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6158")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Works />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
