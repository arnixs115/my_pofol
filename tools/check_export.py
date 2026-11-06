"""Validate exported pages, local targets, fragments and preserved downloads."""
import os
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote, urljoin

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'out'
PREFIX = os.environ.get('NEXT_PUBLIC_BASE_PATH', '').rstrip('/')

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, 'Duplicate ID: ' + attrs['id']
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if attrs.get(key):
                self.refs.append(attrs[key])

def run():
    pages = {}
    for path in OUT.rglob('*.html'):
        parser = References()
        parser.feed(path.read_text(encoding='utf-8'))
        pages[path.resolve()] = parser
    assert pages, 'No exported HTML pages'
    count = 0
    for path, page in pages.items():
        relative = path.relative_to(OUT.resolve()).as_posix()
        url = PREFIX + '/' + (relative[:-10] if relative.endswith('index.html') else relative)
        for ref in page.refs:
            parsed = urlsplit(ref)
            if parsed.scheme or parsed.netloc:
                continue
            resolved = urlsplit(urljoin(url, ref))
            assert not PREFIX or resolved.path.startswith(PREFIX + '/'), f'Missing prefix: {relative}: {ref}'
            target = OUT / unquote(resolved.path[len(PREFIX):]).lstrip('/')
            if target.is_dir():
                target = target / 'index.html'
            assert target.is_file(), f'Missing export: {relative}: {ref}'
            if resolved.fragment and target.suffix == '.html':
                assert unquote(resolved.fragment) in pages[target.resolve()].ids, f'Missing anchor: {relative}: {ref}'
            count += 1
    for slug in ['movie-review', 'commodity-assistant', 'exam-llm', 'odqa', 'protein-go', 'security-learning']:
        assert (OUT/'projects'/slug/'index.html').is_file(), 'Missing project: ' + slug
    assert (OUT/'projects/index.html').is_file()
    assert {'story', 'growth', 'work', 'contact', 'protein-go-project', 'projects', 'skills', 'experience'} <= pages[(OUT/'index.html').resolve()].ids
    downloads = [p for p in (ROOT/'public/documents').iterdir() if p.suffix in {'.pdf', '.md', '.zip'}]
    assert len(downloads) == 8
    for source in downloads:
        assert (OUT/'documents'/source.name).read_bytes() == source.read_bytes(), source.name
    for source in (ROOT/'public/protein-go').rglob('*'):
        if source.is_file():
            assert (OUT/source.relative_to(ROOT/'public')).read_bytes() == source.read_bytes(), str(source)
    print(f'PASS: {len(pages)} HTML pages, {count} local references, 6 project details, 8 downloads, preserved Explorer; prefix={PREFIX!r}')

if __name__ == '__main__':
    run()
