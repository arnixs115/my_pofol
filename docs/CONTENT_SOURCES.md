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

- 감성분석: Public 24위 / Private 12위는 기존 보고서 캡처와 일치. 사용자가 PDF 코멘트에서 참가 인원을 **219명**으로 확인했습니다. 이어 제공한 리더보드 이미지 3장을 Accuracy 자료라고 명시하고 **위 Public / 아래 Private**임을 직접 확인해 최종 0.8395·0.8391과 단계별 제출 기록을 추가했습니다. 기존 총원·지표명 미확인 상태는 해소했습니다. 서로 다른 제출의 점수 차이를 개별 기법의 통제된 개선 효과로 표현하지 않습니다.
- 원자재: Positive 0.5916·Negative 0.5149는 이진, Tri-label·Ensemble 0.4109는 3분류 Accuracy입니다. 서로 다른 목표 간 우열 비교를 하지 않았고 Ensemble의 정확도 개선을 주장하지 않습니다. 9개월·수수료 0.1% 백테스트는 팀 전체 LLM 판단 파이프라인 조건으로만 표시했습니다. 최대 손실 절감률 89.3%는 충분한 산식·비교 조건 확인 전까지 대표 성과에서 제외. 개인 회고의 사적 여건은 옮기지 않았습니다.
- LLM: 5지선다 1번 정답 61.74%, 기준 0.7600·오류 제거 0.7711·리밸런스 0.7734를 보고서 표대로 제시. 2,031건은 팀 분담 총량. DPO Loss 0 원인 미확정, CoT 추가 학습 효과 미검증. SFT·Thinking 점수 비교에는 보고서 안에서도 기준·증가량 불일치가 있어 새 개인 성과로 사용하지 않았습니다. 종료일은 2026-11-09 본인 확인에 따라 2026.01.06으로 정정했습니다.
- ODQA: 개인 EDA·앙상블과 팀 입력 길이 실험을 구분. Eval 384→512는 F1 65.19→67.11이나 EM은 상승하지 않음. Public 78.66은 Curriculum Learning 결과이며 최초 Baseline이나 앙상블 개별 기여도의 통제 비교가 아님. 4종 가중치 세 조합과 Public/Private F1을 그대로 표시. Logit은 정규화된 확률과 구분. 최종 팀 성적 Public 4/16, Private 7/16. Retriever·Reranker 전체는 개인 구현으로 주장하지 않음.
- Bio AI: 기존 연구와 Explorer를 소개하되, 실제 기능 예측 모델로 표현하지 않습니다. 기존 연구 수치와 해석 한계·원자료 검증 설명을 보존했습니다. 2026-11-09 본인이 AI 도구의 도움을 받아 개인으로 진행했음을 확인했습니다. 팀 분업 연구나 AI 도움 없는 독립 구현으로 표현하지 않습니다.
- 보안: 기존 공개 story·경험 문서의 2026년 8월 학습·웹앱 경험에, 아래 본인 확인에 따른 라우터 연결 실습·GNS 프로젝트 파일 보유를 추가했습니다. Byte Back·ZTNA/XDR·인증/RLS 등의 상세 구현은 별도 근거 확인이 필요합니다.
- Skills: LLM 전처리·학습 시도와 ODQA Reader·앙상블을 분리하고 해당 상세로 연결. Retriever·Reranker는 팀 맥락으로만 표시. 숙련도 수치 없음.
- Experience: 학습·프로젝트 경험이며 재직 경력이 아닙니다. 과정 전체 기간·수료·학력 상세는 창작하지 않았습니다.

## 지원 문서 동기화 · 2026-11-09

`public/documents/resume.md`와 `experience.md`는 위 프로젝트별 채택 범위 및 `data/projects.ts`와 동일한 사실을 사용합니다. ODQA·LLM·원자재의 팀 성과와 개인 작업을 구분했습니다. 영화 리뷰 인원·Accuracy, Bio 연구 형태·LLM 종료일 등은 아래 본인 확인 사항을 함께 반영했습니다. 기록 통계는 기존 `data/growth-stats.json`의 집계입니다.

PDF 본문은 Markdown에서 생성하고 본문·링크를 대조했습니다. 자기소개서·논문·기존 ZIP은 이번 개정 범위 밖입니다. PDF와 다운로드 원문을 함께 갱신하는 방법은 README와 AGENTS.md에 기록했습니다.

## 본인 확인 사항 · 2026-11-09

사용자가 이 채팅에서 직접 확인한 이력 정보를 사이트·이력서·경험기술서에 반영했습니다. 아래 사항은 공개 보고서로 독립 검증한 결과와 구분되는 본인 제공 정보입니다. 이 확인으로 기존의 해당 미확인 표기를 해소했으며, 공개 저장소의 과거 오기까지 변경한 것은 아닙니다.

- 수능형 LLM 프로젝트 종료일: **2026.01.06**.
- 영화 리뷰: **모델 개발·리더보드 제출은 개인 프로젝트**. 팀으로 함께 공부하고 다른 리더보드 참여자들과 실험 과정·결과를 자주 공유. 팀 리더 역할이나 공동 제출을 주장하지 않음.
- 영화 리뷰 후속 확인: 참가 인원 **219명**, 제출 이미지의 두 점수는 **Public / Private Accuracy**. 이미지에 보이는 날짜·표시 이름·수치만 옮겼으며 생략된 전체 제출명·모델 구성은 추정하지 않음.
- Protein GO Research & Explorer: **AI 도구의 도움을 받아 개인으로 진행한 연구·앱 제작**. 별도 팀원과의 분업으로 쓰지 않으며, AI 보조 사실을 보존.
- SKT-ALEPH: **라우터 연결 실습 경험과 GNS 프로젝트 파일 보유**. 실습 글·사진은 아직 정리하지 않았고 추후 보완할 항목. 이 작업에서 파일을 열거나 실행하지 않았으므로 토폴로지·설정·연결 성공률·장비 수·네트워크 프로토콜은 추정하지 않음.

## 영화 리뷰 제출 기록과 PDF 문장 교정 · 2026-11-09

본인 첨부 리더보드 이미지에서 2025.10.23·10.28·10.29·10.30의 대표 제출을 확인했습니다. baseline 0.8074/0.8048, bertkorbase 0.8226/0.8206, bertkor-focal 0.7778/0.7780, ensemble 0.8358/0.8367, ensemble5 0.8375/0.8363, weighted_ensemble5(10/28 17:16) 0.8371/0.8381, kfold_ensemble 0.8361/0.8376, 최종 표시 기록(10/30 17:12) 0.8395/0.8391을 채택했습니다. 모든 쌍은 Public/Private Accuracy입니다.

기준 대비 최종 차이는 Public (0.8395-0.8074)×100=3.21%p, Private (0.8391-0.8048)×100=3.43%p입니다. weighted_ensemble5와 ensemble5는 Public과 Private의 변화 방향이 달라, 가중 앙상블이 두 평가를 모두 개선했다고 쓰지 않았습니다. K-Fold의 성공 제출이 확인되므로 “시도만 하고 전부 실패”로 읽히지 않게 문장을 정리했습니다. TAPT만의 효과를 분리한 수치는 추가하지 않았습니다. 원본 이미지·개인 식별 화면은 새로 게시하지 않았습니다.

PDF 코멘트의 “개인 회고에서는”, “공개 저장소·기존 포트폴리오와 제공된 보고서의 순위 캡처를 대조했습니다”는 지원자 자신의 경험을 직접 설명하는 문장으로 교정했습니다. 사실 대조 과정은 본문에서 제거하고 이 출처 문서에 유지했습니다.

후속 PDF 코멘트에서 본인이 `ensemble`은 3개 모델 결합, `ensemble5`는 사용 가능한 5개 모델 전체 결합, `weighted`는 가중치 적용이라고 확인했습니다. 이 설명에 따라 해당 제출의 구성을 경험기술서와 사이트에 풀어 썼습니다. 구체적인 3개·5개 모델의 이름이나 각 제출의 가중치 값까지 새로 추정하지 않았고 Accuracy는 그대로 유지했습니다.

## 공개 범위

기존 공개 이름과 승인된 연락처만 유지합니다. 새 콘텐츠에 팀원 개인정보, 전화번호, 주소, 원본 리추얼, 인증 정보는 추가하지 않습니다. 정규식 검사는 이름·자유문장 전체의 비공개 여부를 보장하지 않으므로 새 문장도 수동 검토합니다.
