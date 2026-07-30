import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';

type PortfolioRailProps = {
  activeSection: string;
};

const railItems = [
  { id: 'top', label: 'Home' },
  { id: 'signals', label: 'Signals' },
  { id: 'projects', label: 'Projects' },
  { id: 'toolchain', label: 'Toolchain' },
  { id: 'rhythm', label: 'Rhythm' },
  { id: 'contact', label: 'Contact' },
] as const;

export function PortfolioRail({ activeSection }: PortfolioRailProps) {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.3,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
    const nextProgress = scrollableDistance <= 1 ? 0 : Math.round(latest * 100);
    setProgress((current) => (current === nextProgress ? current : nextProgress));
  });

  return (
    <aside className="progress-rail" aria-label="Page progress">
      <div className="progress-rail__meter" aria-hidden="true">
        <span>
          Progress
          <strong>{String(progress).padStart(2, '0')}%</strong>
        </span>
        <div className="progress-rail__track">
          <motion.div className="progress-rail__fill" style={{ scaleY }} />
        </div>
      </div>

      <nav className="progress-rail__nav" aria-label="Section navigation">
        {railItems.map((item, index) => {
          const isActive = item.id === activeSection;

          return (
            <a
              className={isActive ? 'progress-rail__link is-active' : 'progress-rail__link'}
              href={`#${item.id}`}
              key={item.id}
              aria-current={isActive ? 'location' : undefined}
            >
              <span>{String(index).padStart(2, '0')}</span>
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="progress-rail__footer">
        <span>Seoul, KR</span>
        <span>UTC +09:00</span>
        <time dateTime="2026">© 2026</time>
        <span>MOON19HT</span>
      </div>
    </aside>
  );
}
