# 허승환 프로젝트 경험기술서

AI / NLP / Bioinformatics

[이메일](mailto:jbheo2003@gmail.com) jbheo2003@gmail.com · [포트폴리오](https://arnixs115.github.io/my_pofol/) · 내용 갱신 2026.11.09

## 01 ODQA Reader 분석과 앙상블

**기간:** 2025.12.01 - 2025.12.11 | **소속:** 네이버 부스트캠프 AI Tech NLP 프로젝트 | **역할:** EDA·앙상블

### 문제와 담당 범위

Wikipedia에서 관련 문서를 검색한 뒤 정답 구간을 추출하는 Retriever-Reader 2단계 시스템입니다. 문맥 길이에 따른 입력 손실과 모델 간 출력 호환성을 살피며 데이터 길이 분석과 Reader 결합에 참여했습니다. Retriever·Reranker 전체를 개인 구현으로 주장하지 않습니다.

### 시도와 판단

- Context·Answer 길이 분포를 분석했습니다. 팀은 Reader max_length 256·384·512를 비교해 512를 선택하고 답변 최대 길이는 50으로 설정했습니다.
- RoBERTa·KoELECTRA·KoBigBird를 결합하려 했으나 토크나이저 차이로 Logit shape이 일치하지 않았습니다. RoBERTa 계열 4종으로 결합 범위를 조정했습니다.
- Start/End Logit을 결합하는 Soft Voting과 세 가중치 조합을 비교했습니다. Logit을 정규화된 확률값과 동일하게 설명하지 않습니다.

### 실험 결과

- **Reader 입력 길이 / Eval EM·F1:** 256은 51.67·59.97, 384는 55.83·65.19, 512는 55.72·67.11입니다. 384에서 512로 바꿨을 때 F1은 높아졌지만 EM이 개선된 것은 아닙니다.
- **가중치 / Public F1·Private F1:** 1:1:1:1은 83.62·79.87, 2:3:3:3은 83.31·79.65, 1:3:3:3은 83.52·79.87입니다. 비교한 범위에서 균등 가중치가 가장 높은 Public F1을 기록했습니다.
- **최종 팀 성적:** Public 4위/16팀(EM 75.00, F1 83.62), Private 7위/16팀(EM 68.61, F1 79.87).

### 한계와 배운 점

Public F1 78.66은 Curriculum Learning 결과이며 최종 앙상블 83.62와의 차이는 4.96점입니다. 이를 최초 Baseline 대비 개선이나 앙상블의 독립적인 효과로 단정하지 않습니다. 마지막 날 앙상블을 구현해 더 다양한 모델·가중치를 충분히 탐색하지 못했습니다.

개인 회고에서는 역할 중복과 코드 사용법 공유의 어려움을 돌아보며, 다음 프로젝트에서 구현 설명과 Notion 기반 정리를 강화하고자 했습니다.

### 공개 근거

[코드·역할·기간·팀 성적](https://github.com/boostcampaitech8/pro-nlp-mrc-nlp-09) · [Wrap-up Report pp.1-2, 7, 10](https://github.com/boostcampaitech8/pro-nlp-mrc-nlp-09/blob/133875f311c8106680964448e0eb494843e83d7e/docs/MRC_NLP-09.pdf) · [실험 표와 상세 설명](https://arnixs115.github.io/my_pofol/projects/odqa/)

<!-- pagebreak -->

## 02 수능형 LLM 데이터 분석과 전처리

**기간:** 2025.12.17 시작 | **소속:** 네이버 부스트캠프 AI Tech NLP 프로젝트 | **역할:** EDA·라벨링 참여·전처리·DPO/CoT 시도·Notion 설계

### 문제와 담당 범위

한국어 시험 문제를 풀기 위해 데이터 형식·정답 분포와 학습·추론 방식을 조정하는 팀 프로젝트입니다. 개인의 구체적인 기여는 EDA, 라벨링 참여, 선지 수 통일과 정답 위치 shuffle 전처리입니다. SFT·LoRA, 한국사 RAG와 최종 앙상블은 팀 전체 작업입니다.

### 시도와 판단

- 4·5지선다 혼재와 5지선다의 1번 정답 편향 61.74%를 확인했습니다. 선지 수를 통일한 뒤 정답 위치를 shuffle했습니다.
- 팀원들이 나누어 수행한 총 2,031건 학습 데이터 라벨링에 참여했습니다. 전체 수량을 개인 처리량으로 표시하지 않습니다.
- DPO 학습에서 Loss 0 수렴을 관찰했습니다. 파라미터 설정·데이터 중복·Loss 정의 오류 등의 가능성을 검토했으나 원인을 확정하지 못했습니다.
- 생성 단계와 CoT 데이터 활용으로 방향을 바꾸고 프롬프트·코드를 일부 수정했습니다. 서버 자원과 마감 제약으로 추가 학습 효과는 검증하지 못했습니다.

### 실험 결과

- **팀 전처리 비교 / Macro-F1:** 기준 0.7600, 오류 문항 제거 0.7711, 정답 분포 리밸런스 0.7734.
- 본인은 EDA·전처리에 기여했으며 위 수치는 팀 보고서의 실험 결과입니다. 두 전처리의 개선 폭을 합산하지 않습니다.
- **최종 팀 성적:** Public 8위/16팀(Macro-F1 0.8129), Private 7위/16팀(Macro-F1 0.7403). 개인의 전처리만으로 달성한 성과가 아닙니다.

### 한계와 배운 점

DPO Loss 0의 원인은 미확정이고 CoT의 효과는 미검증입니다. 생성형 AI를 활용한 코드 작성에서도 모델 구조와 학습 원리·코드 동작을 이해해야 문제에 대응할 수 있음을 배웠습니다. 종료일은 원본 README의 연도 오기가 있어 기재하지 않았습니다.

### 공개 근거

[팀 코드·역할·성적](https://github.com/boostcampaitech8/pro-nlp-generationfornlp-nlp-09) · [Wrap-up Report pp.3-5, 15](https://github.com/boostcampaitech8/pro-nlp-generationfornlp-nlp-09/blob/480519405a934ba6220ad90e8ec2b9599187049e/asset/%E1%84%89%E1%85%AE%E1%84%82%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A7%E1%86%BC%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%8C%E1%85%A6%20%E1%84%91%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B5%20%E1%84%86%E1%85%A9%E1%84%83%E1%85%A6%E1%86%AF%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20WRAP-UP%20REPORT.pdf) · [실험 표와 상세 설명](https://arnixs115.github.io/my_pofol/projects/exam-llm/)

<!-- pagebreak -->

## 03 영화 리뷰 감성 분석

**형태:** 개인 리더보드 프로젝트 | **역할:** 데이터 분석·모델 선택과 학습·비교 실험 | **기술:** Python·PyTorch·Transformers·TAPT·Ensemble

### 문제와 담당 범위

강한 긍정·약한 긍정·약한 부정·강한 부정의 4개 감성을 구분하는 과제입니다. 클래스 불균형과 감성 경계의 모호함, 사용할 수 있는 사전학습 모델의 제약이 있었습니다. 실험 결과를 동료들과 공유하며 모델과 데이터 구성을 비교했습니다.

### 시도와 판단

- 클래스가 적은 감성에는 Augmented 데이터를 유지하고 많은 감성에는 Original 데이터를 사용하는 조합을 실험해 개선을 확인했습니다.
- Focal Loss 기반 Custom Trainer를 구현했지만 Validation Loss가 불안정해져 개선에 실패했습니다. 영화 리뷰 관련 불용어 추가의 효과도 제한적이었습니다.
- 여러 모델의 Soft Voting과 가중치를 비교했습니다. 성능 순서대로 5개 모델에 [0.22, 0.21, 0.20, 0.19, 0.18]을 적용했을 때 미세한 개선을 보고했습니다.
- 3-fold 앙상블을 시도했으나 서로 비슷한 Loss·Accuracy와 저장 공간 부족으로 중단했습니다.
- 공유된 코드를 활용해 TAPT 모델을 학습하고 앙상블해 최종 제출했습니다. 이 과정에서 TAPT 내부 구조에 대한 이해가 충분하지 않았음을 회고에 남겼습니다.

### 결과

**Public 24위·Private 12위.** 공개 저장소·기존 포트폴리오와 제공된 보고서의 순위 캡처를 대조했습니다. 참가 인원은 출처에 204명·219명으로 다르게 기재되어 총원이나 상위 비율을 표시하지 않았습니다.

개별 기법의 정확한 Accuracy/F1 개선 폭은 확인되지 않아 수치로 만들지 않았습니다. 보고서의 가중치 실험과 순위는 서로 다른 종류의 근거로 구분합니다.

### 배운 점

손실 함수 변경만으로 문제를 해결하기보다 데이터 조합과 모델 간 보완성도 살펴야 했습니다. 긴 학습 시간과 저장 용량을 고려한 실험 관리·자동화, 결과 공유가 필요함을 배웠습니다.

### 공개 근거

[프로젝트 README와 코드](https://github.com/arnixs115/boostcamp8-review-sentiment-classification) · [기존 개인 실험 기록](https://github.com/arnixs115/my_portpolio/blob/b57f2ece393bf7592d7001ea7364ed20975e8699/src/data/portfolioData.js) · [상세 과정과 확인 범위](https://arnixs115.github.io/my_pofol/projects/movie-review/)

<!-- pagebreak -->

## 04 원자재 투자 결정 어시스턴트

**기간:** 2026.01.16 - 2026.02.07 | **소속:** 네이버 부스트캠프 AI Tech NLP 프로젝트 | **역할:** 기사 데이터 기반 모델링(FinBERT)·앙상블 구조 설계

### 문제와 담당 범위

뉴스와 가격 데이터를 종합해 원자재 시장 방향과 설명을 제공하는 팀 프로젝트입니다. 기사 모델링과 앙상블 구조 설계, 근거 뉴스 추출을 담당했습니다. GCP·Airflow·전체 보고서 파이프라인을 개인이 구현한 것으로 표시하지 않습니다.

### 시도와 판단

- 기사 제목·설명 임베딩과 FinBERT 감성을 입력으로 활용했습니다. XGBoost·LightGBM과 threshold 조정에서 예측이 한쪽으로 쏠리는 문제를 확인했습니다.
- Attention을 적용한 뒤에도 쏠림이 남아 Positive·Negative·Tri-label 모델의 예측 일치도와 신뢰도를 결합하는 앙상블을 설계했습니다.
- 모델 의견이 일치하거나 충돌하는 경우 신뢰도를 조정하고 최종 상승·하락·유지 방향을 정했습니다. LLM을 이용한 근거 뉴스 추출의 추가 정교화는 완료하지 못했습니다.

### 모델 평가

- **Positive:** 이진 Accuracy 0.5916, 상승률 threshold -0.5%.
- **Negative:** 이진 Accuracy 0.5149, 상승률 threshold +0.5%.
- **Tri-label:** 3분류 Accuracy 0.4109. 상승률이 +0.5%보다 크면 상승, -0.5%보다 작으면 하락, 그 외 유지.
- **Ensemble:** 3분류 Accuracy 0.4109. Tri-label과 같아 정확도 개선이 확인된 것으로 쓰지 않습니다.

이진·3분류 모델은 목표와 threshold가 다르므로 Accuracy를 직접 우열 비교할 수 없습니다. 위 값은 보고서의 평가 결과이며 데이터 분할과 학습을 별도로 재현한 결과는 아닙니다.

### 팀 평가와 개인 회고

팀은 별도로 9개월 데이터와 거래 수수료 0.1% 조건에서 LLM의 BUY/SELL/HOLD 판단·신뢰도를 이용한 전체 파이프라인을 백테스트했습니다. 개인 뉴스 모델의 독립 성과와 구분하며, 산식·비교 조건을 충분히 확인하지 못한 손실 절감률은 대표 성과로 사용하지 않았습니다.

모델 결합 설계와 정확도 개선은 구분해야 했습니다. 모델링에 집중하면서 시스템 연결에 참여할 시간이 줄었던 경험을 통해 통합 일정까지 함께 고려할 필요성을 배웠습니다.

### 공개 근거

[팀 코드와 역할](https://github.com/boostcampaitech8/pro-nlp-finalproject-nlp-09) · [Wrap-up Report pp.6-7, 9, 15](https://github.com/boostcampaitech8/pro-nlp-finalproject-nlp-09/blob/6df5322ae9eb38f7ecc128c815ac5f83e03f728a/asset/NLP-09_%EC%9B%90%EC%9E%90%EC%9E%AC_%ED%88%AC%EC%9E%90%EA%B2%B0%EC%A0%95_%EC%96%B4%EC%8B%9C%EC%8A%A4%ED%84%B4%ED%8A%B8.pdf) · [실험 표와 상세 설명](https://arnixs115.github.io/my_pofol/projects/commodity-assistant/)

<!-- pagebreak -->

## 05 연구를 탐색 도구와 기록으로 연결

### Protein GO Research와 Explorer

**공개 결과물:** 2026.11 | **분야:** Bioinformatics·탐색적 분석·정적 웹

인간 단백질 서열 길이와 Gene Ontology 주석량의 관계를 소개하고, 길이별 분포와 구간별 GO 통계를 탐색하는 정적 도구로 연결했습니다.

- **논문 보고값:** 인간 단백질 n=20,431, Spearman ρ=0.2705, 95% CI [0.2570, 0.2840].
- 기존 공개 검증 기록에 따르면 Explorer 제작 과정에서 상관계수 6개와 기술통계를 원자료로 재계산하고, 신뢰구간은 보존된 부트스트랩 결과와 대조했습니다.
- 사용자는 단백질 길이를 입력해 분포 내 위치와 구간별 주석 통계를 살펴볼 수 있습니다. 로그인·API 키 없이 실행합니다.
- 약한 양의 연관성은 인과관계를 뜻하지 않습니다. GO 주석 수는 실제 기능 수가 아니며 개별 단백질 기능을 예측하는 AI 모델로 소개하지 않습니다. 연구의 세부 분담·협업 구성은 미확인입니다.

[논문 PDF](https://arnixs115.github.io/my_pofol/documents/research-paper.pdf) · [Explorer 실행](https://arnixs115.github.io/protein_go_explorer/) · [연구와 검증 범위](https://arnixs115.github.io/my_pofol/projects/protein-go/)

### BR-A 포트폴리오와 리추얼 갱신 장치

공개 통계와 문서를 갱신하면서 원본 회고를 비공개로 유지하는 정적 사이트입니다. Next.js·TypeScript·Tailwind CSS와 Python 표준 라이브러리 기반 집계·검증기로 구성했으며 AI 도구를 활용해 제작했습니다.

- 공개 집계: 2026.08.11 - 2026.11.02의 기록일 53일, 아침 53일, 마무리 51일, 강점 행동 실천 23일·일부 실천 28일.
- 날짜 순서를 바꾸거나 같은 입력을 반복해도 같은 집계가 생성되는지, 자유 텍스트가 공개되지 않는지, 잘못된 입력이 거부되는지 검증했습니다.
- 현재 포트폴리오는 프로젝트 6개와 정적 상세 페이지, Skills·Experience, 연구 앱·문서 링크를 제공합니다. 공개 사이트에 원본 리추얼을 게시하지 않으며 로그인·DB·AI API·추적 도구를 사용하지 않습니다.
- 기록 수와 자기평가를 출석률·객관적인 업무 성과로 해석하지 않습니다. AI 보조 제작 사실을 개인의 독립 구현 역량으로 확대하지 않습니다.

[사이트와 성장 기록](https://arnixs115.github.io/my_pofol/#growth) · [공개 소스](https://github.com/arnixs115/my_pofol) · [집계기와 재현 예제](https://arnixs115.github.io/my_pofol/documents/ritual-updater.zip)

### 추가 학습 경험

SKT-ALEPH에서 2026년 8월부터 보안·웹앱 학습 내용을 문서화하고 질문으로 보완한 경험이 있습니다. 구체적인 보안 시스템의 구현 역할·코드·성능은 확인 자료가 부족해 이 문서에서 별도 구현 성과로 기재하지 않습니다.

이 문서의 실험 결과는 공개 자료의 보고값이며 모델 학습과 대회 평가를 새로 재현한 결과는 아닙니다. 학교·학위·졸업 시기, 교육 과정 전체 기간·수료 여부와 공식 재직 경력은 기재하지 않았습니다.
