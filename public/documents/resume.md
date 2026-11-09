# 허승환 이력서

AI / NLP / Bioinformatics

[이메일](mailto:jbheo2003@gmail.com) jbheo2003@gmail.com · [GitHub](https://github.com/arnixs115) · [포트폴리오](https://arnixs115.github.io/my_pofol/)

## 소개

생명정보학을 전공하고 NLP 모델 실험과 데이터 분석 경험을 쌓아 왔습니다. ODQA에서는 EDA와 Reader 앙상블을, 수능형 LLM에서는 정답 분포 분석과 전처리를 수행했습니다. 개인 기여와 팀 성과를 구분하고, 실험 결과와 한계를 함께 설명합니다.

## 기술과 적용 경험

- **NLP 모델 실험:** Python, PyTorch, Hugging Face Transformers. 영화 리뷰 분류 모델·TAPT·가중 앙상블 비교.
- **Reader와 데이터 분석:** RoBERTa, Start/End Logit 결합, EDA, 정답 위치 shuffle. ODQA·LLM의 데이터와 출력 구조 분석.
- **뉴스 모델링:** FinBERT, Attention, XGBoost, LightGBM. 뉴스 표현과 방향성 모델·신뢰도 결합 설계.
- **웹과 재현성:** Next.js, TypeScript, Tailwind CSS, Python. AI 도구를 활용한 정적 포트폴리오·리추얼 집계기·연구 탐색 도구 제작.

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

### 영화 리뷰 감성 분석

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

내용 갱신: 2026.11.09 | 세부 실험과 공개 출처는 프로젝트 경험기술서 및 포트폴리오 상세 페이지에 연결했습니다.
