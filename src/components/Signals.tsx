import { motion } from 'framer-motion';
import type { Profile } from '../content/profile';

type SignalsProps = {
  signals: Profile['signals'];
};

export function Signals({ signals }: SignalsProps) {
  return (
    <section className="section signals" id="signals" aria-labelledby="signals-title">
      <div className="section__kicker">Selected signals</div>
      <div className="section__intro">
        <h2 id="signals-title">기술은 결과보다 먼저 흐름을 바꿔야 한다.</h2>
        <p>Minimal proof points for the way Moon19ht builds: systems, automation, and motion.</p>
      </div>

      <div className="signal-list">
        {signals.map((signal, index) => (
          <motion.article
            className="signal"
            key={signal.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.62, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            tabIndex={0}
          >
            <span className="signal__index">0{index + 1}</span>
            <div>
              <h3>{signal.label}</h3>
              <p>{signal.value}</p>
            </div>
            <span className="signal__detail">{signal.detail}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
