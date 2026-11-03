(function () {
  'use strict';
  const D = globalThis.PROTEIN_DATA, C = globalThis.ProteinCore;
  const $ = id => document.getElementById(id);
  const fmt = (n, digits = 0) => n.toLocaleString('ko-KR', { maximumFractionDigits: digits, minimumFractionDigits: digits });
  const categoryNames = ['','전체 GO','BP · 생물학적 과정','MF · 분자 기능','CC · 세포 구성요소'];
  let currentLength = 350, latest = null;
  function node(tag, text, className) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function svgEl(tag, attrs, text) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function chart(target, bins, highlight = -1, isLength = false) {
    const host = $(target); host.replaceChildren();
    const svg = svgEl('svg', { viewBox: '0 0 640 190', 'aria-hidden': 'true' });
    const max = Math.max(1, ...bins.map(b => b.n)), top = 24, height = 112;
    const width = 570 / bins.length;
    [0, .5, 1].forEach(ratio => {
      const y = top + height * (1 - ratio);
      svg.append(svgEl('line', { x1: 50, y1: y, x2: 630, y2: y, stroke: '#e3e9ef' }));
      svg.append(svgEl('text', { x: 43, y: y + 4, 'text-anchor': 'end', fill: '#526579', 'font-size': 10 }, fmt(Math.round(max * ratio))));
    });
    bins.forEach((b, i) => {
      const x = 58 + width * i, barHeight = b.n / max * height;
      const label = isLength && b.low === 2000 ? '2,000–34,350' : b.low === b.high ? String(b.low) : `${fmt(b.low)}–${fmt(b.high)}`;
      svg.append(svgEl('rect', { x, y: top + height - barHeight, width: width - 16, height: barHeight,
        fill: i === highlight ? '#2a56c6' : isLength ? '#9eafc2' : '#5c978e', rx: 2 }));
      svg.append(svgEl('text', { x: x + (width - 16) / 2, y: top + height - barHeight - 7, 'text-anchor': 'middle', fill: '#172b45', 'font-size': 11 }, fmt(b.n)));
      svg.append(svgEl('text', { x: x + (width - 16) / 2, y: 156, 'text-anchor': 'middle', fill: '#526579', 'font-size': 10 }, label));
      if (i === highlight) svg.append(svgEl('text', { x: x + (width - 16) / 2, y: 175, 'text-anchor': 'middle', fill: '#2a56c6', 'font-size': 10, 'font-weight': 700 }, '입력이 속한 구간'));
    });
    host.append(svg);
  }
  function makeTable(caption, bins, unit) {
    const table = node('table'); table.append(node('caption', caption));
    const head = node('thead'), tr = node('tr');
    [unit + ' 구간', '단백질 수'].forEach(t => { const th = node('th', t); th.scope = 'col'; tr.append(th); });
    head.append(tr); table.append(head);
    const body = node('tbody');
    bins.forEach(b => { const r = node('tr'); r.append(node('td', b.low === b.high ? String(b.low) : `${fmt(b.low)}–${fmt(b.high)}`), node('td', fmt(b.n))); body.append(r); });
    table.append(body); return table;
  }
  const lengthBins = C.histogram(D.rows.map(r => r[0]), C.bounds);
  function renderCorrelations() {
    const body = $('correlation-rows'); body.replaceChildren();
    D.correlations.forEach((record, i) => {
      const row = node('tr');
      if (i + 1 === Number($('category').value)) row.className = 'selected-row';
      const label = node('th', categoryNames[i + 1]); label.scope = 'row'; row.append(label, node('td', record.rho.toFixed(4)));
      const bar = node('td', undefined, 'bar-cell'), svg = svgEl('svg', { viewBox: '0 0 200 16', role: 'img', 'aria-label': `0~1 척도에서 ${record.rho.toFixed(4)}` });
      svg.append(svgEl('rect', { x: 0, y: 5, width: 200, height: 6, fill: '#e0e6ed' }));
      svg.append(svgEl('rect', { x: 0, y: 5, width: record.rho * 200, height: 6, fill: '#2a56c6' }));
      bar.append(svg); row.append(bar, node('td', record.ci.map(n => n.toFixed(4)).join('–')), node('td', fmt(record.n))); body.append(row);
    });
  }
  function renderResult() {
    const col = Number($('category').value), result = C.cohort(D.rows, currentLength, col);
    latest = { ...result, col };
    $('result-title').textContent = `${fmt(currentLength)} aa의 위치`;
    $('percentile').textContent = `${fmt(result.ecdf, 2)}%`;
    $('position-detail').textContent = `20,431개 중 ${fmt(result.belowOrEqual)}개의 길이가 ${fmt(currentLength)} aa 이하입니다. 동률을 포함한 누적비율이며 점수나 예측 정확도가 아닙니다.`;
    const active = result.outside ? -1 : lengthBins.findIndex(b => currentLength >= b.low && currentLength <= b.high);
    chart('position-chart', lengthBins, active, true);
    $('position-chart').setAttribute('aria-label', `전체 길이 분포. ${fmt(currentLength)} aa 이하 ${fmt(result.ecdf, 2)}%. 상세 수치는 아래 표 참고.`);
    $('outside-note').hidden = !result.outside;
    $('outside-note').textContent = '입력 길이가 관측 범위(2~34,350 aa) 밖입니다. 누적비율만 표시하며 구간 통계와 예측값은 제공하지 않습니다.';
    $('cohort-title').textContent = result.outside ? '관측 범위 밖의 입력' : `${fmt(result.low)}–${fmt(result.high)} aa 구간`;
    $('cohort-description').textContent = result.stats
      ? `${categoryNames[col]} · ${fmt(result.stats.n)}개 단백질의 실제 주석 수. 평균·중앙값은 이 구간의 기술통계입니다.`
      : '비교할 관측 구간이 없습니다. 예시 길이를 선택하면 다시 탐색할 수 있습니다.';
    const stats = $('cohort-stats'); stats.replaceChildren();
    if (result.stats) {
      const s = result.stats;
      [['중앙값',fmt(s.median,1),'개'],['사분위 범위',`${fmt(s.q25,1)}–${fmt(s.q75,1)}`,'개'],['평균',fmt(s.mean,2),'개'],['주석 0개',fmt(s.zero),'단백질']].forEach(([label,value,unit]) => {
        const div = node('div', undefined, 'cohort-stat'); div.append(node('span', label),node('strong', value),node('small',' '+unit)); stats.append(div);
      });
    }
    const goBins = C.histogram(result.observations, [0,1,5,10,20,50,164]);
    $('go-chart').hidden = !result.stats;
    if (result.stats) chart('go-chart', goBins);
    $('go-chart').setAttribute('aria-label', `${categoryNames[col]} 주석 개수 분포. ${result.stats ? fmt(result.stats.n) : 0}개 단백질. 상세 수치는 아래 표 참고.`);
    const tables = $('chart-tables'); tables.replaceChildren(makeTable('전체 자료의 길이 분포', lengthBins, '길이(aa)'));
    if (result.stats) tables.append(makeTable('선택한 길이 구간의 '+categoryNames[col]+' 주석 분포', goBins, 'GO ID 수'));
    renderCorrelations();
  }
  function submitLength() {
    const parsed = C.parseLength($('length').value);
    $('error').hidden = !parsed.error;
    $('error').textContent = parsed.error || '';
    $('length').setAttribute('aria-invalid', String(Boolean(parsed.error)));
    $('results').hidden = Boolean(parsed.error); $('invalid-result').hidden = !parsed.error;
    if (parsed.error) {
      latest = null;
      $('invalid-result').querySelector('h3').textContent = '입력을 확인해 주세요.';
      $('invalid-result').querySelector('p').textContent = '정상적인 길이를 입력하면 결과가 다시 나타납니다.';
      return;
    }
    currentLength = parsed.value; renderResult();
  }
  function renderCondition() {
    const key = $('condition').value;
    const r = key === 'baseline' ? D.correlations[0] : D.sensitivity[key === 'nozero' ? 0 : 1];
    const descriptions = {
      baseline: '모든 20,431개 항목을 포함합니다. GO 주석이 0개인 1,056개도 유지합니다.',
      nozero: 'GO 0개 항목 1,056개를 제외했습니다. 양의 방향은 유지되지만 상관계수는 감소했습니다.',
      gene: 'Gene ID 누락 1,277개·복수 매핑 99개·동일 Gene ID 중복 24개를 제외했습니다. 단일 Gene ID별 accession 오름차순 첫 항목을 선택했습니다. 생물학적 대표 단백질 선정 기준이 아니며 감소를 중복 제거만의 효과로 해석할 수 없습니다.'
    };
    const target = $('condition-result'); target.replaceChildren(node('strong',`ρ = ${r.rho.toFixed(4)}`),node('small',`n = ${fmt(r.n)} · 95% CI ${r.ci.map(n => n.toFixed(4)).join('–')}`),node('p',descriptions[key]));
    if (key !== 'baseline') target.append(node('small',`기본 분석 대비 Δρ = ${(r.rho - D.correlations[0].rho).toFixed(4)}`));
  }
  $('length-form').addEventListener('submit', e => { e.preventDefault(); submitLength(); });
  $('length').addEventListener('input', () => {
    $('results').hidden = true; $('invalid-result').hidden = false; latest = null;
    $('invalid-result').querySelector('h3').textContent = '새 입력을 확인할 준비가 됐습니다.';
    $('invalid-result').querySelector('p').textContent = '‘분포에서 확인하기’를 눌러 새 결과를 확인하세요.';
    $('error').hidden = true; $('length').setAttribute('aria-invalid','false');
  });
  document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => { $('length').value = button.dataset.example; submitLength(); }));
  $('category').addEventListener('change', () => { if (latest) renderResult(); });
  $('condition').addEventListener('change', renderCondition);
  $('download-report').addEventListener('click', () => {
    if (!latest) return;
    const r = latest, s = r.stats;
    const text = ['Protein GO Explorer · 탐색 기록',D.paperTitle,`자료: 인간 Reviewed 단백질 ${D.rows.length}개 / UniProtKB ${D.release}`,`입력 길이: ${r.length} aa`,`이 길이 이하: ${r.belowOrEqual} / ${D.rows.length} (${r.ecdf.toFixed(2)}%)`,
      s ? `길이 구간: ${r.low}–${r.high} aa / ${categoryNames[r.col]} / n=${s.n}\n중앙값 ${s.median}, Q1–Q3 ${s.q25}–${s.q75}, 평균 ${s.mean.toFixed(2)}, 주석 0개 ${s.zero}` : '관측 범위 밖: 구간 통계 제공 안 함',
      `논문의 전체 GO 상관계수 ρ=${D.correlations[0].rho.toFixed(4)}`, '입력 구간 통계는 원자료에서 추가 계산한 기술통계입니다. 개별 단백질의 기능이나 주석 수를 예측하지 않습니다. GO 개수는 실제 기능 수와 다르며, 상관관계는 인과관계를 뜻하지 않습니다.'].join('\n\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const a = node('a'); a.href = url; a.download = `protein-go-${r.length}aa.txt`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  submitLength(); renderCondition();
})();
