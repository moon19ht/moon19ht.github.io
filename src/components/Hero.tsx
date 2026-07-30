import { useState } from 'react';
import {
  ArrowUpRight,
  List,
  X,
} from '@phosphor-icons/react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Profile } from '../content/profile';

type HeroProps = {
  profile: Profile;
  activeSection: string;
};

const navItems = [
  { label: 'Signals', href: '#signals' },
  { label: 'Projects', href: '#projects' },
  { label: 'Toolchain', href: '#toolchain' },
  { label: 'Rhythm', href: '#rhythm' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Hero({ profile, activeSection }: HeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const artworkX = useTransform(scrollYProgress, [0, 0.2], ['0%', '3%']);
  const artworkOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.58]);
  const [koreanStatement, englishStatement] = profile.statement.split('. ');

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <a className="skip-link" href="#signals">
        Skip to content
      </a>

      <nav className="site-nav" aria-label="Primary">
        <a className="site-nav__brand" href="#top">
          {profile.name}
        </a>

        <button
          className="site-nav__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>

        <div
          className={menuOpen ? 'site-nav__links is-open' : 'site-nav__links'}
          id="primary-navigation"
        >
          {navItems.map((item) => (
            <a
              className={
                item.href === `#${activeSection}` || (activeSection === 'top' && item.href === '#signals')
                  ? 'is-active'
                  : undefined
              }
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="hero__grid">
        <motion.div
          className="hero__copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero__tagline">
            Builds in <span>motion</span>
          </p>
          <p className="hero__statement">
            <strong>{koreanStatement}.</strong>
            <span>{englishStatement}</span>
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href={profile.cta.href}>
              {profile.cta.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="button button--ghost" href={profile.secondaryCta.href}>
              {profile.secondaryCta.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.figure
          className="hero__artwork"
          style={shouldReduceMotion ? undefined : { x: artworkX, opacity: artworkOpacity }}
        >
          <img
            src="/media/hero-command-center.webp"
            alt="MOON19HT typographic motion artwork"
            width="1672"
            height="941"
          />
          <figcaption className="hero__meta" aria-label="Portfolio metadata">
            <span>{profile.location}</span>
            <i aria-hidden="true">/</i>
            <span>Remotion render / static deploy</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
