# 공개 콘텐츠 근거 · 2026-11-06

## 기준 스냅샷

| 자료 | 확인한 commit | 용도 |
| --- | --- | --- |
| [my_pofol](https://github.com/arnixs115/my_pofol/tree/22f98996dd30ca6c622c12f72d46b5d8c9d72214) | `22f98996dd30ca6c622c12f72d46b5d8c9d72214` | BR-A, 성장 기록, 연구·Explorer, 문서 보존 |
| [my_portpolio 데이터](https://github.com/arnixs115/my_portpolio/blob/b57f2ece393bf7592d7001ea7364ed20975e8699/src/data/portfolioData.js) | `b57f2ece393bf7592d7001ea7364ed20975e8699` | 강점·개인 실험·ODQA·사용 기술 |
| [감성분석 README](https://github.com/arnixs115/boostcamp8-review-sentiment-classification/blob/5bcc3b0747c72a87c5847dcac6d3ecff91de55eb/README.md) | `5bcc3b0747c72a87c5847dcac6d3ecff91de55eb` | 문제·TAPT/Focal Loss/앙상블·자원 제약·순위 |
| [원자재 README](https://github.com/boostcampaitech8/pro-nlp-finalproject-nlp-09/blob/6df5322ae9eb38f7ecc128c815ac5f83e03f728a/README.md) | `6df5322ae9eb38f7ecc128c815ac5f83e03f728a` | 본인 역할(FinBERT·앙상블)·팀 기능·기간 |
| [LLM README](https://github.com/boostcampaitech8/pro-nlp-generationfornlp-nlp-09/blob/480519405a934ba6220ad90e8ec2b9599187049e/README.md) | `480519405a934ba6220ad90e8ec2b9599187049e` | 본인 역할·팀 성적·팀 기능 |

초기 통합에서는 README·코드와 보고서 파일의 존재를 확인했습니다. 후속 보완에서는 「ODQA 보완점 정리」 채팅에 첨부된 wrap-up report 4개의 원문을 읽고, 아래 PDF 3개가 공개 저장소의 파일과 SHA-256까지 동일함을 대조했습니다. 대회 평가와 모델 학습을 독립 재현한 검증은 아닙니다. 팀원의 이름·역할 표 전체나 첨부 원문은 새로 게시하지 않았습니다.

## Wrap-up Report 원문 대조 · 2026-11-06

| 문서 | 확인 위치 | 공개 근거 / 채택 내용 |
| --- | --- | --- |
| 영화리뷰 wrap-up report.docx | 데이터 불균형·Weighted ensemble·K-Fold·자체 평가 의견 | 클래스별 Original/Augmented 조합, 5개 모델 가중치 [0.22, 0.21, 0.20, 0.19, 0.18], Focal Loss 실패와 TAPT 활용. 원문은 비게시, 기존 공개 README와 교차 확인 |
| MRC_wrap-up_report.pdf | pp.1–2, 7, 10 | [고정 커밋 PDF](https://github.com/boostcampaitech8/pro-nlp-mrc-nlp-09/blob/133875f311c8106680964448e0eb494843e83d7e/docs/MRC_NLP-09.pdf). EDA·앙상블 역할, 길이 실험, Logit shape 이슈·가중치 비교, 팀 성적 |
| 수능형_ wrap-up_report.pdf | pp.3–5, 10, 15 | 공개 LLM 저장소 `480519405a934ba6220ad90e8ec2b9599187049e`의 보고서. 정답 편향·전처리 비교, 팀 라벨링 수, 개인 DPO·CoT 시도와 미검증 범위 |
| final_wrap-up_report(1).pdf | pp.1, 6–7, 9, 15 | 공개 원자재 저장소 `6df5322ae9eb38f7ecc128c815ac5f83e03f728a`의 보고서. 뉴스 모델 평가·일치도 기반 신뢰도, 개인 회고, 팀 백테스트 조건 |

동일성 확인 SHA-256:

- MRC: `2e69c2bba46c4de4c632c854b852d61fc123a9f8ae4fdb879d76041e4df7d66f`
- LLM: `b4dd9b471e6fc5b99cafc241dd734cb293542b9289acb774c88c9b0cdd1be4cc`
- 원자재: `5ed9f02aeb3b2db2de5e3162357bf4a89d4ff811b81dc4812e7875bbcb062f36`

ODQA 공개 README도 같은 고정 커밋에서 확인했습니다. 기간은 2025.12.01–12.11, 개인 역할은 EDA·앙상블입니다. 보고서 p.7의 최종 순위 캡처와 README가 Public 4위·Private 7위로 일치하므로 이를 채택했습니다. p.8 회고의 Public 3위는 불일치로 기록했습니다.

## 프로젝트별 채택 범위

- 감성분석: Public 24위 / Private 12위는 보고서 캡처에서도 확인. **분모 204 / 219 충돌**은 미해결. 캡처 점수 0.8395·0.8391은 지표명이 캡처에서 명시되지 않아 Accuracy/F1로 붙이지 않았습니다. 기법별 정량적 개선 폭도 창작하지 않았습니다.
- 원자재: Positive 0.5916·Negative 0.5149는 이진, Tri-label·Ensemble 0.4109는 3분류 Accuracy입니다. 서로 다른 목표 간 우열 비교를 하지 않았고 Ensemble의 정확도 개선을 주장하지 않습니다. 9개월·수수료 0.1% 백테스트는 팀 전체 LLM 판단 파이프라인 조건으로만 표시했습니다. 최대 손실 절감률 89.3%는 충분한 산식·비교 조건 확인 전까지 대표 성과에서 제외. 개인 회고의 사적 여건은 옮기지 않았습니다.
- LLM: 5지선다 1번 정답 61.74%, 기준 0.7600·오류 제거 0.7711·리밸런스 0.7734를 보고서 표대로 제시. 2,031건은 팀 분담 총량. DPO Loss 0 원인 미확정, CoT 추가 학습 효과 미검증. SFT·Thinking 점수 비교에는 보고서 안에서도 기준·증가량 불일치가 있어 새 개인 성과로 사용하지 않았습니다. 종료일 오기는 그대로 보류.
- ODQA: 개인 EDA·앙상블과 팀 입력 길이 실험을 구분. Eval 384→512는 F1 65.19→67.11이나 EM은 상승하지 않음. Public 78.66은 Curriculum Learning 결과이며 최초 Baseline이나 앙상블 개별 기여도의 통제 비교가 아님. 4종 가중치 세 조합과 Public/Private F1을 그대로 표시. Logit은 정규화된 확률과 구분. 최종 팀 성적 Public 4/16, Private 7/16. Retriever·Reranker 전체는 개인 구현으로 주장하지 않음.
- Bio AI: 기존 연구와 Explorer를 소개하되, 실제 기능 예측 모델로 표현하지 않습니다. 기존 연구 수치와 해석 한계·원자료 검증 설명을 보존했습니다. 연구의 개인 분담 미확인.
- 보안: 기존 공개 story·경험 문서의 2026년 8월 학습과 웹앱 경험만 채택. 대화에서 언급된 Byte Back·ZTNA/XDR·인증/RLS 등은 원본 근거가 없어 구현 사실로 기재하지 않았습니다.
- Skills: LLM 전처리·학습 시도와 ODQA Reader·앙상블을 분리하고 해당 상세로 연결. Retriever·Reranker는 팀 맥락으로만 표시. 숙련도 수치 없음.
- Experience: 학습·프로젝트 경험이며 재직 경력이 아닙니다. 과정 전체 기간·수료·학력 상세는 창작하지 않았습니다.

## 지원 문서 동기화 · 2026-11-09

`public/documents/resume.md`와 `experience.md`는 위 프로젝트별 채택 범위 및 `data/projects.ts`와 동일한 사실을 사용합니다. ODQA·LLM·원자재의 팀 성과와 개인 작업, 영화 리뷰 참가 인원 불일치, Bio 연구 분담의 미확인 상태를 보존했습니다. 기록 통계는 기존 `data/growth-stats.json`의 집계입니다. 새로운 원본 자료나 검증하지 않은 역할·수치는 추가하지 않았습니다.

PDF 본문은 Markdown에서 생성하고 본문·링크를 대조했습니다. 자기소개서·논문·기존 ZIP은 이번 개정 범위 밖입니다. PDF와 다운로드 원문을 함께 갱신하는 방법은 README와 AGENTS.md에 기록했습니다.

## 공개 범위

기존 공개 이름과 승인된 연락처만 유지합니다. 새 콘텐츠에 팀원 개인정보, 전화번호, 주소, 원본 리추얼, 인증 정보는 추가하지 않습니다. 정규식 검사는 이름·자유문장 전체의 비공개 여부를 보장하지 않으므로 새 문장도 수동 검토합니다.
