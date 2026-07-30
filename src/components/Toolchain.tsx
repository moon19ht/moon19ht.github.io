import { motion, useReducedMotion } from 'framer-motion';
import type { ToolchainCategory } from '../content/toolchain';

type ToolchainProps = {
  toolchain: readonly ToolchainCategory[];
};

export function Toolchain({ toolchain }: ToolchainProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="dashboard-section toolchain" id="toolchain" aria-labelledby="toolchain-title">
      <header className="section-label">
        <span>03</span>
        <h2 id="toolchain-title">Toolchain</h2>
      </header>

      <div className="toolchain__grid">
        {toolchain.map((category, index) => (
          <motion.article
            className="toolchain-group"
            key={category.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 0.46, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <h3>{category.title}</h3>
            <p className="sr-only">{category.focus}</p>
            <ul>
              {category.items.map((item) => (
                <li key={item.name} title={item.why}>
                  {item.name}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
