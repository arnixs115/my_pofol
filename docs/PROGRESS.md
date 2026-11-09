# 포트폴리오 통합 인수인계

최종 작업일: 2026-11-09 (KST)

## 현재 상태

- 저장소: `arnixs115/my_pofol`
- 작업 브랜치: `feature/integrate-ai-portfolio`
- 기준 main: `22f98996dd30ca6c622c12f72d46b5d8c9d72214`
- 통합 원본: `arnixs115/my_portpolio`의 `b57f2ece393bf7592d7001ea7364ed20975e8699`
- 구현·검증 완료. 2026-11-09 사용자가 feature→main 병합과 그에 따른 자동 배포를 승인했습니다. 아래는 병합 전 인수인계이며 실제 병합·배포 결과는 GitHub PR과 Actions 기록으로 확인합니다.
- 통합 후 콘텐츠 수정의 기준은 최신 `origin/main`입니다. 후속 변경은 main에서 분기하고, 승인된 변경만 다시 병합합니다.

## 구현

- 홈에 Projects 6개, 강점 3개, Skills와 Experience 추가. 기존 색상·타이포·반응형 방향 유지.
- `/projects/` 및 `/projects/{movie-review,commodity-assistant,exam-llm,odqa,protein-go,security-learning}/` 정적 상세 페이지.
- 문제 → 개인 역할 → 시도 → 결과 → 배운 점 → 한계 → 공개 근거 구조. 데이터는 `data/projects.ts`에서 관리.
- 팀 성과와 개인 역할, 직접 구현과 적용 시도를 구분. 출처 충돌·미확인은 `docs/CONTENT_SOURCES.md`에 기록.
- BR-A 이야기·성장 데이터, 기존 연구 내용, 문서 8개, Explorer·다운로드, 갱신기와 배포 설정 보존.
- 전체 HTML 내부 링크·앵커, 6개 상세 경로, 문서·Explorer 보존을 `tools/check_export.py`에서 검사. 개인정보 검사 범위에 lib·docs·루트 안내 문서 추가.

## 검증 결과

2026-11-06, Node.js 24.21.0 / npm 11.19.0 / Windows. 저장소의 Node 22+ 요구 범위 내에서 실행했습니다. Python은 이 PC에 설치된 번들 실행 파일을 사용했으며 다른 PC에서는 `python`을 사용하면 됩니다.

| 검사 | 결과 |
| --- | --- |
| `npm ci --no-audit --no-fund` | 잠금 파일 그대로 설치; 의존성 변경 없음 |
| `npm run build` | 루트 경로 정적 빌드 통과 |
| `npm run typecheck` | 통과 |
| `NEXT_PUBLIC_BASE_PATH=/my_pofol` 빌드 | 통과 |
| `tools/check_export.py` | 두 경로 모두 12 HTML, 194 내부 참조, 상세 6개, 문서 8개, Explorer 원본 동일 검사 통과 |
| `node --test public/protein-go/tests/core.test.cjs` | 6/6 통과 |
| `updater/verify.py` | 8개 검사 통과; 합성 입력만 사용 |
| `tools/audit.py` | 민감 패턴·미승인 이메일 0건. 새 문장 수동 검토 병행 |
| 외부 링크 온라인 응답 | 내보낸 페이지의 고유 HTTPS 주소 7개 모두 HTTP 200. GitHub fragment는 원본 README의 제목과 대조 |
| 브라우저 | Pages 접두사로 홈→상세, 상세 6개 순차 이동, 목록→홈 이동 확인 |
| 모바일 | viewport 390×844, 본문 clientWidth 375px에서 홈·목록·상세 6개 scrollWidth=375px. 가로 넘침 없음 |
| 콘솔 | 위 페이지 이동 중 경고·오류 0건 |
| 키보드 | 본문 건너뛰기 Enter 이동 확인; main에 focus 대상 지정 |
| React 검토 | 서버 컴포넌트 유지, 새 의존성·클라이언트 상태·효과 없음, 타입·키·제목 구조·링크 이름·focus 스타일 확인 |

브라우저 첫 연결은 제한된 로컬 서버로 인해 실패했으나, 허용된 서버 실행 후 실제 화면 검증을 마쳤습니다. 최종 재빌드에서도 Windows의 임시 폴더 mkdir EPERM이 발생했으나, 허용된 권한으로 동일 빌드를 실행해 통과했고 최종 출력·개인정보 검사도 재실행했습니다. 마지막으로 홈·목록의 건너뛰기 링크를 Enter로 실행해 `activeElement.id=main`을 확인했습니다. 외부 모델·대회 점수 자체를 재현한 검증은 아닙니다. 개인정보 정규식 검사는 모든 비공개 정보의 부재를 보장하지 않습니다.

## 보완할 근거

1. 감성분석 참가 인원 204/219 충돌: 리더보드 원본 확인 후 수정.
2. LLM 종료일 오기: 실제 종료일 확인. 팀 점수는 개인 성과로 바꾸지 않기.
3. 보안 프로젝트의 실제 코드·역할·기술 자료 확보. ODQA 공개 저장소·보고서·역할·지표는 아래 후속 보완에서 확인했습니다.
4. 연구의 개인 분담, 교육 전체 기간·수료·학력 상세는 확인 자료를 받은 뒤 추가.
5. 기존 지원 문서에는 과거 시점의 확인 범위가 남아 있습니다. 이번에는 원문과 PDF를 보존했으며, 문서 동시 개정은 별도 작업입니다.

## 후속 보완 · Wrap-up Report 원문 반영

사용자 요청으로 「ODQA 보완점 정리」 채팅의 첨부 4개를 읽었습니다. 기존 대화의 AI 요약을 사실 근거로 삼지 않고 문서 본문·개인 회고·표를 대조했습니다. ODQA·LLM·원자재 PDF는 공개 저장소 파일과 SHA-256이 동일했습니다. 원문을 저장소에 복사하거나 팀원 개인정보·사적 회고 내용을 새로 게시하지 않았습니다.

- 감성분석: 클래스별 Original/Augmented 조합, Focal Loss Custom Trainer의 불안정한 Validation Loss, 5개 모델 가중치, 3-fold 중단, TAPT 이해의 한계 보완. 기법별 개선 폭은 미확인으로 유지.
- ODQA: EDA·앙상블 역할과 2025.12.01–12.11 기간 확인. 길이별 Eval EM/F1 및 4개 Reader 가중치별 Public/Private F1 표 추가. 토크나이저의 Logit shape 불일치와 모델군 변경 설명. 78.66은 Curriculum Learning 결과임을 구분. 보고서 p.7 결과·캡처와 README의 Public 4위·Private 7위를 채택하고 p.8 회고의 3위와의 차이는 기록.
- LLM: 5지선다 1번 정답 비율 61.74%, 팀 총 2,031건 라벨링, 개인의 선지 수 통일·shuffle 전처리, 기준·오류 제거·리밸런스 Macro-F1 비교 보완. DPO 원인 미확정·CoT 효과 미검증으로 기존의 포괄적인 “결과 비교” 표현 교정.
- 원자재: Positive/Negative 이진 모델과 Tri-label/Ensemble 3분류를 구분한 Accuracy 표 추가. 앙상블 0.4109는 Tri-label과 동일하므로 개선으로 주장하지 않음. 9개월·수수료 0.1%는 팀 전체 LLM 파이프라인 백테스트 조건으로 표시. 최대 손실 절감률 89.3%는 산식 확인 전 대표 성과에서 제외.
- Skills에서 LLM 전처리·학습 시도와 ODQA Reader·앙상블을 분리하고 각각의 근거 페이지로 연결.
- `data/projects.ts`의 선택적 실험 표와 상세 페이지의 caption·열/행 헤더를 추가. 긴 목표 설명은 모바일에서 줄바꿈. 기존 문서·Explorer·성장 기록·배포 설정은 유지.

확인한 원문 절·페이지·고정 링크·충돌 정보는 `docs/CONTENT_SOURCES.md`에 기록했습니다. main 병합·배포는 실행하지 않았습니다.

후속 보완 검증: 루트와 `/my_pofol` 빌드, 타입검사, 12 HTML·195 내부 참조·6개 상세·8개 문서·Explorer 보존 검사 통과. 외부 HTTPS 링크 10개 모두 HTTP 200. 수정한 프로젝트 4개를 390×844 viewport에서 확인했고 본문 폭 375px와 scrollWidth가 같았으며 표 자체 넘침도 없었습니다. PC의 ODQA 표와 모바일의 긴 원자재 표를 시각 검토했습니다. 콘솔 경고·오류 0. React 서버 컴포넌트·안정적인 key·caption·행/열 scope 유지. 개인정보 검사를 문서·링크 기록 갱신 후 다시 실행했습니다. 기존 Explorer·갱신기 코드는 변경하지 않았으며 초기 통합 때 통과한 테스트 결과를 새 재실행 결과로 혼동하지 않습니다.

## 다른 PC에서 이어가기

```sh
git clone https://github.com/arnixs115/my_pofol.git
cd my_pofol
git fetch origin
git switch main
git pull --ff-only origin main
npm ci
npm run dev
```

이 명령은 승인된 통합이 main에 병합된 뒤 사용합니다. 수정 전에는 `git status`로 변경사항을 확인하고 최신 main에서 새 작업 브랜치를 만듭니다. 다른 PC의 미커밋 작업은 자동으로 동기화되지 않습니다. 충돌을 reset/force-push로 덮어쓰지 마세요.

검증 명령은 `AGENTS.md` 참고. 이번 통합은 2026-11-09 승인받았으며, 이후 별도 변경의 병합·배포에는 소유자의 승인이 필요합니다. 현재 Pages 워크플로는 main push 때 자동 배포합니다. 다음 콘텐츠 보완 우선순위는 다운로드 문서 동기화, 대표 프로젝트의 개인 코드·기술적 판단 근거 보완, 홈 요약 정리입니다.
