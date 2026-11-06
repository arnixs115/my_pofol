import { projects, strengths, skills, experiences, type Project } from '../../data/projects';
import { publicAsset } from '../../lib/paths';

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card">
    <p className="tag">{project.category}</p>
    <h3><a href={publicAsset(`/projects/${project.slug}/`)}>{project.title} <span aria-hidden="true">↗</span></a></h3>
    <p>{project.summary}</p>
    <ul className="tech-tags" aria-label="사용 기술">{project.technologies.slice(0, 3).map(tech => <li key={tech}>{tech}</li>)}</ul>
    <a className="text-link" href={publicAsset(`/projects/${project.slug}/`)}>{project.title} 상세 보기 →</a>
  </article>;
}

export default function Portfolio() {
  return <>
    <section id="projects" className="shell section portfolio-section">
      <div className="section-heading"><div><p className="eyebrow">04 / PROJECTS</p><h2>실험을 설명하고,<br/>근거로 연결합니다.</h2></div><a className="text-link" href={publicAsset('/projects/')}>전체 프로젝트 보기 ↗</a></div>
      <p className="muted portfolio-intro">AI · NLP · Bio AI · Security. 개인의 시도와 팀 결과, 확인된 사실과 한계를 나누어 기록했습니다.</p>
      <div className="project-grid">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div>
      <div className="strength-grid">{strengths.map(strength => <article key={strength.title}><h3>{strength.title}</h3><p>{strength.text}</p><a className="text-link" href={publicAsset(`/projects/${strength.slug}/`)}>관련 사례 →</a></article>)}</div>
    </section>
    <section id="skills" className="skills-section"><div className="shell section">
      <p className="eyebrow">05 / SKILLS</p><h2>사용한 기술을,<br/>적용한 맥락과 함께.</h2>
      <p className="muted portfolio-intro">숙련도 점수 대신 실제 사용 경험을 연결합니다. 적용 시도와 팀 기술을 독립 구현 역량으로 단정하지 않습니다.</p>
      <div className="skill-grid">{skills.map(skill => <article key={skill.title}><h3>{skill.title}</h3><p className="skill-tools">{skill.tools}</p><p>{skill.usage}</p><a className="text-link" href={publicAsset(`/projects/${skill.slug}/`)}>적용 경험 읽기 →</a></article>)}</div>
    </div></section>
    <section id="experience" className="shell section">
      <p className="eyebrow">06 / EXPERIENCE</p><h2>서로 다른 배움을 연결한 과정.</h2>
      <div className="experience-list">{experiences.map(experience => <article key={experience.title}><p className="tag">{experience.period}</p><div><h3>{experience.title}</h3><p>{experience.text}</p><a className="text-link" href={publicAsset(`/projects/${experience.slug}/`)}>경험과 근거 보기 →</a></div></article>)}</div>
    </section>
  </>;
}
