import type { Metadata } from 'next';
import { projects } from '../../data/projects';
import { publicAsset } from '../../lib/paths';
import { ProjectCard } from '../components/Portfolio';

export const metadata: Metadata = { title: 'Projects | 허승환', description: 'AI, NLP, Bio AI, 보안 학습 프로젝트의 과정과 공개 근거.' };

export default function Projects() {
  return <><a className="skip" href="#main">본문으로 건너뛰기</a><header className="shell project-header"><a className="brand" href={publicAsset('/')}>H<span>.</span> <small>HEO SEUNGHWAN</small></a><a href={publicAsset('/#projects')}>홈으로 돌아가기 ←</a></header><main id="main" tabIndex={-1} className="shell section project-index"><p className="eyebrow">SELECTED PROJECTS / 06</p><h1>질문에서 실험으로.</h1><p className="intro">문제, 개인 역할, 시도, 결과와 한계를 공개 자료에 연결합니다.</p><div className="project-grid">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div></main><footer className="shell py-8">허승환 · AI / NLP / BIOINFORMATICS</footer></>;
}
