import { useState } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Profile } from '../content/profile';

type ProjectsProps = {
  projects: Profile['projects'];
};

function statusClass(status: Profile['projects'][number]['status']) {
  return `status status--${status.toLowerCase().replace(' ', '-')}`;
}

export function Projects({ projects }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const project = projects[activeIndex];

  return (
    <section className="dashboard-section projects" id="projects" aria-labelledby="projects-title">
      <header className="section-label">
        <span>02</span>
        <h2 id="projects-title">Projects</h2>
      </header>

      <div className="project-workspace">
        <div className="project-selector" role="tablist" aria-label="Select a project">
          {projects.map((item, index) => {
            const selected = index === activeIndex;

            return (
              <button
                className={selected ? 'project-selector__item is-active' : 'project-selector__item'}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="project-panel"
                id={`project-tab-${index}`}
                key={item.title}
                onClick={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <em className={statusClass(item.status)}>{item.status}</em>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            className="project-panel"
            id="project-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${activeIndex}`}
            key={project.title}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="project-panel__intro">
              <div className="project-panel__count">
                <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                <i>/</i>
                <span>{String(projects.length).padStart(2, '0')}</span>
              </div>
              <div className="project-panel__title">
                <h3>{project.title}</h3>
                <em className={statusClass(project.status)}>{project.status}</em>
              </div>
              <p>{project.summary}</p>
              <div className="project-panel__stack" aria-label={`${project.title} stack`}>
                {project.stack.slice(0, 3).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <dl className="project-panel__details">
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
              <div>
                <dt>Stack</dt>
                <dd>{project.stack.join(', ')}</dd>
              </div>
            </dl>

            <footer className="project-panel__links">
              {project.links.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </footer>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
