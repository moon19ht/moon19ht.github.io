import { motion, useReducedMotion } from 'framer-motion';
import type { ToolchainCategory } from '../content/toolchain';

type ToolchainProps = {
  toolchain: readonly ToolchainCategory[];
};

export function Toolchain({ toolchain }: ToolchainProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section toolchain" id="toolchain" aria-labelledby="toolchain-title">
      <div className="section__kicker">Toolchain</div>
      <div className="section__intro">
        <h2 id="toolchain-title">반복 가능한 빌드 루프를 위한 도구들.</h2>
        <p>
          화려한 목록보다 실제로 검증, 자동화, 배포에 쓰는 도구를 기준으로 정리했습니다.
        </p>
      </div>

      <div className="toolchain__grid">
        {toolchain.map((category, index) => (
          <motion.article
            className="toolchain-card"
            key={category.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 0.56, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="toolchain-card__header">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{category.title}</h3>
            </div>
            <p className="toolchain-card__focus">{category.focus}</p>

            <ul className="toolchain-card__items">
              {category.items.map((item) => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <p>{item.why}</p>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
