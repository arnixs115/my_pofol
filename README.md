# BR-A · 허승환 포트폴리오

Next.js / TypeScript / Tailwind CSS 정적 사이트와 결정론적 Python 리추얼 갱신 장치입니다. 공개 연락처: jbheo2003@gmail.com.

## 실행

Node.js 22 이상, npm, Python 3.10 이상이 필요합니다.

```sh
npm ci
npm run typecheck
npm run build
python -m http.server 3000 --directory out
```

로컬 미리보기: http://localhost:3000. 개발 시 `npm run dev`를 사용할 수 있습니다. 정적 배포 대상은 `out/`입니다. 로그인·DB·AI API·추적 도구를 사용하지 않습니다.

## 구성

- `app/`: 이야기, 성장 통계, 연구, 13번 앱 예정 영역, 지원 문서와 연락처
- `data/public-content.json`: 공개용 편집 문장. 소설 원문을 사용하지 않습니다.
- `data/growth-stats.json`: 실제 입력에서 계산한 익명 집계
- `public/documents/`: 공개 논문 PDF, 지원 문서 PDF·Markdown, 갱신 장치 ZIP
- `updater/`: 표준 라이브러리만 사용하는 집계기·검증기·합성 예제
- `tools/audit.py`: 공개 텍스트·PDF 및 경로 검사 (pypdf 필요)

## 자료와 사실성

리추얼 수치는 실제 JSON에서 계산했습니다. 기록일 53, 아침 53, 마무리 51, 실천 23, 일부 실천 28입니다. 원본을 공개하지 않으므로 공개 ZIP만으로 실제 수치를 독립 검증할 수는 없습니다. 제공된 논문 PDF의 20,431과 ρ=0.2705는 PDF의 보고값이며, 논문 분석의 원자료를 이 작업에서 재계산하지 않았습니다.

소설에 실험·성과·대화 등의 각색이 명시되어 있어 해당 장면을 실제 경험으로 전환하지 않았습니다. 이야기와 지원 문서는 기록으로 확인되는 행동과 제공 자료의 확인된 주제만 사용합니다. 학교·학위·회사·재직기간·역할·성과를 임의로 추가하지 않았습니다. 지원 문서는 초안이며 제출 전에 사실을 보완해야 합니다. 과제 9 원문은 제공되지 않았습니다. 첫 문장과 마지막 문장은 본인이 최종 확정해야 합니다.

## 갱신

자세한 절차는 `updater/README.md`를 참고하세요. 원본 JSON·TXT·소설은 저장소 밖에 보관합니다. 집계와 문단 후보를 staging에 생성하고, 검토한 수치와 문장만 data에 반영한 뒤 다시 빌드합니다. 자동 게시·예약 작업은 설정하지 않았습니다.

## 배포

Vercel에 새 프로젝트로 배포할 때 프레임워크는 Next.js, 빌드는 `npm run build`, 출력은 `out`을 사용합니다. 기존 프로젝트를 덮어쓰지 마세요. 공개 GitHub 저장소를 만들 경우에도 소스·집계·공개 PDF만 올립니다. `.gitignore`에만 의존하지 말고 실제 전송 목록을 확인하세요.

## 개인정보 검사

원본 JSON·TXT·소설은 배포/ZIP에 포함하지 않습니다. 공개 이름은 허승환, 공개 이메일은 jbheo2003@gmail.com만 허용합니다. 제공 논문 참고문헌의 연구자 이름은 학술 인용으로 유지합니다. 새로 추가한 문서의 타인 실명과 메타데이터는 직접 검토해야 합니다. 패턴 검사만으로 모든 이름과 비밀값을 판별할 수는 없습니다.

## 재현 검증

```sh
python updater/verify.py
python tools/audit.py
```

감사 도구만 `pypdf`가 필요하며 `pip install -r tools/requirements.txt`로 설치할 수 있습니다. 집계기·재현 검증기에는 외부 패키지가 필요 없습니다. 검증 결과와 배포 상태는 최상위 전달 문서에 기록합니다.

기술 참고: [Next.js 정적 내보내기](https://nextjs.org/docs/app/guides/static-exports), [Tailwind CSS의 Next.js 설정](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
