import { motion, useReducedMotion } from 'framer-motion';
import type { Profile } from '../content/profile';

type SignalsProps = {
  signals: Profile['signals'];
};

export function Signals({ signals }: SignalsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="dashboard-section signals" id="signals" aria-labelledby="signals-title">
      <header className="section-label">
        <span>01</span>
        <h2 id="signals-title">Signals</h2>
      </header>

      <div className="signal-list">
        {signals.map((signal, index) => (
          <motion.article
            className="signal"
            key={signal.label}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <span className="signal__index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{signal.label}</h3>
            <p>{signal.value}</p>
            <span className="signal__detail">{signal.detail}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
