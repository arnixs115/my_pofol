'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const C = require('../core.js');
const context = {}; vm.createContext(context); vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),context);
const D = JSON.parse(JSON.stringify(context.PROTEIN_DATA));
test('blank, injection, noninteger, exponential, invalid ranges are rejected without throwing', () => {
  ['', ' ', '-1', '0', '1.5', '1e3', 'NaN', 'Infinity', '<script>', '1000001', '99999999999999999999999'].forEach(s => assert.ok(C.parseLength(s).error, s));
  ['1','2','350','34350','34351','1000000',' 350 '].forEach(s => assert.equal(C.parseLength(s).value,Number(s)));
});
test('quantiles use linear interpolation; empty and singleton inputs are safe', () => {
  assert.equal(C.quantile([8,0,4,12],.25),3);
  assert.equal(C.describe([]),null); assert.equal(C.describe([0]).median,0);
  assert.equal(C.quantile([2,1],.5),1.5);
});
test('public numeric dataset integrity and known whole-data statistics', () => {
  assert.equal(D.rows.length,20431);
  D.rows.forEach(r => { assert.equal(r.length,5); assert.ok(r.every(Number.isSafeInteger)); assert.ok(r[0]>0); assert.equal(r[1],r[2]+r[3]+r[4]); });
  const s=C.describe(D.rows.map(r=>r[0])); assert.equal(s.min,2); assert.equal(s.max,34350); assert.equal(s.median,415); assert.equal(s.q25,249); assert.equal(s.q75,670);
  const go=C.describe(D.rows.map(r=>r[1])); assert.equal(go.zero,1056); assert.equal(go.median,9);
});
test('bin edges, ECDF ties, and outside-range inputs are exact', () => {
  const tiny=[[2,0,0,0,0],[100,3,1,1,1],[100,6,2,2,2],[249,9,3,3,3],[250,12,4,4,4],[34350,15,5,5,5]];
  const x=C.cohort(tiny,100,1); assert.equal(x.low,100); assert.equal(x.high,249); assert.equal(x.stats.n,3); assert.equal(x.stats.median,6); assert.equal(x.ecdf,50);
  assert.equal(C.cohort(tiny,250,1).low,250);
  assert.equal(C.cohort(tiny,34350,1).high,34350);
  [1,34351,1000000].forEach(n=>{const r=C.cohort(tiny,n,1);assert.equal(r.outside,true);assert.equal(r.stats,null);});
  [2,99,100,249,250,499,500,999,1000,1999,2000,34350].forEach(n=>assert.ok(C.cohort(D.rows,n,1).stats));
});
test('all observations conserved in length and GO histograms', () => {
  assert.equal(C.histogram(D.rows.map(r=>r[0]),C.bounds).reduce((s,b)=>s+b.n,0),20431);
  for(let col=1;col<=4;col++) {
    const r=C.cohort(D.rows,350,col); const bins=C.histogram(r.observations,[0,1,5,10,20,50,164]);
    assert.equal(bins.reduce((s,b)=>s+b.n,0),r.stats.n);
    assert.equal(r.stats.n,D.rows.filter(row=>row[0]>=250&&row[0]<=499).length);
  }
});
test('data.js exactly equals distributed CSV; all six research outcomes preserved', () => {
  const rows=fs.readFileSync(path.join(root,'data/observations.csv'),'utf8').trim().split(/\r?\n/).slice(1).map(s=>s.split(',').map(Number));
  assert.deepEqual(rows,D.rows);
  assert.deepEqual(D.correlations.map(r=>r.rho.toFixed(4)),['0.2705','0.2280','0.2592','0.2464']);
  assert.deepEqual(D.sensitivity.map(r=>r.n),[19375,19031]);
  assert.deepEqual(D.sensitivity.map(r=>r.rho.toFixed(4)),['0.2331','0.2013']);
});
