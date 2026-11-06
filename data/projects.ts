export type Evidence = { label: string; href: string };
export type Project = {
  slug: string; category: string; title: string; summary: string; period: string;
  role: string; technologies: string[]; problem: string; actions: string[];
  result: string; learning: string; limits: string; evidence: Evidence[];
};

const source = 'https://github.com/arnixs115/my_portpolio/blob/b57f2ece393bf7592d7001ea7364ed20975e8699/src/data/portfolioData.js';
export const projects: Project[] = [
  {
    slug: 'movie-review', category: 'NLP · TEXT CLASSIFICATION', title: '영화 리뷰 감성 분석',
    summary: '모호한 감성의 경계를 다루며, 모델과 학습 전략을 비교한 4-class 분류 실험.',
    period: '기간 미확인', role: '개인 리더보드 프로젝트. 데이터 분석, 모델 선택·학습 및 비교 실험. 실험 결과 공유 경험은 원본 README에 기재되어 있습니다.',
    technologies: ['Python', 'PyTorch', 'Transformers', 'TAPT', 'Ensemble'],
    problem: '강한 긍정·약한 긍정·약한 부정·강한 부정을 구분해야 했습니다. 클래스 불균형, 감성 경계의 모호함과 허용 사전학습 모델의 제약이 있었습니다.',
    actions: ['불용어 확장과 Focal Loss를 비교했지만, Loss 변경의 개선 효과는 미미했습니다.', '허용 모델을 비교하고 가중 앙상블을 적용했습니다. TAPT는 외부 코드를 활용해 적용했습니다.', 'K-Fold를 시도했지만 학습 시간과 서버 자원 제약으로 전체 실험을 완료하지 못했습니다.'],
    result: 'Public 24위 · Private 12위. 원본 저장소와 기존 포트폴리오에 공통으로 기재된 순위입니다. 리더보드 원본을 통한 독립 검증은 하지 못했습니다.',
    learning: '손실 함수 변경만으로 문제를 해결하기보다 모델 간 보완성과 실험 자원을 함께 고려해야 했습니다.',
    limits: '참가 인원은 두 출처가 204명과 219명으로 달라 총원·상위 비율은 표시하지 않습니다. TAPT 내부 구조 이해에 한계가 있었다는 원본 회고를 보존했습니다.',
    evidence: [{label: '프로젝트 README · 코드', href: 'https://github.com/arnixs115/boostcamp8-review-sentiment-classification'}, {label: '기존 포트폴리오 기록', href: source}],
  },
  {
    slug: 'commodity-assistant', category: 'AI · NEWS & TIME SERIES', title: '원자재 투자 결정 어시스턴트',
    summary: '뉴스의 감성과 가격 데이터를 연결해 시장 방향을 분석하는 팀 프로젝트.',
    period: '2026.01.16 — 2026.02.07 · 팀 README 기준',
    role: '기사 데이터 기반 모델링(FinBERT) 및 앙상블 구조 설계. 팀 README의 허승환 담당 항목 기준입니다.',
    technologies: ['FinBERT', 'Attention', 'Ensemble', 'XGBoost', 'LightGBM'],
    problem: '뉴스와 시계열 데이터를 종합해 원자재 가격 변동의 방향과 설명을 제공해야 했습니다.',
    actions: ['뉴스를 감성 정보와 임베딩으로 표현하고 가격 데이터와 결합해 비교했습니다.', 'XGBoost·LightGBM, PCA·Multi-Head Attention, Entity·Triple 표현을 비교한 경험을 기존 포트폴리오에 정리했습니다.', '팀 프로젝트에서는 FinBERT 감성 분석, threshold 적용과 상승·하락·유지 관점의 앙상블 구조를 구성했습니다.'],
    result: '뉴스 표현과 모델 구성에 따른 예측 결과를 비교·분석했습니다. 팀은 뉴스·시계열 분석을 보고서로 제공하는 어시스턴트를 구현했습니다.',
    learning: '문제에 맞는 데이터 표현을 선택하고, 모델의 방향성 쏠림을 다루는 과정을 경험했습니다.',
    limits: '확인된 개인 담당 범위와 팀 전체 기능을 구분합니다. 검증된 수익률·백테스트 지표는 없어 기재하지 않습니다.',
    evidence: [{label: '팀 저장소 · 역할 및 구조', href: 'https://github.com/boostcampaitech8/pro-nlp-finalproject-nlp-09'}, {label: 'Wrap-up Report', href: 'https://github.com/boostcampaitech8/pro-nlp-finalproject-nlp-09/blob/main/asset/NLP-09_%EC%9B%90%EC%9E%90%EC%9E%AC_%ED%88%AC%EC%9E%90%EA%B2%B0%EC%A0%95_%EC%96%B4%EC%8B%9C%EC%8A%A4%ED%84%B4%ED%8A%B8.pdf'}, {label: '개인 실험 기록', href: source}],
  },
  {
    slug: 'exam-llm', category: 'LLM · LEARN & APPLY', title: '수능형 LLM 문제 풀이',
    summary: '데이터 구성과 학습·추론 방법을 바꾸며 한국어 시험 문제 풀이를 탐색.',
    period: '시작 2025.12.17 · 종료일은 원본 표기 오류로 미확인',
    role: '팀 Notion 설계, EDA, 데이터 라벨링, DPO, CoT, 데이터 생성. 팀 README의 허승환 담당 항목 기준입니다.',
    technologies: ['LLM', 'DPO', 'CoT', 'EDA', 'Data Labeling'],
    problem: '한국어 시험 문제를 풀기 위해 작은 언어모델의 학습 데이터와 추론 방법을 조정해야 했습니다.',
    actions: ['EDA·라벨링·데이터 생성으로 문제와 학습 데이터를 살폈습니다.', 'DPO 구현과 CoT 적용을 직접 시도하고 방법별 결과를 비교했습니다.', '팀은 SFT·LoRA, 한국사 RAG와 앙상블을 결합했습니다. 이 전체 기능을 개인 구현으로 주장하지 않습니다.'],
    result: '팀 README 보고값: Public 8위 / 16팀(Macro-F1 0.8129), Private 7위 / 16팀(Macro-F1 0.7403). 개인 실험만의 효과를 분리한 수치는 아닙니다.',
    learning: '새로운 학습·추론 방법을 적용하며 데이터 구성과 방법별 특성을 비교하는 경험을 쌓았습니다.',
    limits: '원본 종료일은 “20256.01.06”으로 표기되어 임의로 교정하지 않았습니다. DPO·CoT의 개별 성능 향상은 확인되지 않았습니다.',
    evidence: [{label: '팀 저장소 · 역할 및 팀 성적', href: 'https://github.com/boostcampaitech8/pro-nlp-generationfornlp-nlp-09'}, {label: '실험·보고서 안내', href: 'https://github.com/boostcampaitech8/pro-nlp-generationfornlp-nlp-09#상세-실험-내용'}, {label: '개인 시도 기록', href: source}],
  },
  {
    slug: 'odqa', category: 'NLP · RETRIEVAL / RAG', title: 'Open Domain Question Answering',
    summary: 'Wikipedia에서 정보를 검색하고 답변하는 검색 기반 질의응답 학습 경험.',
    period: '기간 미확인', role: '검색 기반 QA 프로젝트 경험. 구체적인 개인 담당 범위는 미확인입니다.',
    technologies: ['Wikipedia Retrieval', 'RAG', 'FAISS'],
    problem: '질문에 답하기 위해 필요한 정보를 외부 문서에서 찾아야 했습니다.',
    actions: ['기존 포트폴리오에 Wikipedia 기반 Retrieval·RAG 접근과 FAISS를 활용한 검색 기반 QA 경험을 기록했습니다.'],
    result: '문제에 맞는 검색 기반 접근을 적용한 학습 경험을 정리했습니다. 공개 평가 지표는 확인되지 않았습니다.',
    learning: '모델 자체의 지식뿐 아니라 필요한 문서를 검색하는 접근을 경험했습니다.',
    limits: '별도 프로젝트 저장소, 상세 역할, 기간과 성능은 확인되지 않았습니다.',
    evidence: [{label: '기존 포트폴리오의 ODQA·기술 기록', href: source}],
  },
  {
    slug: 'protein-go', category: 'BIO AI · BIOINFORMATICS', title: 'Protein GO Research & Explorer',
    summary: '인간 단백질 서열 길이와 GO 주석의 관계를 연구 통계와 정적 탐색 도구로 연결.',
    period: '2026.11 · 기존 공개 문서 기준',
    role: '연구 결과와 원자료 검증을 연결한 포트폴리오·정적 탐색 도구. 연구의 세부 분담과 협업 구성은 미확인입니다.',
    technologies: ['Spearman Correlation', 'GO', 'Static Web', 'Reproducibility'],
    problem: '단백질 길이와 GO 주석량의 관계를 살펴보고, 통계가 설명할 수 있는 범위를 함께 전달하고자 했습니다.',
    actions: ['20,431개 인간 단백질에 대한 전체·범주별 상관분석과 민감도 분석을 소개했습니다.', '기존 공개 기록에 따르면 Explorer 제작 과정에서 상관계수 6개와 기술통계를 원자료로 재계산하고, 신뢰구간은 보존된 부트스트랩 결과와 대조했습니다.', '길이를 입력하면 분포 내 위치와 구간별 GO 통계를 보여주는 정적 도구로 연결했습니다.'],
    result: '논문 보고값 n=20,431, Spearman ρ=0.2705, 95% CI [0.2570, 0.2840]. 로그인·API 키 없이 실행하는 Explorer를 제공합니다.',
    learning: '연구 수치를 다시 확인할 수 있는 과정과 해석의 범위를 사용자에게 함께 전달합니다.',
    limits: '약한 양의 연관성은 인과관계를 뜻하지 않으며 GO 주석 수는 실제 기능 수가 아닙니다. 개별 단백질 기능을 예측하는 AI 모델이 아닙니다.',
    evidence: [{label: '연구 논문 PDF', href: '/documents/research-paper.pdf'}, {label: 'Protein GO Explorer 실행', href: 'https://arnixs115.github.io/protein_go_explorer/'}, {label: '보존된 로컬 Explorer', href: '/protein-go/index.html'}],
  },
  {
    slug: 'security-learning', category: 'SECURITY · LEARNING', title: '보안 · 웹앱 구축 학습',
    summary: '낯선 보안 개념을 문서화하고 질문으로 보완한 학습과 성장 기록.',
    period: '2026.08부터의 학습 기록', role: '보안 교육과 웹앱 구축 학습 경험. 상세 구현 역할은 미확인입니다.',
    technologies: ['Security Learning', 'Documentation'],
    problem: '새로운 보안 분야를 이해하고 학습을 지속할 방법이 필요했습니다.',
    actions: ['이해한 내용을 문서로 정리하고 모르는 부분은 질문으로 보완했습니다.', '공개 포트폴리오에는 원본 리추얼 대신 편집된 문장과 날짜별 집계만 남겼습니다.'],
    result: '학습 태도와 공개 가능한 성장 기록을 제공합니다. 보안 시스템의 운영 성과나 탐지 성능을 주장하지 않습니다.',
    learning: '이해한 것과 추가 확인할 것을 구분해 다음 학습 행동으로 연결합니다.',
    limits: 'Byte Back·ZTNA/XDR의 구현, 사용 기술, 저장소와 개인 역할을 뒷받침하는 자료는 확인되지 않아 해당 명칭과 구현 성과는 기재하지 않습니다.',
    evidence: [{label: '보존된 학습·성장 기록', href: '/#growth'}, {label: '공개 경험기술서', href: '/documents/experience.md'}],
  },
];

export const strengths = [
  {title: 'Experiment', text: '가설을 세우고 모델·학습 전략을 비교합니다. 개선이 미미했던 시도와 자원 제약도 기록합니다.', slug: 'movie-review'},
  {title: 'Problem Solving', text: '뉴스와 가격처럼 서로 다른 데이터를 연결하고, 문제에 맞는 표현과 모델 구성을 찾습니다.', slug: 'commodity-assistant'},
  {title: 'Learn & Apply', text: '새로운 방법을 직접 시도하고 결과와 한계를 정리합니다. DPO·CoT 실험이 그 사례입니다.', slug: 'exam-llm'},
];

export const skills = [
  {title: 'NLP 모델 실험', tools: 'Python · PyTorch · Hugging Face Transformers · TAPT · Ensemble', usage: '감성분석 모델 비교와 학습 전략 실험', slug: 'movie-review'},
  {title: '뉴스 · 가격 모델링', tools: 'FinBERT · Attention · XGBoost · LightGBM', usage: '뉴스 표현 비교와 앙상블 구조 설계', slug: 'commodity-assistant'},
  {title: 'LLM · 검색', tools: 'DPO · CoT · FAISS · RAG', usage: '학습·추론 방법 적용 시도와 검색 기반 QA 경험', slug: 'exam-llm'},
  {title: '연구를 웹으로', tools: 'Next.js · TypeScript · Tailwind CSS · Python · Static Export', usage: '현재 사이트·리추얼 집계기·연구 탐색 도구. AI 도구를 활용한 구현', slug: 'protein-go'},
];

export const experiences = [
  {period: '기간 전체 미확인', title: '네이버 부스트캠프 AI Tech · NLP 프로젝트', text: '감성분석, 수능형 문제 풀이, 원자재 어시스턴트 경험. 과정 전체의 시작·종료일과 수료 여부는 확인 자료가 없어 표시하지 않습니다.', slug: 'commodity-assistant'},
  {period: '2026.08 — 학습 기록', title: 'SKT-ALEPH · 보안 및 웹앱 학습', text: '질문·문서화·팀 토론의 경험을 BR-A 성장 기록으로 정리했습니다. 공식 재직 경력으로 표시하지 않습니다.', slug: 'security-learning'},
  {period: '2026.11 · 공개 결과물', title: '단백질 GO 연구와 Explorer', text: '연구의 해석 범위를 설명하고 통계와 분포를 정적 탐색 도구로 연결했습니다.', slug: 'protein-go'},
];
