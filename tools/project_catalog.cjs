const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
function loadProjects() {
  const file = path.join(root, 'data/projects.ts');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true }
  }).outputText;
  const exported = {};
  vm.runInNewContext(code, { exports: exported, require: createRequire(file) }, { filename: file });
  return exported.projects;
}
module.exports = { root, loadProjects };
