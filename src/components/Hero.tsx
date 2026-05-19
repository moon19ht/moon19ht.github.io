import { useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Profile } from '../content/profile';

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const videoScale = useTransform(scrollYProgress, [0, 0.32], [1, 1.08]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.46]);
  const showVideo = !shouldReduceMotion && !videoFailed;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <a className="skip-link" href="#signals">
        Skip to content
      </a>

      <motion.div
        className="hero__media"
        style={shouldReduceMotion ? undefined : { scale: videoScale, opacity: videoOpacity }}
      >
        {showVideo ? (
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-still.png"
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
          >
            <source src="/media/hero-reel.webm" type="video/webm" />
            <source src="/media/hero-reel.mp4" type="video/mp4" />
          </video>
        ) : null}
        <div className="hero__fallback" aria-hidden="true" />
      </motion.div>
      <div className="hero__shade" />

      <nav className="site-nav" aria-label="Primary">
        <a className="site-nav__brand" href="#top">
          {profile.name}
        </a>
        <div className="site-nav__links">
          <a href="#signals">Signals</a>
          <a href="#projects">Projects</a>
          <a href="#toolchain">Toolchain</a>
          <a href="#rhythm">Rhythm</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="hero__content" id="top">
        <p className="eyebrow hero__reveal hero__reveal--1">
          {profile.eyebrow}
        </p>
        <h1 id="hero-title" className="hero__reveal hero__reveal--2">
          {profile.name}
        </h1>
        <div className="hero__line" />
        <p className="hero__tagline hero__reveal hero__reveal--3">
          {profile.tagline}
        </p>
        <p className="hero__statement hero__reveal hero__reveal--4">
          {profile.statement}
        </p>
        <div className="hero__actions hero__reveal hero__reveal--5">
          <a className="button button--primary" href={profile.cta.href}>
            {profile.cta.label}
          </a>
          <a className="button button--ghost" href={profile.secondaryCta.href}>
            {profile.secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="hero__meta" aria-label="Portfolio metadata">
        <span>{profile.location}</span>
        <span>Remotion render / static deploy</span>
      </div>
    </section>
  );
}
