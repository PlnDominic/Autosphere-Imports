'use client';

import { useEffect, useState } from 'react';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    function updateHeader() {
      setScrolled((window.scrollY || document.documentElement.scrollTop) > 40);
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
  }, [navOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setNavOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const headerClass = [
    scrolled ? 'scrolled' : '',
    navOpen ? 'nav-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header id="site-header" className={headerClass || undefined}>
      <a href="#inventory" className="header-logo">
        <span className="header-logo-name">AUTOSPHERE</span>
        <span className="header-logo-tag">IMPORTS &middot; DRIVING THE WORLD TO YOU</span>
      </a>
      <button
        className="hamburger"
        id="nav-toggle"
        aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={navOpen}
        aria-controls="main-nav"
        onClick={() => setNavOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className="header-nav" id="main-nav">
        <a href="#inventory" onClick={() => setNavOpen(false)}>
          Inventory
        </a>
        <a href="#how" onClick={() => setNavOpen(false)}>
          How it works
        </a>
        <a href="#pricing" onClick={() => setNavOpen(false)}>
          Pricing
        </a>
        <a href="#contact" onClick={() => setNavOpen(false)}>
          Contact
        </a>
        <a
          href="https://wa.me/233537633242"
          target="_blank"
          rel="noopener"
          className="header-cta"
          onClick={() => setNavOpen(false)}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.76.46 3.45 1.34 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.08c-.25.69-1.45 1.32-1.99 1.36-.51.04-1.16.21-3.78-.79-3.18-1.25-5.2-4.5-5.36-4.71-.16-.21-1.28-1.7-1.28-3.24 0-1.54.81-2.3 1.09-2.61.28-.31.61-.39.81-.39.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.59.85 2.05.93 2.2.07.15.12.32.02.53-.1.21-.15.32-.3.5-.15.18-.31.39-.45.53-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.15.26.1 1.66.78 1.95.93.29.15.48.21.55.33.07.12.07.71-.18 1.4Z" />
          </svg>
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
