import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '../../../data/projects';
import { publicAsset } from '../../../lib/paths';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  return { title: project ? `${project.title} | 허승환` : '프로젝트 없음', description: project?.summary };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) notFound();
  const current = projects.indexOf(project);
  const next = projects[(current + 1) % projects.length];
  return <><a className="skip" href="#main">본문으로 건너뛰기</a>
    <header className="shell project-header"><a className="brand" href={publicAsset('/')}>H<span>.</span> <small>HEO SEUNGHWAN</small></a><nav aria-label="프로젝트 탐색"><a href={publicAsset('/projects/')}>Projects 목록 ←</a></nav></header>
    <main id="main" tabIndex={-1} className="shell project-detail">
      <div className="project-lead"><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="intro">{project.summary}</p><p className="muted mt-5">{project.period}</p><ul className="tech-tags" aria-label="사용 기술">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul></div>
      <div className="detail-grid"><section><p className="eyebrow">01 / PROBLEM</p><h2>풀고자 한 문제</h2><p>{project.problem}</p></section><section><p className="eyebrow">02 / MY ROLE</p><h2>나의 역할과 범위</h2><p>{project.role}</p></section><section><p className="eyebrow">03 / ACTION</p><h2>시도와 시행착오</h2><ul>{project.actions.map(action => <li key={action}>{action}</li>)}</ul></section><section><p className="eyebrow">04 / RESULT</p><h2>결과</h2><p>{project.result}</p></section><section><p className="eyebrow">05 / LEARNING</p><h2>배운 점</h2><p>{project.learning}</p></section><section className="limit-panel"><p className="eyebrow">06 / SCOPE</p><h2>해석과 확인의 범위</h2><p>{project.limits}</p></section></div>
      {project.experiments ? <section className="experiment-section" aria-labelledby="experiments-title"><p className="eyebrow">EXPERIMENTS</p><h2 id="experiments-title">실험 조건과 결과 비교</h2>{project.experiments.map(table => <div className="experiment-table" key={table.caption}><table><caption>{table.caption}</caption><thead><tr>{table.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{table.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table><p className="note">{table.note}</p></div>)}</section> : null}
      <section className="evidence-panel"><p className="eyebrow">EVIDENCE</p><h2>직접 확인할 수 있는 자료</h2><ul>{project.evidence.map(item => <li key={item.href}><a className="text-link" href={item.href.startsWith('/') ? publicAsset(item.href) : item.href}>{item.label} ↗</a></li>)}</ul><p className="note">코드·실험 기록과 실행 검증은 구분합니다. 각 프로젝트의 검증 범위는 위 설명에서 확인할 수 있습니다.</p></section>
      <nav className="detail-footer" aria-label="이전 및 다음 프로젝트"><a href={publicAsset('/projects/')}>← 전체 프로젝트</a><a href={publicAsset(`/projects/${next.slug}/`)}>다음: {next.title} →</a></nav>
    </main>
  </>;
}
