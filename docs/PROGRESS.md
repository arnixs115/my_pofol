# 포트폴리오 통합 인수인계

최종 작업일: 2026-11-06 (KST)

## 현재 상태

- 저장소: `arnixs115/my_pofol`
- 작업 브랜치: `feature/integrate-ai-portfolio`
- 기준 main: `22f98996dd30ca6c622c12f72d46b5d8c9d72214`
- 통합 원본: `arnixs115/my_portpolio`의 `b57f2ece393bf7592d7001ea7364ed20975e8699`
- 구현·검증 완료. main 병합, Pages 배포, 워크플로 수동 실행은 하지 않았습니다.

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
3. ODQA 공개 저장소와 상세 역할·지표, 보안 프로젝트의 실제 코드·역할·기술 자료 확보.
4. 연구의 개인 분담, 교육 전체 기간·수료·학력 상세는 확인 자료를 받은 뒤 추가.
5. 기존 지원 문서에는 과거 시점의 확인 범위가 남아 있습니다. 이번에는 원문과 PDF를 보존했으며, 문서 동시 개정은 별도 작업입니다.

## 다른 PC에서 이어가기

```sh
git clone https://github.com/arnixs115/my_pofol.git
cd my_pofol
git fetch origin
git switch --track origin/feature/integrate-ai-portfolio
npm ci
npm run dev
```

이미 같은 브랜치가 있으면 `git status`로 변경사항을 먼저 확인하고 `git pull --ff-only`를 실행합니다. 다른 PC의 미커밋 작업은 자동으로 동기화되지 않습니다. 충돌을 reset/force-push로 덮어쓰지 마세요.

검증 명령은 `AGENTS.md` 참고. 배포 전에는 소유자의 main 병합·배포 승인이 필요합니다. 현재 Pages 워크플로는 main push 때 배포하므로, 승인 없이 main에 push하지 않습니다.
