# 허승환 이력서

AI · NLP · WEB · SECURITY · BIO

[이메일](mailto:jbheo2003@gmail.com) jbheo2003@gmail.com · [GitHub](https://github.com/arnixs115) · [포트폴리오](https://arnixs115.github.io/my_pofol/)

## 소개

생명정보학을 바탕으로 NLP 모델 실험과 데이터 분석을 경험하고, AI 도구를 활용해 웹 서비스·보안 실습 도구를 제작했습니다. Reader 앙상블과 LLM 전처리 등 팀 기여와 개인 제작을 구분하고, 결과와 검증 범위를 함께 설명합니다.

## 기술과 적용 경험

- **NLP 모델 실험:** Python, PyTorch, Hugging Face Transformers. 영화 리뷰 분류 모델·TAPT·가중 앙상블 비교.
- **Reader와 데이터 분석:** RoBERTa, Start/End Logit 결합, EDA, 정답 위치 shuffle. ODQA·LLM의 데이터와 출력 구조 분석.
- **뉴스 모델링:** FinBERT, Attention, XGBoost, LightGBM. 뉴스 표현과 방향성 모델·신뢰도 결합 설계.
- **웹과 보안:** Next.js, TypeScript, Supabase, WebAuthn, JavaScript. AI 보조로 계획·실행 서비스, 인증·접근 제어 실습, 시각화·연구 도구 제작.

## 주요 프로젝트

### ODQA Reader 분석과 앙상블

2025.12.01 - 2025.12.11 | 네이버 부스트캠프 AI Tech NLP 팀 프로젝트 | EDA·앙상블 담당

- Context·Answer 길이 분포를 분석하고 Reader 4종의 Start/End Logit 결합과 가중치 비교에 참여했습니다. 토크나이저 차이로 출력 shape이 달라지는 문제에 대응해 RoBERTa 계열로 결합 범위를 조정했습니다.
- **팀 성적:** Public 4위/16팀(EM 75.00, F1 83.62), Private 7위/16팀(EM 68.61, F1 79.87). 비교한 세 가중치 중 균등 가중치의 Public F1이 가장 높았습니다.
- [프로젝트와 실험 표](https://arnixs115.github.io/my_pofol/projects/odqa/) · [코드와 팀 역할](https://github.com/boostcampaitech8/pro-nlp-mrc-nlp-09)

### 수능형 LLM 데이터 분석과 전처리

2025.12.17 - 2026.01.06 | 부스트캠프 AI Tech NLP 팀 프로젝트 | EDA·전처리·학습 방법 탐색

- 4·5지선다 혼재와 5지선다의 1번 정답 편향(61.74%)을 확인하고 선지 수 통일·정답 위치 shuffle을 수행했습니다. 팀이 분담한 총 2,031건 라벨링에 참여했습니다.
- **팀 전처리 실험:** 기준 Macro-F1 0.7600, 오류 문항 제거 0.7711, 정답 분포 리밸런스 0.7734. 최종 팀 성적은 Public 8위/16팀(0.8129), Private 7위/16팀(0.7403)입니다.
- DPO Loss 0 수렴의 원인은 확정하지 못했으며 CoT 추가 학습 효과는 자원·마감 제약으로 검증하지 못했습니다.
- [프로젝트와 실험 표](https://arnixs115.github.io/my_pofol/projects/exam-llm/) · [코드와 팀 역할](https://github.com/boostcampaitech8/pro-nlp-generationfornlp-nlp-09)

<!-- pagebreak -->

## 추가 프로젝트

### 영화 리뷰 감성 분석 · 2025.10.22 - 2025.10.30

개인 리더보드 프로젝트 | 데이터 분석·모델 학습·비교 실험 | 팀 학습·참여자 간 실험 공유

- 모델 개발·제출은 개인으로 수행하고 팀으로 함께 공부하며 리더보드 참여자들과 실험 과정·결과를 자주 공유했습니다. 4개 감성 클래스의 데이터 조합, Focal Loss, 가중 앙상블을 비교하고 공유된 TAPT 코드를 활용했습니다.
- **결과:** 219명 중 Public 24위·Private 12위. Accuracy는 기준 0.8074 / 0.8048에서 최종 0.8395 / 0.8391(Public / Private)로 높아졌습니다. TAPT 이해와 저장 공간·시간 제약도 경험했습니다.
- [프로젝트와 근거](https://arnixs115.github.io/my_pofol/projects/movie-review/) · [코드](https://github.com/arnixs115/boostcamp8-review-sentiment-classification)

### 원자재 투자 결정 어시스턴트

2026.01.16 - 2026.02.07 | 네이버 부스트캠프 AI Tech NLP 팀 프로젝트 | 기사 모델링·앙상블 구조 설계

- FinBERT 감성과 기사 임베딩을 활용하고 Attention·threshold 조정과 모델 일치도 기반 신뢰도 결합을 실험했습니다.
- **보고값:** Positive 이진 Accuracy 0.5916, Tri-label·Ensemble 3분류 Accuracy 각각 0.4109. 이진·3분류를 직접 비교하거나 앙상블의 정확도 개선을 주장하지 않습니다.
- 팀은 별도로 9개월 데이터·거래 수수료 0.1% 조건에서 전체 LLM 판단 파이프라인을 백테스트했습니다. 이를 개인 뉴스 모델의 성과로 귀속하지 않습니다.
- [프로젝트와 평가 조건](https://arnixs115.github.io/my_pofol/projects/commodity-assistant/) · [코드와 팀 역할](https://github.com/boostcampaitech8/pro-nlp-finalproject-nlp-09)

### Protein GO Research와 Explorer

2026.11 공개 결과물 | AI 도구의 도움을 받아 개인으로 진행한 생명정보학 연구와 앱 제작

- 인간 단백질 20,431개에 대한 서열 길이와 GO 주석량의 관계를 소개하고, 길이별 분포·주석 통계를 탐색하는 앱으로 연결했습니다.
- 논문 보고값은 Spearman ρ=0.2705, 95% CI [0.2570, 0.2840]입니다. 주석 수를 실제 기능 수나 인과관계로 해석하지 않습니다. AI 보조 제작을 개인의 독립 구현 역량으로 확대하지 않습니다.
- [연구와 검증 범위](https://arnixs115.github.io/my_pofol/projects/protein-go/) · [Explorer 실행](https://arnixs115.github.io/protein_go_explorer/)

## 학습 배경과 작업 방식

생명정보학 전공. 네이버 부스트캠프 AI Tech NLP 프로젝트와 SKT-ALEPH의 보안·웹앱 학습, 라우터 연결 실습 경험이 있습니다. GNS 프로젝트 파일을 보유하고 있으며 실습 글·사진은 정리 예정입니다. BR-A에는 원본 회고 대신 공개용 문장과 날짜별 집계를 게시합니다.

학교·학위·졸업 시기와 교육 과정 전체 기간·수료 여부는 기재하지 않았습니다. 기술 목록은 프로젝트 사용 경험이며 숙련도 점수나 재직 경력을 뜻하지 않습니다.

내용 갱신: 2026.11.10 | 세부 실험과 공개 출처는 프로젝트 경험기술서 및 포트폴리오 상세 페이지에 연결했습니다.


<!-- pagebreak -->

## 웹 서비스와 보안

아래 SKT ALEPH 제작물은 모두 AI 도구를 활용한 개인 프로젝트입니다. 제공된 시작 틀·엔진과 추가 제작 부분을 구분합니다.

### Plan-Do-See Diary

2026.09.28 - 2026.11.01 · 기획 채팅·커밋 기준 | Next.js · TypeScript · PostgreSQL · Supabase · WebAuthn

- 계획·할 일 CRUD, 수정 이력, 실행 시작·일시정지·재개·종료와 CSV 내보내기를 연결했습니다. 작업 시간은 실행 구간의 합으로 계산했습니다.
- 이메일 인증에 패스키 등록·로그인·삭제 흐름을 추가하고 챌린지를 DB에서 보관·소비하도록 구성했습니다.
- **검증 범위:** 실제 Supabase·Vercel·실기기 패스키의 전체 동작은 이번 작업에서 확인하지 않았습니다.
- [상세·코드·검증 범위](https://github.com/arnixs115/plan-do-see)

### BYTE BACK 보안 자료실

2026.10.06 - 2026.10.20 · 기획·개발 기록 기준 | JavaScript · Server API · Supabase Auth · WebAuthn · XDR

- 가상 메모를 정적 파일에서 DB로 옮기고 메모 API에 로그인·소유권 검사를 적용했습니다.
- 서버에서 승인 기기 세션의 소유자·만료·회수·자격 증명 상태를 검사하는 흐름을 구성했습니다.
- **검증 범위:** 실제 기기·DB·배포 환경의 전체 흐름과 최종 심판 결과를 새로 검증하지 않았습니다.
- [상세·코드·검증 범위](https://github.com/arnixs115/choi-bujang-secret-vault)

### DAAT 보안 상태 대시보드

2026.10.19 - 2026.11.03 · 커밋 기준 | JavaScript · Node.js · Windows · Dashboard

- 사용자·기기·세션, 판정 결과, 사건 목록·필터·상세를 보여주는 학생 확장 화면을 구성했습니다.
- CPU·메모리·디스크·방화벽 카드와 성공한 조회 표본을 최대 30개 유지하는 추이 차트·표를 추가했습니다.
- **검증 범위:** 새 환경 재현·실제 SDP·AI 연결·보안 조치 집행을 이번 작업에서 검증하지 않았습니다.
- [상세·코드·검증 범위](https://github.com/arnixs115/DAAT-defense/tree/master/on-client)


<!-- pagebreak -->

## 시각화와 작은 제작물

아래 프로젝트는 AI 도구를 활용해 개인으로 제작했습니다. 기간은 기획 채팅·커밋의 관찰 범위이며 공식 과정 일정이나 작업 시간은 아닙니다.

### USGS 지진 시각화와 오류 대응

2026.09.17 - 2026.09.28 · 기획 채팅·커밋 기준 | JavaScript · Three.js · USGS GeoJSON · AbortController

- USGS 최근 7일 M2.5+ 자료를 지구본 마커·상세 패널·시간 필터·KST 날짜별 집계로 연결했습니다.
- 3초 요청 제한을 적용하고 4.5초 Slow fixture로 시간 초과를 재현하는 경로를 구성했습니다.
- **범위:** 이번 작업에서 실시간 USGS 응답·브라우저·배포본을 실행 검증하지 않았습니다. 두 저장소를 독립된 두 성과로 중복 계산하지 않습니다.
- [상세·제작 과정·코드](https://github.com/arnixs115/usgs-earthquake-globe)

### Finger Shift

2026.09.11 - 2026.09.14 · 커밋 기준 | JavaScript · HTML/CSS · LocalStorage

- 현재 눌린 키와 목표 패턴을 집합으로 비교하고 난이도별 패턴을 생성하는 흐름을 구성했습니다.
- 준비·진행·일시정지·결과 화면과 기록·목표 모드를 구성했습니다.
- **범위:** 랭킹은 브라우저 로컬 기록이며 온라인 공용 리더보드가 아닙니다. 동점 순위 처리 제약이 있습니다.
- [상세·제작 과정·코드](https://github.com/arnixs115/like_fingerdance)

### Dev Meme Studio

2026.09.15 - 2026.09.16 · 기획 채팅·커밋 기준 | JavaScript · Canvas · JSON · HTML/CSS

- 배경·텍스트·이미지 스티커의 위치·크기·색상과 화면비를 편집하도록 구성했습니다.
- 공통 Canvas 렌더링 경로로 PNG·JPEG 다운로드를 만들고 템플릿을 JSON으로 저장·불러오도록 했습니다.
- **범위:** 자동 밈 수집·AI 템플릿 생성·DB 공유는 후속 구상이며 구현 기능이 아닙니다. 이번 작업에서 이미지 출력 품질을 새로 시험하지 않았습니다.
- [상세·제작 과정·코드](https://github.com/arnixs115/dev-meme-studio)

전체 경험을 보존한 기본 이력서입니다. 지원 회사의 주요 업무에 맞춰 프로젝트를 선별해 사용할 수 있습니다. 기간의 관찰 기준과 AI 보조 제작·검증 한계는 유지합니다.
