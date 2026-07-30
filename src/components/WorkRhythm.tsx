import { EnvelopeSimple, GithubLogo } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Profile } from '../content/profile';

type WorkRhythmProps = {
  rhythm: Profile['rhythm'];
  contact: Profile['contact'];
};

export function WorkRhythm({ rhythm, contact }: WorkRhythmProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section className="dashboard-section rhythm" id="rhythm" aria-labelledby="rhythm-title">
        <header className="section-label">
          <span>04</span>
          <h2 id="rhythm-title">Rhythm</h2>
        </header>

        <div className="rhythm__timeline">
          {rhythm.map((item, index) => (
            <motion.article
              className="rhythm__step"
              key={item.step}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 0.46, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.step}</h3>
              <p>{item.text}</p>
              <ul className="sr-only">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="dashboard-section contact" id="contact" aria-labelledby="contact-title">
        <header className="section-label">
          <span>05</span>
          <h2>Contact</h2>
        </header>
        <div className="contact__content">
          <div>
            <h3 id="contact-title">
              Selected work is still <span>moving.</span>
            </h3>
            <p className="sr-only">{contact.text}</p>
          </div>
          <div className="contact__links">
            {contact.links.map((link, index) => (
              <a className={index === 0 ? 'button button--primary' : 'button button--ghost'} href={link.href} key={link.label}>
                {index === 0 ? <GithubLogo weight="fill" aria-hidden="true" /> : <EnvelopeSimple aria-hidden="true" />}
                {index === 0 ? 'GitHub' : 'Email'}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
