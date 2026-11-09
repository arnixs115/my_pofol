"""Build the two public PDFs from their Markdown sources with embedded Korean fonts.

Install tools/document-requirements.txt. On Windows, Malgun Gothic is detected;
elsewhere pass --font-regular and --font-bold with Korean-capable TrueType files.
"""
import argparse
import html
import re
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, PageBreak

ROOT = Path(__file__).resolve().parents[1]
INK = colors.HexColor('#142c49')
BLUE = colors.HexColor('#315fc4')
MUTED = colors.HexColor('#526477')

def inline(text):
    text = html.escape(text)
    text = re.sub(r'\[([^\]]+)\]\((https?://[^\s)]+|mailto:[^\s)]+)\)',
                  r'<link href="\2" color="#315fc4"><u>\1</u></link>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)
    return text

def build(name, output):
    source = ROOT / 'public/documents' / f'{name}.md'
    styles = {
        'body': ParagraphStyle('Body', fontName='Portfolio', fontSize=10.1, leading=16.6, textColor=INK, spaceAfter=8, wordWrap='CJK'),
        'title': ParagraphStyle('Title', fontName='PortfolioBold', fontSize=23, leading=31, textColor=INK, spaceAfter=15, keepWithNext=True),
        'h2': ParagraphStyle('Section', fontName='PortfolioBold', fontSize=14, leading=21, textColor=INK, spaceBefore=16, spaceAfter=9, keepWithNext=True),
        'h3': ParagraphStyle('Subsection', fontName='PortfolioBold', fontSize=10.8, leading=17, textColor=BLUE, spaceBefore=11, spaceAfter=6, keepWithNext=True),
        'bullet': ParagraphStyle('Bullet', fontName='Portfolio', fontSize=10.1, leading=16.6, textColor=INK, leftIndent=11, firstLineIndent=-9, spaceAfter=6, wordWrap='CJK'),
    }
    title = '허승환 이력서' if name == 'resume' else '허승환 프로젝트 경험기술서'
    doc = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=45, leftMargin=45,
                            topMargin=49, bottomMargin=46, title=title, author='허승환',
                            subject='AI 및 NLP 프로젝트 역할과 실험 결과', creator='Portfolio document builder',
                            invariant=1, pageCompression=1)
    story = []
    block = []
    def flush():
        if block:
            story.append(Paragraph(inline(' '.join(block)), styles['body']))
            block.clear()
    for line in source.read_text(encoding='utf-8').splitlines():
        if not line.strip():
            flush()
        elif line == '<!-- pagebreak -->':
            flush()
            story.append(PageBreak())
        elif line.startswith('#'):
            flush()
            level, text = line.split(' ', 1)
            style = {1:'title', 2:'h2', 3:'h3'}[len(level)]
            story.append(Paragraph(inline(text), styles[style]))
        elif line.startswith('- '):
            flush()
            story.append(Paragraph('• ' + inline(line[2:]), styles['bullet']))
        else:
            block.append(line)
    flush()
    def page(canvas, doc):
        canvas.saveState()
        canvas.setFont('Portfolio', 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(45, 23, '허승환 | ' + ('이력서' if name == 'resume' else '프로젝트 경험기술서'))
        canvas.drawRightString(A4[0]-45, 23, f'{doc.page}')
        canvas.restoreState()
    doc.build(story, onFirstPage=page, onLaterPages=page)
    print(output)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--font-regular', type=Path, default=Path('C:/Windows/Fonts/malgun.ttf'))
    parser.add_argument('--font-bold', type=Path, default=Path('C:/Windows/Fonts/malgunbd.ttf'))
    parser.add_argument('--output-dir', type=Path, default=ROOT/'public/documents')
    args = parser.parse_args()
    if not args.font_regular.is_file() or not args.font_bold.is_file():
        parser.error('Provide Korean-capable TrueType files with --font-regular and --font-bold.')
    pdfmetrics.registerFont(TTFont('Portfolio', str(args.font_regular)))
    pdfmetrics.registerFont(TTFont('PortfolioBold', str(args.font_bold)))
    pdfmetrics.registerFontFamily('Portfolio', normal='Portfolio', bold='PortfolioBold', italic='Portfolio', boldItalic='PortfolioBold')
    args.output_dir.mkdir(parents=True, exist_ok=True)
    for name in ['resume', 'experience']:
        build(name, args.output_dir/f'{name}.pdf')
