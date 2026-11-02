"""Verify determinism, order independence, validation, privacy, and expected counts."""
import argparse
import copy
import hashlib
import json
from pathlib import Path
from update import aggregate, outputs, encode


def expect_error(data):
    try:
        aggregate(data)
    except (ValueError, TypeError):
        return
    raise AssertionError('Invalid input was accepted')


def verify(data):
    first, second = outputs(data), outputs(copy.deepcopy(data))
    assert first == second
    shuffled = copy.deepcopy(data)
    shuffled['days'].reverse()
    assert first == outputs(shuffled)
    stats = aggregate(data)
    assert sum(stats['strength'].values()) == stats['closeDays']
    assert sum(m['days'] for m in stats['monthly']) == stats['recordedDays']
    # Inject an arbitrary secret/name in free text; no output bytes may change.
    mutated = copy.deepcopy(data)
    for d in mutated['days']:
        for key in ('open', 'close'):
            if d[key]:
                d[key] = [s if s.strip().startswith('강점 행동:') else 'PRIVATE_SENTINEL_비공개인물' for s in d[key]]
    assert first == outputs(mutated)
    invalid = copy.deepcopy(data)
    invalid['days'].append(invalid['days'][0])
    expect_error(invalid)
    for field, value in [('date', '2026-02-30'), ('date', '20261102'), ('open', 'wrong'), ('close', [123])]:
        invalid = copy.deepcopy(data)
        invalid['days'][0][field] = value
        expect_error(invalid)
    invalid = copy.deepcopy(data)
    invalid['days'][0]['close'] = ['강점 행동: 실천했다', '강점 행동: 일부 실천했다']
    expect_error(invalid)
    edge = {'days': [{'date': '2026-01-01','open': ['  '], 'close': None}, {'date': '2026-01-02','open': None,'close': ['회고']} ]}
    assert aggregate(edge)['strength']['other'] == 1
    assert aggregate(edge)['recordedDays'] == 1
    return {'status': 'PASS', 'checks': ['byte-identical repeat','row-order independence','aggregate invariants','free-text non-disclosure','duplicate rejection','date/type validation','ambiguous status rejection','blank/null handling'],
            'sha256': {n: hashlib.sha256(b).hexdigest() for n,b in first.items()}, 'stats': stats}


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--input', type=Path, default=Path(__file__).parent/'fixtures'/'synthetic.json')
    p.add_argument('--report', type=Path)
    a = p.parse_args()
    result = verify(json.loads(a.input.read_text(encoding='utf-8-sig')))
    if a.report:
        a.report.parent.mkdir(parents=True, exist_ok=True)
        a.report.write_bytes(encode(result))
    print(json.dumps({'status': result['status'], 'checks': len(result['checks'])}))
