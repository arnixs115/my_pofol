import type { Metadata } from 'next';
import { projects } from '../../data/projects';
import { publicAsset } from '../../lib/paths';
import { ProjectCard } from '../components/Portfolio';
import groups from '../../data/project-groups.json';

export const metadata: Metadata = { title: 'Projects | 허승환', description: 'AI·NLP, 웹 서비스, 보안과 Bio 연구 도구의 과정과 공개 근거.' };

export default function Projects() {
  return <><a className="skip" href="#main">본문으로 건너뛰기</a><header className="shell project-header"><a className="brand" href={publicAsset('/')}>H<span>.</span> <small>HEO SEUNGHWAN</small></a><a href={publicAsset('/#projects')}>홈으로 돌아가기 ←</a></header><main id="main" tabIndex={-1} className="shell section project-index"><p className="eyebrow">PROJECT ARCHIVE / {projects.length}</p><h1>실험하고, 만들고,<br/>다시 확인한 경험.</h1><p className="intro">관심 분야별로 프로젝트를 살펴보세요. 개인·팀 역할, AI 활용과 검증 범위를 함께 기록했습니다.</p><nav className="project-categories" aria-label="프로젝트 분야">{groups.map(group => <a className="button" key={group.id} href={`#${group.id}`}>{group.title} · {group.slugs.length}</a>)}</nav>{groups.map(group => <section className="project-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}><h2 id={`${group.id}-title`}>{group.title}</h2><div className="project-grid">{group.slugs.map(slug => projects.find(project => project.slug === slug)!).map(project => <ProjectCard key={project.slug} project={project} />)}</div></section>)}</main><footer className="shell py-8">허승환 · AI / WEB / SECURITY / BIO</footer></>;
}
