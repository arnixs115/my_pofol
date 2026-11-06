import stats from '../data/growth-stats.json';
import content from '../data/public-content.json';
import { publicAsset } from '../lib/paths';
import Portfolio from './components/Portfolio';

const docs = [['resume','이력서','배움의 방향과 경험을 한눈에'],['self-introduction','자기소개서','경험이 일하는 태도가 되기까지'],['experience','프로젝트 경험기술서','연구와 학습 프로젝트의 근거']] as const;

export default function Home() {
  const total = stats.strength.practiced + stats.strength.partial + stats.strength.other;
  return <>
    <a className="skip" href="#main">본문으로 건너뛰기</a>
    <header className="shell flex items-center justify-between gap-6 py-6">
      <a href="#" className="brand" aria-label="허승환 홈">H<span>.</span> <small>HEO SEUNGHWAN</small></a>
      <nav aria-label="주요 메뉴" className="flex flex-wrap gap-x-6 gap-y-2"><a href="#story">Story</a><a href="#growth">Growth</a><a href="#work">Research</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#contact">Resume ↗</a></nav>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="hero shell grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div><p className="eyebrow">BR-A / PERSONAL PORTFOLIO</p><p className="role">AI · NLP · BIOINFORMATICS</p>
          <h1>기록에서<br/>다음 <em>질문</em>으로.</h1>
          <p className="intro">생명정보학에서 AI와 서비스 개발로.<br/>배운 것을 연결하며 성장하는 <strong>허승환</strong>입니다.</p>
          <div className="flex flex-wrap gap-3 mt-8"><a className="button primary" href="#projects">프로젝트와 근거 보기 <span>↗</span></a><a className="button" href="#story">나의 이야기 ↓</a></div>
        </div>
        <div className="map" role="img" aria-label="생명정보학, AI와 NLP, 서비스 개발을 연결하는 배움의 지도">
          <div className="map-top">A MAP OF LEARNING <span>01 — ONGOING</span></div>
          <svg viewBox="0 0 420 350" aria-hidden="true"><defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#b9cbe0"/></pattern></defs><rect width="420" height="350" fill="url(#grid)"/><path d="M72 253C165 267 96 82 208 96S269 271 351 180" fill="none" stroke="#315fc4" strokeWidth="2"/><path d="M72 253L208 96L351 180" fill="none" stroke="#a3b5ca" strokeDasharray="5 7"/><circle cx="72" cy="253" r="8" fill="#142c49"/><circle cx="208" cy="96" r="8" fill="#315fc4"/><circle cx="351" cy="180" r="8" fill="#315fc4"/><circle cx="351" cy="180" r="19" fill="none" stroke="#315fc4" opacity=".3"/><text x="30" y="290">BIOINFORMATICS</text><text x="165" y="65">AI / NLP</text><text x="281" y="222">SERVICE</text></svg>
          <p>서로 다른 배움도,<br/><strong>하나의 질문으로 연결됩니다.</strong></p><span className="map-index">BIO → AI → BUILD</span>
        </div>
      </section>
      <div className="ticker"><div className="shell flex flex-wrap justify-between gap-3"><span>배움의 태도</span><span>01. 질문하기</span><span>02. 기록하기</span><span>03. 다시 시도하기</span><span>04. 함께 풀기</span></div></div>
      <section id="story" className="shell section grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
        <div><p className="eyebrow">01 / MY STORY</p><h2>결과 앞에서 멈추지 않고,<br/>다음 행동을 찾습니다.</h2><p className="muted mt-5">부족함을 발견하고<br/>배움으로 바꾸는 과정.</p></div>
        <div className="story-body"><p className="lead">{content.story[0]}</p>{content.story.slice(1,4).map((p,i)=><p key={i}>{p}</p>)}<details><summary>이야기 이어 읽기 <span>＋</span></summary>{content.story.slice(4).map((p,i)=><p key={i}>{p}</p>)}</details></div>
        <div className="abilities lg:col-span-2 grid md:grid-cols-3 gap-8">{content.abilities.map((a,i)=><article key={a.title}><span className="ability-number">0{i+1}</span><h3>{a.title}</h3><p>{a.text}</p><small>리추얼 기록 · {a.date}</small></article>)}</div>
      </section>
      <section id="growth" className="growth"><div className="shell section"><div className="section-heading"><div><p className="eyebrow">02 / GROWTH IN RECORDS</p><h2>작은 기록이 쌓인 시간.</h2></div><p className="muted">{stats.period.start} — {stats.period.end}<br/>SKT-ALEPH 리추얼 · 자기보고 기록</p></div>
        <div className="stat-grid grid grid-cols-2 md:grid-cols-4">{[[stats.recordedDays,'기록된 날짜'],[stats.openDays,'아침 기록'],[stats.closeDays,'마무리 기록'],[stats.strength.practiced,'강점 행동 실천']].map(([n,l])=><div key={l}><strong>{n}<small>일</small></strong><p>{l}</p></div>)}</div>
        <div className="grid md:grid-cols-2 gap-10 mt-10"><div><h3>강점 행동을 돌아본 날</h3><div className="bar" role="img" aria-label={`실천 ${stats.strength.practiced}일, 일부 실천 ${stats.strength.partial}일, 기타 ${stats.strength.other}일`}><span style={{width:`${stats.strength.practiced / total * 100}%`}}/><span style={{width:`${stats.strength.partial / total * 100}%`}}/><span style={{width:`${stats.strength.other / total * 100}%`}}/></div><div className="legend"><span>● 실천 {stats.strength.practiced}</span><span>● 일부 실천 {stats.strength.partial}</span>{stats.strength.other>0&&<span>● 기타 {stats.strength.other}</span>}</div></div><p className="note">날짜별 기록 존재 여부를 집계했습니다. ‘실천’은 마무리 기록의 자기평가이며, 출석률·역량 점수·객관적 업무 성과를 뜻하지 않습니다. 기록 내용과 타인의 정보는 공개하지 않습니다.</p></div>
        <details className="method"><summary>집계 방식과 월별 기록 보기</summary><p>같은 날짜는 한 번만 집계하고, 중복 날짜·잘못된 날짜·예상하지 못한 형식은 오류로 처리합니다. 빈 배열과 null은 미기록입니다.</p><table><caption>월별 기록일 수</caption><thead><tr><th scope="col">월</th><th scope="col">기록일</th><th scope="col">아침</th><th scope="col">마무리</th></tr></thead><tbody>{stats.monthly.map(m=><tr key={m.month}><th scope="row">{m.month}</th><td>{m.days}</td><td>{m.open}</td><td>{m.close}</td></tr>)}</tbody></table></details>
      </div></section>
      <section id="work" className="shell section"><p className="eyebrow">03 / SELECTED WORK</p><h2>질문을 구체적인 작업으로.</h2>
        <article className="research grid lg:grid-cols-[1.1fr_1fr] gap-10 mt-10"><div className="research-figure"><span className="eyebrow">RESEARCH NOTE / 2026</span><div className="protein-metric">20,431<small>HUMAN REVIEWED PROTEINS</small></div><div className="correlation"><span>Sequence length</span><span>↔</span><span>GO annotations</span></div><p>Spearman ρ <strong>0.2705</strong></p><small>제공된 논문의 보고값 · 95% CI [0.2570, 0.2840]</small></div><div className="research-copy"><span className="tag">BIOINFORMATICS · EXPLORATORY ANALYSIS</span><h3>길이가 길면,<br/>기능 주석도 많을까?</h3><p>인간 단백질의 아미노산 서열 길이와 Gene Ontology 주석 개수의 관계를 탐색한 연구입니다. 주요 분석과 민감도 분석을 함께 살펴보며 결과가 설명하는 범위를 구분했습니다.</p><p className="note">약한 양의 연관성은 인과관계를 뜻하지 않습니다. GO 주석 수는 실제 기능 수와 다릅니다. 표시한 연구 수치는 논문과 원분석 CSV를 대조했습니다. Protein GO Explorer 제작 과정에서 상관계수 6개와 기술통계를 원자료로 독립 재계산했고, 신뢰구간은 보존된 부트스트랩 결과로 확인했습니다.</p><a className="text-link" href={publicAsset("/documents/research-paper.pdf")} target="_blank" rel="noreferrer">논문 PDF 읽기 <span>↗</span></a></div></article>
        <article className="updater-project grid md:grid-cols-[1fr_1.2fr] gap-8"><div><span className="tag">PYTHON · REPRODUCIBILITY</span><h3>반복할 수 있는 갱신 장치</h3></div><div><p>비공개 기록은 로컬에서 읽고, 집계 수치만 사이트로 전달합니다. 같은 입력에서 같은 결과를 만드는 Python 파이프라인과 검증용 예제를 함께 제공합니다.</p><a className="text-link" href={publicAsset("/documents/ritual-updater.zip")} download>갱신 장치와 재현 예제 ZIP ↓</a></div></article>
        <article className="updater-project grid md:grid-cols-[1fr_1.2fr] gap-8" id="protein-go-project"><div><span className="tag">FEATURED APP · BR-B · RESEARCH TO TOOL</span><h3>Protein GO Explorer</h3><p className="note">논문을 직접 탐색하는 정적 웹앱</p></div><div><p>단백질 기능 분석을 배우는 연구자와 학습자가 길이와 GO 주석의 관계를 탐색할 때, 논문의 약한 양의 상관관계와 원자료의 분포를 이용해 입력 길이의 위치와 구간별 주석 통계를 보여 줍니다.</p><div className="flex flex-wrap gap-6"><a className="text-link" href="https://arnixs115.github.io/protein_go_explorer/">Protein GO Explorer 실행 ↗</a><a className="text-link" href="https://arnixs115.github.io/protein_go_explorer/protein-go-explorer.zip" download>설치 없이 실행하는 ZIP ↓</a></div><p className="note mt-4">검증된 인간 단백질 20,431개 · 길이 입력·GO 통계·연구 해석 · 로그인·API 키 없음. 개별 기능 예측이 아닌 연구 통계 탐색 도구입니다.</p></div></article>
      </section>
      <Portfolio />
      <section id="contact" className="contact"><div className="shell section"><div className="section-heading"><div><p className="eyebrow">07 / RESUME & CONTACT</p><h2>다음 질문을<br/>함께 풀고 싶습니다.</h2></div><a className="email" href="mailto:jbheo2003@gmail.com">jbheo2003@gmail.com ↗</a></div><div className="grid md:grid-cols-3 gap-5 mt-12">{docs.map(([id,title,sub])=><article className="doc" key={id}><h3>{title}</h3><p>{sub}</p><div className="flex gap-5"><a href={publicAsset(`/documents/${id}.pdf`)} target="_blank" rel="noreferrer">PDF 열기 ↗</a><a href={publicAsset(`/documents/${id}.md`)} download>원문 다운로드 ↓</a></div></article>)}</div><p className="note mt-6">지원 문서는 확인 가능한 경험을 정리한 초안입니다. 학력 상세·재직 경력·담당 범위·성과 수치는 본인 확인 후 보완할 수 있습니다.</p></div></section>
    </main><footer className="shell flex flex-wrap justify-between gap-4 py-8"><span>© 2026 허승환 · BR-A</span><span>기록에서 다음 질문으로. <a href="#">맨 위로 ↑</a></span></footer>
  </>;
}
