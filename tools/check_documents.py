"""Check that published Markdown and PDFs contain the same text and link targets."""
import re
import argparse
import json
import unicodedata
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
LINK = re.compile(r'\[([^\]]+)\]\((https?://[^\s)]+|mailto:[^\s)]+)\)')

def normalize(value):
    return re.sub(r'\s+', '', unicodedata.normalize('NFC', value))

def run(entries=None):
    for name, count, md, pdf in entries or [(name, count, ROOT/'public/documents'/f'{name}.md', ROOT/'public/documents'/f'{name}.pdf') for name, count in [('resume', 4), ('experience', 9)]]:
        source = md.read_text(encoding='utf-8')
        reader = PdfReader(pdf)
        assert len(reader.pages) == count, f'{name}: unexpected pagination'
        assert not reader.attachments, f'{name}: embedded attachments'
        extracted = normalize('\n'.join(page.extract_text() or '' for page in reader.pages))
        lines = 0
        for line in source.splitlines():
            if not line.strip() or line.startswith('<!--'):
                continue
            plain = LINK.sub(r'\1', re.sub(r'^#{1,3} |^- ', '', line)).replace('**', '')
            assert normalize(plain) in extracted, f'{name}: PDF text mismatch: {plain[:60]}'
            lines += 1
        urls = {url for _, url in LINK.findall(source)}
        actual = set()
        for page in reader.pages:
            for annotation in page.get('/Annots', []):
                action = annotation.get_object().get('/A', {})
                if action.get('/URI'):
                    actual.add(str(action['/URI']))
        assert urls == actual, f'{name}: PDF link targets differ from Markdown'
        print(f'PASS: {name}, {count} pages, {lines} source lines, {len(urls)} unique link targets')
    if entries is None:
        coverage = json.loads((ROOT/'data/resume-coverage.json').read_text(encoding='utf-8'))
        groups = json.loads((ROOT/'data/project-groups.json').read_text(encoding='utf-8'))
        slugs = {slug for group in groups for slug in group['slugs']}
        assert set(coverage['catalog']) == slugs, 'Resume coverage does not match project catalog'
        source = (ROOT/'public/documents/resume.md').read_text(encoding='utf-8')
        headings = [line[4:] for line in source.splitlines() if line.startswith('### ')]
        expected = list(coverage['catalog'].values()) + coverage['additional']
        for title in expected:
            assert any(heading == title or heading.startswith(title + ' · ') for heading in headings), f'Missing resume project section: {title}'
        print(f'PASS: master resume covers all {len(slugs)} catalog entries and {len(coverage["additional"])} additional project')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path)
    parser.add_argument('--pdf', type=Path)
    parser.add_argument('--pages', type=int)
    args = parser.parse_args()
    if any([args.source, args.pdf, args.pages]) and not all([args.source, args.pdf, args.pages]):
        parser.error('--source, --pdf and --pages are required together')
    run([('selected resume', args.pages, args.source, args.pdf)] if args.source else None)
