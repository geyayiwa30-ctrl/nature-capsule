import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, ArrowLeft, Menu, X } from 'lucide-react';

export default function App() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video always plays silently on loop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {
        const resumePlay = () => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
          window.removeEventListener('click', resumePlay);
        };
        window.addEventListener('click', resumePlay, { once: true });
      });
    }
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#000000] text-white flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-black">
      {/* Video Container: Dedicated Top Frame on Mobile (<768px), Full Background on Desktop (>=768px) */}
      <div
        id="bg-media-viewport"
        className="relative w-full h-[360px] xs:h-[400px] sm:h-[460px] md:h-full md:min-h-0 md:max-h-none md:absolute md:inset-0 z-0 overflow-hidden shrink-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* The Live Video Element directly from ./assets/Background_Terra_Elix.mp4 */}
        <video
          ref={videoRef}
          id="hero-bg-video"
          src="./assets/Background_Terra_Elix.mp4"
          poster="./assets/capsules.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-[70%_center] sm:object-[75%_center] md:object-[68%_center] transition-opacity duration-700"
        />

        {/* Mobile Top Scrim for Crisp Header Legibility */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent md:hidden" />

        {/* Mobile Bottom Smooth Gradient Transition into the Text Section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-b from-transparent via-black/60 to-[#000000] md:hidden" />
      </div>

      {/* Top Navigation Bar (Header) */}
      <header
        id="main-site-header"
        className="absolute top-0 left-0 right-0 z-30 md:relative w-full pl-6 sm:pl-8 md:pl-10 lg:pl-12 pr-6 sm:pr-8 md:pr-10 lg:pr-12 pt-6 sm:pt-8 md:pt-10 flex items-center justify-between"
      >
        {/* 1. Left: Brand Logo */}
        <div className="flex items-center">
          <a
            href="#"
            id="brand-logo"
            className="inline-block text-2xl sm:text-[1.8rem] lg:text-[1.95rem] font-bold text-white tracking-[-0.03em] leading-none select-none transition-transform duration-300 ease-out hover:scale-[1.05] origin-left"
          >
            TerraElix
          </a>
        </div>

        {/* 2. Center: Navigation Links */}
        <nav
          id="header-nav"
          className="hidden md:flex items-center gap-8 lg:gap-12 xl:gap-14 text-[15px] lg:text-[16px] font-normal text-white"
        >
          <a
            href="#about"
            className="inline-block text-white/85 hover:text-white transition-all duration-300 ease-out hover:scale-110 active:scale-95 transform-gpu cursor-pointer select-none"
          >
            About
          </a>
          <a
            href="#products"
            className="inline-block text-white/85 hover:text-white transition-all duration-300 ease-out hover:scale-110 active:scale-95 transform-gpu cursor-pointer select-none"
          >
            Products
          </a>
          <a
            href="#promotions"
            className="inline-block text-white/85 hover:text-white transition-all duration-300 ease-out hover:scale-110 active:scale-95 transform-gpu cursor-pointer select-none"
          >
            Promotions
          </a>
          <a
            href="#contact"
            className="inline-block text-white/85 hover:text-white transition-all duration-300 ease-out hover:scale-110 active:scale-95 transform-gpu cursor-pointer select-none"
          >
            Contact
          </a>
        </nav>

        {/* 3. Right: Utility Icons & Profile */}
        <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6">
          {/* Search Toggle / Input */}
          <div className="relative flex items-center">
            {searchOpen ? (
              <div className="flex items-center bg-black/70 backdrop-blur-md rounded-full px-3 py-1 border border-white/30 transition-all">
                <Search className="w-4 h-4 text-white/70 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-white placeholder-white/50 outline-none w-24 sm:w-36"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setSearchOpen(false);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-white/60 hover:text-white ml-1.5 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                id="btn-header-search"
                onClick={() => setSearchOpen(true)}
                className="text-white hover:text-white/80 transition-opacity p-1 cursor-pointer"
                title="Search"
                aria-label="Search"
              >
                <Search className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[1.6]" />
              </button>
            )}
          </div>

          {/* Cart Icon with badge */}
          <button
            type="button"
            id="btn-header-cart"
            onClick={() => setCartCount((prev) => (prev > 0 ? 0 : 2))}
            className="relative text-white hover:text-white/80 transition-opacity p-1 cursor-pointer"
            title="Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[1.6]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Circle Arrow Left Button */}
          <button
            type="button"
            id="btn-header-back"
            onClick={() => window.history.back()}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/70 flex items-center justify-center text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
            title="Go Back"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
          </button>

          {/* Profile Avatar with Dropdown */}
          <div className="relative">
            <button
              type="button"
              id="btn-header-profile"
              onClick={() => setProfileOpen(!profileOpen)}
              className="relative block rounded-full focus:outline-none focus:ring-2 focus:ring-white/60 transition-transform active:scale-95 cursor-pointer"
              title="User Account"
            >
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&h=160&q=80"
                alt="Profile"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-1 ring-white/60 hover:ring-white transition-all shadow-md"
                referrerPolicy="no-referrer"
              />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div
                id="profile-dropdown-menu"
                className="absolute right-0 mt-2.5 w-48 bg-black/90 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl py-2 z-50 text-xs text-neutral-200"
              >
                <div className="px-3.5 py-2 border-b border-white/10">
                  <p className="font-semibold text-white">Alex Morgan</p>
                  <p className="text-[11px] text-neutral-400 truncate">alex@terraelix.com</p>
                </div>
                <a
                  href="#profile"
                  onClick={() => setProfileOpen(false)}
                  className="block px-3.5 py-2 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                >
                  Account Settings
                </a>
                <a
                  href="#orders"
                  onClick={() => setProfileOpen(false)}
                  className="block px-3.5 py-2 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                >
                  Order History
                </a>
                <div className="my-1 border-t border-white/10" />
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="w-full text-left px-3.5 py-2 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            id="btn-header-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-white/80 p-1 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/15 px-6 py-6 z-40 flex flex-col gap-4 text-base font-medium text-white shadow-2xl"
          >
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block py-1 hover:text-white transition-all duration-200 ease-out hover:translate-x-2"
            >
              About
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block py-1 hover:text-white transition-all duration-200 ease-out hover:translate-x-2"
            >
              Products
            </a>
            <a
              href="#promotions"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block py-1 hover:text-white transition-all duration-200 ease-out hover:translate-x-2"
            >
              Promotions
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block py-1 hover:text-white transition-all duration-200 ease-out hover:translate-x-2"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* Main Hero Container */}
      <main className="relative z-10 w-full pl-6 sm:pl-8 md:pl-10 lg:pl-12 pr-6 sm:pr-8 md:pr-10 lg:pr-12 pt-0 sm:pt-4 md:pt-8 lg:pt-10 pb-12 sm:pb-16 md:pb-20 flex-1 flex flex-col justify-between">
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] md:min-h-[520px] lg:min-h-[580px]">
          
          {/* Left Column: Hero Typography & CTA */}
          <div className="lg:col-span-7 xl:col-span-7 pt-4 sm:pt-6 md:pt-8 lg:pt-10 max-w-4xl z-10">
            {/* Main Massive Headline */}
            <h1
              id="hero-headline"
              className="text-[2.5rem] xs:text-[2.95rem] sm:text-[3.85rem] md:text-[4.75rem] lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-[-0.04em] leading-[0.95] sm:leading-[0.92] text-left select-none"
            >
              <span className="block text-white">
                The Power <span className="text-white/50 font-normal">of</span>
              </span>
              <span className="block text-white/50 font-normal">
                Nature in <span className="text-white font-bold">Every</span>
              </span>
              <span className="inline-flex items-center flex-wrap text-white">
                <span>Capsule</span>
                {/* Rosette Scalloped Quality Badge */}
                <span
                  id="quality-badge"
                  className="inline-flex items-center justify-center ml-2 sm:ml-3 md:ml-4 align-middle transition-transform duration-300 hover:scale-105 shrink-0"
                  title="Verified Natural Formula"
                >
                  <svg
                    viewBox="0 0 44 44"
                    className="w-8 h-8 xs:w-9 xs:h-9 sm:w-[3.3rem] sm:h-[3.3rem] md:w-[4.2rem] md:h-[4.2rem] lg:w-[5.2rem] lg:h-[5.2rem]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Certified seal icon"
                  >
                    <path
                      fill="rgba(255, 255, 255, 0.15)"
                      stroke="rgba(255, 255, 255, 0.35)"
                      strokeWidth="1.2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 2C23.8 2 25.4 3.6 27.1 4.2C28.8 4.7 30.6 4.3 32.2 5.3C33.7 6.2 34.7 7.7 36 9C37.3 10.3 38.8 11.3 39.7 12.8C40.7 14.4 40.3 16.2 40.8 17.9C41.4 19.6 43 21.2 43 23C43 24.8 41.4 26.4 40.8 28.1C40.3 29.8 40.7 31.6 39.7 33.2C38.8 34.7 37.3 35.7 36 37C34.7 38.3 33.7 39.8 32.2 40.7C30.6 41.7 28.8 41.3 27.1 41.8C25.4 42.4 23.8 44 22 44C20.2 44 18.6 42.4 16.9 41.8C15.2 41.3 13.4 41.7 11.8 40.7C10.3 39.8 9.3 38.3 8 37C6.7 35.7 5.2 34.7 4.3 33.2C3.3 31.6 3.7 29.8 3.2 28.1C2.6 26.4 1 24.8 1 23C1 21.2 2.6 19.6 3.2 17.9C3.7 16.2 3.3 14.4 4.3 12.8C5.2 11.3 6.7 10.3 8 9C9.3 7.7 10.3 6.2 11.8 5.3C13.4 4.3 15.2 4.7 16.9 4.2C18.6 3.6 20.2 2 22 2Z"
                    />
                    <path
                      d="M14.5 22.5L19.5 27.5L29.5 16.5"
                      stroke="#ffffff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* CTA & Explanatory Subtext Row */}
            <div
              id="cta-section"
              className="mt-8 sm:mt-12 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-6"
            >
              {/* White Solid Rectangular CTA Button */}
              <a
                id="cta-explore-button"
                href="#explore"
                className="group w-full sm:w-auto inline-flex items-center justify-center bg-white text-black px-8 sm:px-9 py-4 sm:py-4.5 text-base sm:text-[1.05rem] font-semibold tracking-tight transition-all duration-200 hover:bg-neutral-200 active:scale-[0.98]"
              >
                <span>Explore Now</span>
                <span className="ml-2.5 text-lg sm:text-xl transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>

              {/* Clean Paragraph Subtext */}
              <p
                id="hero-subtext"
                className="text-white text-xs sm:text-[14.5px] md:text-[16px] font-light leading-relaxed max-w-xs sm:max-w-sm tracking-normal"
              >
                Discover our new plant-<br className="hidden sm:inline" />
                based supplements for daily<br className="hidden sm:inline" />
                balance and clean energy.
              </p>
            </div>
          </div>

          {/* Right Column / Floating Frosted Cards around the Product Jar */}
          <div className="lg:col-span-5 xl:col-span-5 relative w-full h-full flex flex-col sm:flex-row lg:block items-center justify-center gap-4 sm:gap-6 mt-6 lg:mt-0 z-20">
            
            {/* 1. Top-Left Floating Glass Card ("Start your personalized path") */}
            <div
              id="glass-card-assessment"
              className="w-full max-w-[320px] sm:max-w-[300px] md:max-w-[270px] lg:max-w-[280px] xl:max-w-[300px] lg:absolute lg:top-4 lg:-left-4 xl:left-2 p-5 sm:p-6 rounded-[28px] bg-white/15 backdrop-blur-xl border border-white/25 shadow-[0_16px_36px_rgba(0,0,0,0.35)] text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] select-none"
            >
              <h3 className="text-base sm:text-[1.1rem] font-medium leading-snug tracking-tight text-white">
                Start your<br />personalized path to<br />natural balance
              </h3>
              
              <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between">
                <a
                  href="#assessment"
                  id="link-glass-assessment"
                  className="text-xs sm:text-[13px] font-normal text-white/90 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all"
                >
                  Personal Assessment
                </a>
                <a
                  href="#assessment"
                  aria-label="Start assessment"
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110 active:scale-95 shrink-0"
                >
                  <span className="text-sm font-bold leading-none translate-x-[0.5px] -translate-y-[0.5px]">↗</span>
                </a>
              </div>
            </div>

            {/* 2. Bottom-Right Floating Glass Card ("14K+ Optimized Wellness") */}
            <div
              id="glass-card-community"
              className="w-full max-w-[320px] sm:max-w-[300px] md:max-w-[260px] lg:max-w-[270px] xl:max-w-[290px] lg:absolute lg:bottom-4 lg:right-0 p-5 sm:p-6 rounded-[28px] bg-white/15 backdrop-blur-xl border border-white/25 shadow-[0_16px_36px_rgba(0,0,0,0.35)] text-white transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] select-none"
            >
              {/* Overlapping User Avatars */}
              <div className="flex items-center -space-x-2.5 mb-3.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Community Member 1"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-white/80 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Community Member 2"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-white/80 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Community Member 3"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-white/80 shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Counter Stat */}
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-none">
                14K+
              </div>

              {/* Description Subtext */}
              <p className="mt-2 text-xs sm:text-[13px] text-white/90 font-normal leading-snug">
                People have already optimized their wellness
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* Warm Beige Banner Section (Directly Below Hero) */}
      <section
        id="imbalance-solution-banner"
        className="relative z-20 w-full bg-[#E5E2DC] text-[#111111] py-16 sm:py-20 md:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-t border-[#D5D1C9]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column: Bold Question Headline */}
          <div className="md:col-span-7 lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium sm:font-semibold text-[#111111] tracking-[-0.03em] leading-[1.1] select-none">
              Struggling with Low Energy, Stress, or Imbalance?
            </h2>
          </div>

          {/* Right Column: Natural Formula Statement */}
          <div className="md:col-span-5 lg:col-span-4">
            <p className="text-base sm:text-lg md:text-[1.15rem] text-[#222222] font-normal leading-relaxed tracking-normal">
              TerraElix restores your natural balance using clean, plant-based ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Subtle Footer Bar */}
      <footer className="relative z-20 w-full bg-[#E5E2DC] border-t border-[#D5D1C9]/70 py-6 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
        <p>© {new Date().getFullYear()} TerraElix Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-black transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-black transition-colors">Terms of Service</a>
          <a href="#lab" className="hover:text-black transition-colors">Lab Results</a>
        </div>
      </footer>
    </div>
  );
}
