/* Dependency-free descriptive statistics shared by the browser and Node tests. */
(function (root) {
  'use strict';
  const bounds = [1, 100, 250, 500, 1000, 2000, 34351];
  function parseLength(raw) {
    const text = String(raw).trim();
    if (!/^\d+$/.test(text)) return { error: '길이는 1~1,000,000 사이의 정수로 입력해 주세요. 예: 350' };
    const value = Number(text);
    if (!Number.isSafeInteger(value) || value < 1 || value > 1000000) return { error: '길이는 1~1,000,000 aa 범위에서 입력해 주세요.' };
    return { value };
  }
  function quantile(values, p) {
    if (!values.length) return null;
    const a = [...values].sort((a, b) => a - b), t = (a.length - 1) * p, i = Math.floor(t);
    return a[i] + (a[Math.min(i + 1, a.length - 1)] - a[i]) * (t - i);
  }
  function describe(values) {
    if (!values.length) return null;
    return { n: values.length, mean: values.reduce((s, n) => s + n, 0) / values.length,
      median: quantile(values, .5), q25: quantile(values, .25), q75: quantile(values, .75),
      min: Math.min(...values), max: Math.max(...values), zero: values.filter(n => n === 0).length };
  }
  function cohort(rows, length, col) {
    const lengths = rows.map(r => r[0]);
    const min = Math.min(...lengths), max = Math.max(...lengths);
    const belowOrEqual = rows.filter(r => r[0] <= length).length;
    const result = { length, belowOrEqual, ecdf: belowOrEqual / rows.length * 100, outside: length < min || length > max, min, max };
    if (result.outside) return { ...result, stats: null, observations: [] };
    const i = bounds.findIndex((low, i) => i < bounds.length - 1 && length >= low && length < bounds[i + 1]);
    const observations = rows.filter(r => r[0] >= bounds[i] && r[0] < bounds[i + 1]).map(r => r[col]);
    return { ...result, low: bounds[i], high: bounds[i + 1] - 1, observations, stats: describe(observations) };
  }
  function histogram(values, edges) {
    return edges.slice(0, -1).map((low, i) => ({ low, high: edges[i + 1] - 1, n: values.filter(x => x >= low && x < edges[i + 1]).length }));
  }
  root.ProteinCore = { bounds, parseLength, quantile, describe, cohort, histogram };
  if (typeof module !== 'undefined') module.exports = root.ProteinCore;
})(globalThis);
