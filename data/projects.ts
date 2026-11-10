import additionalProjects from './additional-projects.json';

export type Evidence = { label: string; href: string };
export type ExperimentTable = { caption: string; columns: string[]; rows: string[][]; note: string };
export type Project = {
  slug: string; category: string; title: string; summary: string; period: string;
  role: string; technologies: string[]; problem: string; actions: string[];
  result: string; learning: string; limits: string; evidence: Evidence[]; experiments?: ExperimentTable[];
};

const source = 'https://github.com/arnixs115/my_portpolio/blob/b57f2ece393bf7592d7001ea7364ed20975e8699/src/data/portfolioData.js';
export const projects: Project[] = [
  ...additionalProjects,
  {
    slug: 'movie-review', category: 'NLP · TEXT CLASSIFICATION', title: '영화 리뷰 감성 분석',
    summary: '모호한 감성의 경계를 다루며, 모델과 학습 전략을 비교한 4-class 분류 실험.',
    period: '2025.10.22 - 2025.10.30', role: '모델 개발과 리더보드 제출은 개인 프로젝트로 진행했습니다. 팀으로 함께 공부하고 다른 리더보드 참여자들과 실험 과정·결과를 자주 공유했습니다.',
    technologies: ['Python', 'PyTorch', 'Transformers', 'TAPT', 'Ensemble'],
    problem: '강한 긍정·약한 긍정·약한 부정·강한 부정을 구분해야 했습니다. 클래스 불균형, 감성 경계의 모호함과 허용 사전학습 모델의 제약이 있었습니다.',
    actions: ['클래스가 적은 감성에는 Augmented 데이터를 유지하고, 많은 감성에는 Original 데이터를 사용하는 조합을 실험해 개선을 확인했습니다.', 'Focal Loss 기반 Custom Trainer를 구현했지만 Validation Loss가 불안정해졌습니다. 해당 제출의 Accuracy는 Public 0.7778·Private 0.7780으로 기대한 개선을 얻지 못했습니다.', '3개 모델을 결합한 ensemble과 사용 가능한 5개 모델 전체를 결합한 ensemble5를 비교한 뒤, 5개 모델에 가중치를 적용한 weighted_ensemble5를 실험했습니다. ensemble5는 Public 0.8375·Private 0.8363, weighted_ensemble5는 0.8371·0.8381로 두 평가의 결과가 엇갈렸습니다.', '3-fold 실험에서는 비슷한 Loss·Accuracy와 저장 공간 부족을 겪었습니다. kfold_ensemble 제출은 0.8361·0.8376을 기록했습니다. 이후 다른 모델 조합과 공유된 TAPT 코드를 활용한 모델의 앙상블을 비교해 최종 제출을 선택했습니다.'],
    result: '219명 중 Public 24위·Private 12위를 기록했습니다. 최종 Accuracy는 Public 0.8395(83.95%)·Private 0.8391(83.91%)입니다. 기준 제출 0.8074·0.8048보다 각각 3.21%p·3.43%p 높아졌습니다.',
    learning: '데이터 조합과 앙상블을 함께 비교하고 실험 결과를 동료에게 공유했습니다. 긴 학습 시간과 저장 용량을 고려한 실험 관리·자동화의 필요성을 배웠습니다.',
    limits: '서로 다른 날짜·설정의 제출 기록을 비교한 결과이며, 데이터·가중치·TAPT 각각의 독립적인 효과를 분리한 실험은 아닙니다. 제출 이름이 잘린 항목의 전체 모델 구성을 추정하지 않았습니다. TAPT 적용 당시 내부 구조 이해에도 한계가 있었습니다.',
    experiments: [{caption: '영화 리뷰 리더보드 제출 기록 · Accuracy', columns: ['제출 기록 / 일시', 'Public', 'Private'], rows: [['baseline · 10/23 12:34', '0.8074', '0.8048'], ['bertkorbase · 10/23 16:57', '0.8226', '0.8206'], ['bertkor-focal · 10/23 20:59', '0.7778', '0.7780'], ['ensemble · 3개 모델 · 10/28 12:59', '0.8358', '0.8367'], ['ensemble5 · 전체 5개 모델 · 10/28 14:57', '0.8375', '0.8363'], ['weighted_ensemble5 · 5개 모델 가중 결합 · 10/28 17:16', '0.8371', '0.8381'], ['kfold_ensemble · 10/29 19:28', '0.8361', '0.8376'], ['최종 제출 · 10/30 17:12', '0.8395', '0.8391']], note: '2025년 리더보드 제출 기록입니다. 기준 대비 차이는 제출 간 Accuracy 차이이며 개별 기법의 인과적 효과나 F1 변화량이 아닙니다.'}],
    evidence: [{label: '프로젝트 README · 코드', href: 'https://github.com/arnixs115/boostcamp8-review-sentiment-classification'}, {label: '기존 포트폴리오 기록', href: source}],
  },
  {
    slug: 'commodity-assistant', category: 'AI · NEWS & TIME SERIES', title: '원자재 투자 결정 어시스턴트',
    summary: '뉴스의 감성과 가격 데이터를 연결해 시장 방향을 분석하는 팀 프로젝트.',
    period: '2026.01.16 — 2026.02.07 · 팀 README 기준',
    role: '기사 데이터 기반 모델링(FinBERT) 및 앙상블 구조 설계. 팀 README의 허승환 담당 항목 기준입니다.',
    technologies: ['FinBERT', 'Attention', 'Ensemble', 'XGBoost', 'LightGBM'],
    problem: '뉴스와 시계열 데이터를 종합해 원자재 가격 변동의 방향과 설명을 제공해야 했습니다.',
    actions: ['기사 제목·설명 임베딩과 FinBERT 감성을 뉴스 모델의 입력으로 활용했습니다. XGBoost·LightGBM과 threshold 조정에서 예측이 한쪽으로 쏠리는 문제를 확인했습니다.', 'Attention을 적용한 뒤에도 쏠림이 남아, Positive·Negative·Tri-label 모델의 예측 일치도와 신뢰도를 결합하는 앙상블을 설계했습니다.', '의견 일치·충돌에 따라 신뢰도를 감쇄하고 최종 상승·하락·유지 방향을 정했습니다. 근거 뉴스 추출을 담당했으나, LLM을 활용한 추가 정교화는 완료하지 못했습니다.'],
    result: '뉴스 모델 보고값: Positive Accuracy 0.5916, Negative 0.5149, Tri-label과 Ensemble은 각각 0.4109. 앙상블의 정확도 개선은 확인되지 않았습니다. 팀은 별도로 LLM 판단·신뢰도를 이용한 전체 파이프라인을 9개월 데이터와 거래 수수료 0.1% 조건으로 백테스트했습니다.',
    learning: '모델을 결합하는 설계와 실제 정확도 개선은 구분해야 했습니다. 모델링에 시간을 집중하면서 시스템 연결에 참여할 시간이 줄었던 경험을 통해 팀의 통합 일정도 함께 고려할 필요성을 배웠습니다.',
    limits: '이진 Positive·Negative와 3분류 Tri-label·Ensemble은 목표와 threshold가 달라 정확도를 직접 우열 비교할 수 없습니다. 백테스트는 팀 전체 파이프라인 결과이며 개인 뉴스 모델의 효과가 아닙니다. 보고서의 최대 손실 절감률 89.3%는 산식·정확한 비교 조건을 충분히 확인하지 못해 대표 성과로 사용하지 않았습니다.',
    experiments: [{caption: '뉴스 모델 평가 · Wrap-up Report p.7', columns: ['모델', 'Accuracy', '목표 / 상승률 기준'], rows: [['Positive', '0.5916', '이진 · threshold −0.5%'], ['Negative', '0.5149', '이진 · threshold +0.5%'], ['Tri-label', '0.4109', '3분류 · ±0.5% 밖 상승/하락, 그 외 유지'], ['Ensemble', '0.4109', '3분류 · 세 모델의 예측·신뢰도 결합']], note: '서로 다른 목표의 모델을 같은 성능 순위로 해석하지 않습니다. 원본의 평가 데이터 분할과 상세 조건을 이번 작업에서 재현하지 않았습니다.'}],
    evidence: [{label: '팀 저장소 · 역할 및 구조', href: 'https://github.com/boostcampaitech8/pro-nlp-finalproject-nlp-09'}, {label: 'Wrap-up Report · pp.6–7, 9, 15', href: 'https://github.com/boostcampaitech8/pro-nlp-finalproject-nlp-09/blob/6df5322ae9eb38f7ecc128c815ac5f83e03f728a/asset/NLP-09_%EC%9B%90%EC%9E%90%EC%9E%AC_%ED%88%AC%EC%9E%90%EA%B2%B0%EC%A0%95_%EC%96%B4%EC%8B%9C%EC%8A%A4%ED%84%B4%ED%8A%B8.pdf'}, {label: '개인 실험 기록', href: source}],
  },
  {
    slug: 'exam-llm', category: 'LLM · LEARN & APPLY', title: '수능형 LLM 문제 풀이',
    summary: '데이터 구성과 학습·추론 방법을 바꾸며 한국어 시험 문제 풀이를 탐색.',
    period: '2025.12.17 — 2026.01.06',
    role: '팀 Notion 설계, EDA·라벨링 참여, 선지 수 통일·정답 위치 shuffle 전처리, DPO 학습과 CoT 적용 시도. 보고서 개인 회고와 팀 역할 표 기준입니다.',
    technologies: ['LLM', 'DPO', 'CoT', 'EDA', 'Data Labeling'],
    problem: '한국어 시험 문제를 풀기 위해 작은 언어모델의 학습 데이터와 추론 방법을 조정해야 했습니다.',
    actions: ['4·5지선다 혼재와 5지선다의 1번 정답 편향 61.74%를 확인했습니다. 선지 수를 통일하고 정답 위치를 shuffle하는 전처리를 수행했습니다.', '팀이 분담한 총 2,031건의 학습 데이터 라벨링에 참여했습니다. 이 전체 수량을 개인 처리량으로 주장하지 않습니다.', 'DPO 학습에서 Loss 0 수렴을 관찰했습니다. 파라미터·중복 데이터·Loss 정의 등 가능성을 검토했으나 원인을 확정하지 못했습니다.', '생성 단계와 CoT 데이터 활용으로 방향을 바꾸고 프롬프트·코드를 일부 수정했지만, 서버 자원과 마감 제약으로 효과를 검증하지 못했습니다. SFT·LoRA, 한국사 RAG와 최종 앙상블은 팀 전체 작업입니다.'],
    result: '보고서 전처리 비교: 기준 Macro-F1 0.7600, 오류 문항 제거 0.7711, 정답 분포 리밸런스 0.7734. 본인은 EDA·전처리에 기여했으며, 이 값은 팀의 실험 결과입니다. 최종 팀 성적은 Public 8위 / 16팀(0.8129), Private 7위 / 16팀(0.7403)입니다.',
    learning: '기법을 빠르게 적용하기 전에 모델 구조와 학습 원리를 이해해야 했습니다. 생성형 AI로 작성한 코드도 동작 원리를 이해해야 문제에 대응할 수 있음을 배웠습니다.',
    limits: 'DPO Loss 0의 원인은 미확정이고, CoT 추가 학습의 성능 향상은 검증하지 못했습니다. 보고서의 팀 회고에 적힌 원인 해석을 개인이 확정한 결론으로 옮기지 않았습니다.',
    experiments: [{caption: '데이터 전처리 비교 · Wrap-up Report p.5', columns: ['실험', 'Macro-F1'], rows: [['기준', '0.7600'], ['오류 문항 제거', '0.7711'], ['정답 분포 리밸런스', '0.7734']], note: '팀 보고서의 비교 표입니다. 개별 전처리 효과를 합산하거나 최종 팀 점수와 같은 실험으로 해석하지 않습니다.'}],
    evidence: [{label: '팀 저장소 · 역할 및 팀 성적', href: 'https://github.com/boostcampaitech8/pro-nlp-generationfornlp-nlp-09'}, {label: 'Wrap-up Report · pp.3–5, 15', href: 'https://github.com/boostcampaitech8/pro-nlp-generationfornlp-nlp-09/blob/480519405a934ba6220ad90e8ec2b9599187049e/asset/%E1%84%89%E1%85%AE%E1%84%82%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A7%E1%86%BC%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%8C%E1%85%A6%20%E1%84%91%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B5%20%E1%84%86%E1%85%A9%E1%84%83%E1%85%A6%E1%86%AF%20%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%20WRAP-UP%20REPORT.pdf'}, {label: '개인 시도 기록', href: source}],
  },
  {
    slug: 'odqa', category: 'NLP · RETRIEVAL / RAG', title: 'Open Domain Question Answering',
    summary: 'Context·Answer 길이를 분석하고 Reader 4종의 Start/End Logit 앙상블을 구성한 ODQA 프로젝트.',
    period: '2025.12.01 — 2025.12.11 · 팀 README 기준', role: 'EDA와 앙상블 담당. Retriever·Reader 2단계 시스템에서 데이터 길이 분포 분석과 Reader 모델 결합에 참여했습니다.',
    technologies: ['EDA', 'RoBERTa', 'Reader Ensemble', 'Start/End Logits'],
    problem: 'Wikipedia에서 관련 문서를 찾은 뒤 답변 구간을 추출해야 했습니다. 문맥 길이에 따른 입력 손실과 서로 다른 토크나이저의 Logit shape 불일치가 과제였습니다.',
    actions: ['Context·Answer 길이 분포를 분석했습니다. 팀은 Reader max_length를 256·384·512로 비교해 512를 선택하고, 답변 최대 길이는 50으로 설정했습니다.', 'RoBERTa·KoELECTRA·KoBigBird를 함께 결합하려 했으나 토크나이저가 달라 Logit shape이 일치하지 않았습니다. RoBERTa 계열 4개 모델로 결합 범위를 조정했습니다.', '모델별 Start/End Logit을 결합하는 Soft Voting과 가중치를 비교했습니다. 1:1:1:1이 비교한 세 조합 중 Public F1이 가장 높았습니다.'],
    result: '팀 최종 성적 Public 4위 / 16팀(EM 75.00, F1 83.62), Private 7위 / 16팀(EM 68.61, F1 79.87). 보고서의 Curriculum Learning 결과 Public F1 78.66과 최종 앙상블 83.62의 차이는 4.96점이며, 프로젝트 최초 Baseline 대비 개선으로 표시하지 않습니다.',
    learning: '모델 결합에는 토크나이저·출력 형태의 호환성이 필요했습니다. 팀원들과 맡은 일이 겹치거나 서로의 코드 사용법을 충분히 알지 못해 어려움을 겪었습니다. 다음 프로젝트에서는 구현 내용을 설명하는 시간을 마련하고 Notion으로 진행 상황과 실험을 함께 정리하고자 했습니다.',
    limits: 'Eval과 Public·Private 점수는 서로 다른 평가입니다. 앙상블은 마지막 날 구현해 다양한 모델 조합과 가중치를 충분히 탐색하지 못했습니다. Retriever·Reranker 전체를 개인 구현으로 주장하지 않습니다. 순위는 보고서 결과 표·캡처와 공개 README를 대조했으며, 회고 본문의 “3위” 표기와는 차이가 있습니다.',
    experiments: [{caption: 'Reader 입력 길이 실험 · Wrap-up Report p.2', columns: ['max_length', 'Eval EM', 'Eval F1'], rows: [['256', '51.67', '59.97'], ['384 · 기준', '55.83', '65.19'], ['512', '55.72', '67.11']], note: '팀 실험 결과입니다. 384→512에서 F1은 높아졌지만 EM 개선으로 주장하지 않습니다.'}, {caption: 'Reader 4종 가중치 비교 · Wrap-up Report p.7', columns: ['가중치', 'Public F1', 'Private F1'], rows: [['1:1:1:1', '83.62', '79.87'], ['2:3:3:3', '83.31', '79.65'], ['1:3:3:3', '83.52', '79.87']], note: '보고서의 Start/End Logit 결합 결과입니다. Logit을 정규화된 확률값과 동일하게 설명하지 않습니다.'}],
    evidence: [{label: '팀 저장소 · 역할·기간·팀 성적', href: 'https://github.com/boostcampaitech8/pro-nlp-mrc-nlp-09'}, {label: 'Wrap-up Report · pp.1–2, 7, 10', href: 'https://github.com/boostcampaitech8/pro-nlp-mrc-nlp-09/blob/133875f311c8106680964448e0eb494843e83d7e/docs/MRC_NLP-09.pdf'}],
  },
  {
    slug: 'protein-go', category: 'BIO AI · BIOINFORMATICS', title: 'Protein GO Research & Explorer',
    summary: '인간 단백질 서열 길이와 GO 주석의 관계를 연구 통계와 정적 탐색 도구로 연결.',
    period: '2026.11 · 기존 공개 문서 기준',
    role: 'AI 도구의 도움을 받아 개인으로 연구와 Explorer 제작을 진행했습니다. 팀 내 분업으로 수행한 연구가 아니며, AI 보조 작업을 개인의 독립 구현 역량으로 확대하지 않습니다.',
    technologies: ['Spearman Correlation', 'GO', 'Static Web', 'Reproducibility'],
    problem: '단백질 길이와 GO 주석량의 관계를 살펴보고, 통계가 설명할 수 있는 범위를 함께 전달하고자 했습니다.',
    actions: ['20,431개 인간 단백질에 대한 전체·범주별 상관분석과 민감도 분석을 소개했습니다.', '기존 공개 기록에 따르면 Explorer 제작 과정에서 상관계수 6개와 기술통계를 원자료로 재계산하고, 신뢰구간은 보존된 부트스트랩 결과와 대조했습니다.', '길이를 입력하면 분포 내 위치와 구간별 GO 통계를 보여주는 정적 도구로 연결했습니다.'],
    result: '논문 보고값 n=20,431, Spearman ρ=0.2705, 95% CI [0.2570, 0.2840]. 로그인·API 키 없이 실행하는 Explorer를 제공합니다.',
    learning: '연구 수치를 다시 확인할 수 있는 과정과 해석의 범위를 사용자에게 함께 전달합니다.',
    limits: '약한 양의 연관성은 인과관계를 뜻하지 않으며 GO 주석 수는 실제 기능 수가 아닙니다. 개별 단백질 기능을 예측하는 AI 모델이 아닙니다.',
    evidence: [{label: '연구 논문 PDF', href: '/documents/research-paper.pdf'}, {label: 'Protein GO Explorer 실행', href: 'https://arnixs115.github.io/protein_go_explorer/'}, {label: '보존된 로컬 Explorer', href: '/protein-go/index.html'}],
  },
  {
    slug: 'security-learning', category: 'SECURITY · NETWORK · LEARNING', title: '보안 · 네트워크 · 웹앱 학습',
    summary: 'AI 보조 개인 제작, 보안·웹앱 학습과 GNS 라우터 연결 실습으로 확장한 과정.',
    period: '2026.08부터의 학습 기록', role: 'SKT-ALEPH 보안·웹앱 학습과 라우터 연결 실습을 수행했습니다. GNS 프로젝트 파일을 보유하고 있으며, 실습을 설명하는 글·사진은 아직 정리하지 않았습니다.',
    technologies: ['Security Learning', 'GNS', 'Router Connectivity', 'Documentation'],
    problem: '새로운 보안 분야를 이해하고 학습을 지속할 방법이 필요했습니다.',
    actions: ['이해한 내용을 문서로 정리하고 모르는 부분은 질문으로 보완했습니다.', '라우터를 연결하는 실습을 수행하고 GNS 프로젝트 파일을 보유하고 있습니다. 구성 과정과 동작을 설명하는 글·사진은 추후 보완할 계획입니다.', '공개 포트폴리오에는 원본 리추얼 대신 편집된 문장과 날짜별 집계만 남겼습니다.'],
    result: '학습 태도와 공개 가능한 성장 기록을 제공합니다. 보안 시스템의 운영 성과나 탐지 성능을 주장하지 않습니다.',
    learning: '이해한 것과 추가 확인할 것을 구분해 다음 학습 행동으로 연결합니다.',
    limits: '라우터 연결 실습은 본인 확인에 따른 학습 경험이며 GNS 파일 실행·글·사진 증빙은 확인하지 않았습니다. BYTE BACK·DAAT의 제작 범위와 검증 한계는 각 상세 페이지에서 구분합니다.',
    evidence: [{label: 'BYTE BACK 보안 자료실', href: '/projects/byte-back/'}, {label: 'DAAT 보안 대시보드', href: '/projects/daat-defense/'}, {label: '보존된 학습·성장 기록', href: '/#growth'}, {label: '공개 경험기술서', href: '/documents/experience.md'}],
  },
];

export const strengths = [
  {title: 'Experiment', text: '가설을 세우고 모델·학습 전략을 비교합니다. 개선이 미미했던 시도와 자원 제약도 기록합니다.', slug: 'movie-review'},
  {title: 'Problem Solving', text: '뉴스와 가격처럼 서로 다른 데이터를 연결하고, 문제에 맞는 표현과 모델 구성을 찾습니다.', slug: 'commodity-assistant'},
  {title: 'Learn & Apply', text: '정답 분포를 분석해 전처리하고, 새로운 학습 방법의 실패와 미검증 범위도 구분해 기록합니다.', slug: 'exam-llm'},
];

export const skills = [
  {title: '웹 서비스 · 인증', tools: 'Next.js · TypeScript · PostgreSQL · Supabase · WebAuthn', usage: 'AI 보조 개인 제작. 계획·실행·회고, 세션과 패스키·계정 소유권 검사', slug: 'plan-do-see'},
  {title: '보안 실습 · 상태 전달', tools: 'Server API · Device Session · XDR · JavaScript', usage: '제공 기반 위에 AI와 접근 제어·기기 승인·경보 판정·대시보드를 추가. 운영 성과와 구분', slug: 'byte-back'},
  {title: '시각화 · 상호작용', tools: 'Three.js · Canvas · GeoJSON · LocalStorage', usage: 'AI 보조로 지진 시각화·오류 대응, 이미지 편집기와 키보드 게임 제작', slug: 'earthquake-globe'},
  {title: 'NLP 모델 실험', tools: 'Python · PyTorch · Hugging Face Transformers · TAPT · Ensemble', usage: '감성분석 모델 비교와 학습 전략 실험', slug: 'movie-review'},
  {title: '뉴스 · 가격 모델링', tools: 'FinBERT · Attention · XGBoost · LightGBM', usage: '뉴스 표현 비교와 앙상블 구조 설계', slug: 'commodity-assistant'},
  {title: 'LLM 데이터 · 학습 시도', tools: 'EDA · Labeling · Answer Shuffle · DPO · CoT', usage: '정답 분포 전처리, DPO 학습 시도와 CoT 미검증 범위', slug: 'exam-llm'},
  {title: '검색 기반 QA · Reader', tools: 'RoBERTa · Start/End Logits · Soft Voting', usage: 'Context·Answer 길이 분석과 Reader 4종 앙상블. Retrieval·Reranking은 팀 시스템 맥락', slug: 'odqa'},
  {title: '연구를 웹으로', tools: 'Next.js · TypeScript · Tailwind CSS · Python · Static Export', usage: '현재 사이트·리추얼 집계기·연구 탐색 도구. AI 도구를 활용한 구현', slug: 'protein-go'},
];

export const experiences = [
  {period: '기간 전체 미확인', title: '네이버 부스트캠프 AI Tech · NLP 프로젝트', text: '감성분석, 수능형 문제 풀이, 원자재 어시스턴트 경험. 과정 전체의 시작·종료일과 수료 여부는 확인 자료가 없어 표시하지 않습니다.', slug: 'commodity-assistant'},
  {period: '2026.08부터 학습 · 09–11 제작 기록', title: 'SKT-ALEPH · 보안·네트워크·웹앱 학습', text: 'AI 도구를 활용해 개인으로 다이어리·보안 자료실·상태 대시보드·시각화·편집 도구·게임을 제작했습니다. 라우터 연결 실습의 GNS 파일은 보유하고 있으며 글·사진은 보완 예정입니다. 공식 재직 경력이나 과정 수료를 뜻하지 않습니다.', slug: 'security-learning'},
  {period: '2026.11 · 공개 결과물', title: '단백질 GO 개인 연구와 Explorer', text: 'AI 도구의 도움을 받아 개인으로 연구와 앱 제작을 진행하고, 통계와 분포를 정적 탐색 도구로 연결했습니다.', slug: 'protein-go'},
];
