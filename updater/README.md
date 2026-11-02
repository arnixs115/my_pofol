# 리추얼 갱신 장치

Python 3.10 이상, 표준 라이브러리만 사용합니다. API 키·AI API·네트워크·현재 시각·난수에 의존하지 않습니다. 원본 리추얼과 소설은 이 폴더나 저장소에 넣지 마세요.

## 재현 예제

프로젝트 루트에서 실행합니다.

```sh
python updater/update.py --input updater/fixtures/synthetic.json --output ../staging-example
python updater/verify.py --report ../verification-example.json
```

예제의 기대값: 기록일 3, 아침 3, 마무리 2, 실천 1, 일부 실천 1. 예제는 합성 데이터이며 실제 기록이 아닙니다.

## 실제 기록 갱신

```sh
python updater/update.py --input /absolute/private/ritual.json --output ../staging-private
python updater/verify.py --input /absolute/private/ritual.json --report ../verification-private.json
```

1. 비공개 입력을 저장소 바깥에서 읽습니다. 필수 구조는 `days: [{date: "YYYY-MM-DD", open: [문자열] 또는 null, close: [문자열] 또는 null}]`입니다. 각 날짜 객체의 추가 키, 중복 날짜, 날짜 오류, 잘못된 자료형, 중복 강점 상태는 거부합니다. 최상위 이름 등 메타데이터는 무시합니다.
2. 날짜를 정렬하고 세션의 비어 있지 않은 문자열 존재 여부로 기록을 집계합니다. `강점 행동: 실천했다`와 `강점 행동: 일부 실천했다`를 정확히 분류하고 나머지·미응답은 기타로 집계합니다. 같은 날은 한 번만 셉니다. 집계 기간은 실제 세션이 있는 첫날과 마지막 날입니다.
3. 생성된 `growth-stats.json`을 검토한 후 `data/growth-stats.json`에 복사하고 다시 빌드합니다. 원문·사람 이름·날짜별 회고는 출력하지 않습니다. 같은 의미의 날짜 순서 변경에도 동일한 UTF-8/LF JSON 바이트를 생성합니다.
4. `paragraph-candidate.json`은 **수치만으로 만든 검토 후보**입니다. 자동 게시하지 않습니다. 본인이 검토한 문장만 `data/public-content.json`에 직접 반영하세요. 첫 문장과 마지막 문장도 본인이 확정해야 합니다.
5. `npm ci`, `npm run typecheck`, `npm run build` 후 공개 자료 검사를 실행합니다. `out/`만 호스팅하며 입력과 staging은 전송하지 않습니다. 자동 갱신은 이 명령을 실행하는 방식입니다. 예약 실행이나 서버 스케줄은 설정하지 않았습니다.

## 검증 범위

`verify.py`는 두 번 생성한 바이트, 날짜 순서 변경, 원문에 비공개 센티널 삽입, 합계 일치, 잘못된 입력 거부를 검사합니다. 공개 ZIP에는 합성 예제·코드·집계 검증 결과만 포함하며 실제 원본은 포함하지 않습니다. 원본을 가진 본인은 실제 수치도 재현할 수 있습니다. 원본 없는 사람은 합성 예제의 재현성과 공개 집계 파일의 일관성을 확인할 수 있습니다.

공개 자료 검사는 `python tools/audit.py`로 실행합니다. 구조·알려진 비밀값 형식·연락처·PDF 텍스트를 검사하지만 모든 실명을 자동 식별할 수는 없습니다. 새로 추가한 문장과 PDF는 사람이 읽고 확인해야 합니다.
