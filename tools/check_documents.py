"""Check that published Markdown and PDFs contain the same text and link targets."""
import re
import unicodedata
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
LINK = re.compile(r'\[([^\]]+)\]\((https?://[^\s)]+|mailto:[^\s)]+)\)')

def normalize(value):
    return re.sub(r'\s+', '', unicodedata.normalize('NFC', value))

def run():
    for name, count in [('resume', 2), ('experience', 5)]:
        source = (ROOT/'public/documents'/f'{name}.md').read_text(encoding='utf-8')
        reader = PdfReader(ROOT/'public/documents'/f'{name}.pdf')
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

if __name__ == '__main__':
    run()
