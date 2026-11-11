# 회사별 이력서 조합 안내

전체 경험을 보존한 기본 이력서 4쪽과 상세 경험기술서 9쪽을 원본으로 사용합니다. 지원할 때는 공고의 주요 업무와 맞는 3개를 선택해 2쪽 이력서를 생성합니다. 선택은 추천이며 회사의 요구나 적합성을 확인한 결과가 아닙니다.

ODQA·수능형 LLM·원자재에는 팀의 전체 구성과 결과를 먼저 설명하고 개인 기여를 구분합니다. 생성 도구도 팀 맥락을 포함합니다. 팀 기술을 개인의 독립 구현 기술로 옮기지 않으며, 영화 리뷰는 개인 개발·제출과 팀 학습·실험 공유로 유지합니다.

| 방향 | 시작 조합 | 확인할 내용 |
| --- | --- | --- |
| AI / NLP | odqa, exam-llm, movie-review | 개인 역할과 팀 성적, 실험 조건 |
| 웹 서비스 | plan-do-see, earthquake-globe, dev-meme-studio | API·데이터 모델·실패와 복구 |
| 보안 | byte-back, daat-defense, plan-do-see | 제공 기반과 추가 구현, 로컬 시험과 실제 운영 구분 |
| Bio / 데이터 | protein-go, odqa, earthquake-globe | 연구 해석·재현성·시각화 |

## 생성하기

Node.js 22+, 저장소 의존성, Python의 tools/document-requirements.txt, 한글 글꼴이 필요합니다. 다른 PC에서는 --python에 설치된 Python 경로를 지정할 수 있습니다.

```powershell
node tools/create_resume.cjs --track web --output-dir ../../outputs/web-resume --python python
node tools/create_resume.cjs --projects byte-back,plan-do-see,odqa --company "지원회사명" --output-dir ../../outputs/company-resume --python python
```

결과는 resume.md와 resume.pdf입니다. --company는 문서의 지원 대상 표시만 바꾸며, 회사에 대한 지원 동기·사실을 자동 생성하지 않습니다. 출력 폴더에 같은 이름의 파일이 있으면 --overwrite 없이는 거부합니다. public/documents, out, data 등 저장소 원본 폴더로는 출력할 수 없습니다.

생성 후 첫 소개·기술 문장을 공고에 맞게 편집하고, 선택한 프로젝트에서 직접 맡은 범위를 면접에서 설명할 수 있는지 검토하세요. 성과를 새로 만들거나 팀 점수를 개인 기여도 수치로 바꾸지 마세요. AI 보조 제작 표기와 검증 한계를 유지합니다. Markdown을 바꾼 뒤 같은 생성기로 PDF를 덮어쓰면 Markdown도 다시 생성되므로, 수동 수정본은 다른 이름으로 보관하고 build_documents.py --source 경로 --output PDF경로로 렌더링합니다.

최종 문서는 tools/check_documents.py --source 원문경로 --pdf PDF경로 --pages 2로 검사하고 모든 페이지를 시각 검토합니다. 2쪽을 넘으면 글꼴을 줄이기보다 내용을 선별합니다.

## 전체 경험 관리

- 사이트: data/projects.ts와 data/additional-projects.json. data/project-groups.json으로 분야를 나눕니다.
- 기간 근거: docs/PROJECT_PERIODS.md. 커밋 기간은 공식 프로젝트 일정과 구분합니다.
- 이력서: public/documents/resume.md. 경험기술서: public/documents/experience.md.
- 원본 성장 기록, 자기소개서, 논문, ZIP과 Explorer는 유지합니다.
- 이 기본 자료에는 확인되지 않은 학교·학위·졸업일·수료·재직 경력·사용자 수·운영 방어 성능을 추가하지 않았습니다.
