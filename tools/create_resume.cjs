const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { root, loadProjects } = require('./project_catalog.cjs');
const tracks = {
  ai: ['odqa','exam-llm','movie-review'],
  web: ['plan-do-see','earthquake-globe','dev-meme-studio'],
  security: ['byte-back','daat-defense','plan-do-see'],
  bio: ['protein-go','odqa','earthquake-globe']
};
function main() {
  const args = {};
  for (let i=2; i<process.argv.length; i++) {
    const key = process.argv[i];
    if (key === '--overwrite') args.overwrite = true;
    else if (['--track','--projects','--company','--output-dir','--python'].includes(key) && process.argv[i+1] && !process.argv[i+1].startsWith('--')) args[key.slice(2)] = process.argv[++i];
    else throw new Error('Unknown or incomplete argument: '+key);
  }
  const slugs = args.projects ? args.projects.split(',') : tracks[args.track || 'ai'];
  if (!slugs || slugs.length !== 3 || new Set(slugs).size !== 3) throw new Error('Select exactly three distinct project slugs.');
  const catalog = loadProjects();
  const selected = slugs.map(slug => {
    const p = catalog.find(item => item.slug === slug);
    if (!p) throw new Error('Unknown project: '+slug);
    return p;
  });
  if (!args['output-dir']) throw new Error('--output-dir is required.');
  const output = path.resolve(args['output-dir']);
  const relative = path.relative(root, output);
  // Only an external folder or private ignored folder may receive generated drafts.
  if (!relative.startsWith('..'+path.sep) && !path.isAbsolute(relative) && relative !== 'private' && !relative.startsWith('private'+path.sep)) throw new Error('Use an output folder outside the repository, or private/.');
  const md = path.join(output,'resume.md');
  const pdf = path.join(output,'resume.pdf');
  if (!args.overwrite && (fs.existsSync(md)||fs.existsSync(pdf))) throw new Error('Output exists; choose another folder or pass --overwrite.');
  const plain = value => value.replace(/[\r\n#<>\[\]]/g,' ').trim();
  const company = args.company ? '\n지원 대상: '+plain(args.company)+'\n' : '';
  const intro = '# 허승환 이력서\n\nAI · 웹 서비스 · 보안 · 생명정보학\n\n[이메일](mailto:jbheo2003@gmail.com) jbheo2003@gmail.com · [포트폴리오](https://arnixs115.github.io/my_pofol/)\n'+company+'\n생명정보학을 바탕으로 NLP 모델 실험과 데이터 분석을 경험하고, AI 도구를 활용해 웹 서비스·보안 실습 도구를 제작했습니다. 팀 프로젝트의 개인 기여와 개인 제작에서의 AI 활용을 구분합니다.\n\n## 기술과 적용 경험\n\n'+[...new Set(selected.flatMap(p=>p.technologies))].join(' · ')+'\n';
  function section(p,index) {
    const action = p.actions[0];
    const short = text => text.match(/^.*?[다요]\.(?=\s|$)/)?.[0] || text;
    const proof = p.evidence.find(item => item.href.startsWith('https://'))?.href || 'https://arnixs115.github.io/my_pofol/projects/'+p.slug+'/';
    const team = p.team ? '- **팀 전체:** '+short(p.team.overview)+'\n' : '';
    const result = p.team ? p.team.result : p.result;
    return '\n### '+p.title+'\n\n'+p.period+'\n\n'+team+'- **담당·제작 방식:** '+short(p.role)+'\n- **나의 기여:** '+short(action)+'\n- **'+(p.team ? '팀 결과' : '결과')+':** '+result+'\n- **검증 범위:** '+short(p.limits)+'\n\n[코드와 근거]('+proof+')\n';
  }
  const body = intro+section(selected[0],0)+'\n<!-- pagebreak -->\n\n## 프로젝트 경험\n'+section(selected[1],1)+section(selected[2],2)+'\n추가 경험과 코드·평가 조건은 포트폴리오에서 확인할 수 있습니다.\n';
  fs.mkdirSync(output,{recursive:true});
  fs.writeFileSync(md,body,'utf8');
  const python = args.python || process.env.PYTHON || 'python';
  const result = spawnSync(python,[path.join(root,'tools/build_documents.py'),'--source',md,'--output',pdf],{stdio:'inherit'});
  if (result.error) throw result.error;
  if (result.status) throw new Error('PDF generation failed; Markdown is preserved.');
  const check = spawnSync(python,[path.join(root,'tools/check_documents.py'),'--source',md,'--pdf',pdf,'--pages','2'],{stdio:'inherit'});
  if (check.error) throw check.error;
  if (check.status) throw new Error('Review generated pagination and shorten content before use.');
  console.log('Created '+md+' and '+pdf);
}
try { main(); } catch (error) { console.error(error.message); process.exitCode=1; }
