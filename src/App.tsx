import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { PortfolioRail } from './components/PortfolioRail';
import { Projects } from './components/Projects';
import { Signals } from './components/Signals';
import { Toolchain } from './components/Toolchain';
import { WorkRhythm } from './components/WorkRhythm';
import { profile } from './content/profile';
import { toolchain } from './content/toolchain';

const sectionIds = ['top', 'signals', 'projects', 'toolchain', 'rhythm', 'contact'] as const;

function useActiveSection() {
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>('top');

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 24) {
          setActiveSection('top');
          return;
        }

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id as (typeof sectionIds)[number]);
        }
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0, 0.15, 0.4, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

export default function App() {
  const activeSection = useActiveSection();

  return (
    <div className="portfolio-shell">
      <PortfolioRail activeSection={activeSection} />
      <main className="site-frame">
        <Hero profile={profile} activeSection={activeSection} />
        <Signals signals={profile.signals} />
        <Projects projects={profile.projects} />
        <Toolchain toolchain={toolchain} />
        <WorkRhythm rhythm={profile.rhythm} contact={profile.contact} />
      </main>
    </div>
  );
}
