import { motion, useReducedMotion } from 'framer-motion';
import type { Profile } from '../content/profile';

type ProjectsProps = {
  projects: Profile['projects'];
};

export function Projects({ projects }: ProjectsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="section__kicker">Projects</div>
      <div className="section__intro">
        <h2 id="projects-title">아이디어를 실제 흐름으로 바꾼 작업들.</h2>
        <p>
          문제, 접근, 결과가 드러나도록 정리한 case studies. 아직 움직이는 프로젝트도 의도와 구조를 먼저 보여줍니다.
        </p>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <motion.article
            className="project"
            key={project.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 0.62, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="project__meta">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{project.status}</span>
            </div>

            <div className="project__main">
              <h3>{project.title}</h3>
              <p className="project__summary">{project.summary}</p>

              <dl className="project__details">
                <div>
                  <dt>Problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>Approach</dt>
                  <dd>{project.approach}</dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd>{project.result}</dd>
                </div>
              </dl>
            </div>

            <aside className="project__side" aria-label={`${project.title} details`}>
              <div>
                <p className="project__side-label">Stack</p>
                <div className="project__stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="project__side-label">Links</p>
                <div className="project__links">
                  {project.links.map((link) => (
                    <a
                      className="project__link"
                      href={link.href}
                      key={link.label}
                      aria-label={`${project.title}: ${link.label}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
