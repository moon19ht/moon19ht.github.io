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
      <section className="section rhythm" id="rhythm" aria-labelledby="rhythm-title">
        <div className="section__kicker">Build loop</div>
        <div className="rhythm__grid">
          <h2 id="rhythm-title">Prototype. Verify. Ship.</h2>
          <div className="rhythm__steps">
            {rhythm.map((item, index) => (
              <motion.div
                className="rhythm__step"
                key={item.step}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.step}</h3>
                  <p>{item.text}</p>
                  <ul className="rhythm__points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="section contact" id="contact" aria-labelledby="contact-title">
        <div>
          <div className="section__kicker">Contact</div>
          <h2 id="contact-title">{contact.heading}</h2>
        </div>
        <div className="contact__body">
          <p>{contact.text}</p>
          <div className="contact__links">
            {contact.links.map((link) => (
              <a href={link.href} key={link.label} aria-label={`Contact: ${link.label}`}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
