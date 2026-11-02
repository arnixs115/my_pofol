"""Check the sanitized source and exported site. Optional deny file stays private."""
import argparse, hashlib, json, re, zipfile
from pathlib import Path
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[1]
ALLOWED_MAIL='jbheo2003@gmail.com'
PATTERNS=[r'(?i)gh[pousr]_[A-Za-z0-9]{20,}',r'(?i)sk-[A-Za-z0-9_-]{20,}',r'AKIA[0-9A-Z]{16}',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',r'\b01[016789][- .]?\d{3,4}[- .]?\d{4}\b',r'\b\d{6}-[1-4]\d{6}\b']

def run(deny=()):
    failures=[]; checked=0
    selected=[]
    for folder in ['app','data','public','updater','tools','out']:
        base=ROOT/folder
        if base.exists():
            selected.extend(p for p in base.rglob('*') if p.is_file() and '__pycache__' not in p.parts)
    for p in selected:
        rel=p.relative_to(ROOT).as_posix()
        if re.search(r'ritual-history-|아직_도착하지_않은_사람의_지도|(?:^|/)\.env',rel):
            failures.append(rel+': forbidden path')
        texts=[]
        if p.suffix=='.pdf':
            reader=PdfReader(p)
            texts=['\n'.join(page.extract_text() or '' for page in reader.pages),str(reader.metadata)]
            if reader.attachments:
                failures.append(rel+': embedded attachments')
        elif p.suffix in {'.json','.ts','.tsx','.js','.mjs','.css','.html','.txt','.md','.svg'}:
            texts=[p.read_text(encoding='utf-8')]
        elif p.suffix=='.zip':
            with zipfile.ZipFile(p) as z:
                if any(re.search(r'ritual-history-|아직_도착하지_않은_사람의_지도|(^|/)input/',n) for n in z.namelist()):
                    failures.append(rel+': forbidden ZIP entry')
                texts=[z.read(n).decode('utf-8') for n in z.namelist() if n.endswith(('.json','.md','.txt','.py'))]
        for value in texts:
            checked+=1
            if any(re.search(pattern,value) for pattern in PATTERNS):
                failures.append(rel+': sensitive pattern')
            emails=set(re.findall(r'[A-Za-z0-9_.+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}',value))
            if emails-{ALLOWED_MAIL}:
                failures.append(rel+': unapproved email')
            if any(word in value for word in deny):
                failures.append(rel+': private deny-list match')
    return {'status':'PASS' if not failures else 'FAIL','checkedTextUnits':checked,'failures':sorted(set(failures)),
            'limits':'Pattern scan plus optional private deny list; manual name review still required.'}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--deny-file',type=Path);p.add_argument('--report',type=Path)
    a=p.parse_args();deny=a.deny_file.read_text(encoding='utf-8').splitlines() if a.deny_file else []
    result=run([v for v in deny if v.strip()])
    if a.report:a.report.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False));raise SystemExit(bool(result['failures']))
