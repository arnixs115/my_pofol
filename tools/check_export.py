"""Verify exported assets, local downloads and project-site path handling."""
import os
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'out'
PREFIX = os.environ.get('NEXT_PUBLIC_BASE_PATH', '')

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = set()
        self.downloads = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('href', 'src'):
            value = attrs.get(key, '')
            if value.startswith('/') and not value.startswith('//'):
                self.paths.add(urlsplit(value).path)
                if '/documents/' in value:
                    self.downloads.add(urlsplit(value).path)

page = References()
page.feed((OUT/'index.html').read_text(encoding='utf-8'))
for ref in page.paths:
    assert not PREFIX or ref.startswith(PREFIX+'/'), 'Missing project prefix: '+ref
    relative = ref[len(PREFIX):].lstrip('/')
    file = OUT/unquote(relative)
    assert file.is_file(), 'Missing export: '+ref
assert len(page.downloads) == 8, 'Expected all eight document downloads'
for ref in page.downloads:
    relative = ref[len(PREFIX):].lstrip('/')
    assert (OUT/relative).read_bytes() == (ROOT/'public'/relative).read_bytes()
print(f'PASS: {len(page.paths)} exported references and 8 downloads, prefix={PREFIX!r}')
