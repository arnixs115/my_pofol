"""Offline, deterministic, aggregate-only ritual updater. Python 3.10+."""
import argparse
import collections
import datetime as dt
import hashlib
import json
import os
from pathlib import Path


def encode(value):
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2) + '\n').encode('utf-8')


def aggregate(data):
    if not isinstance(data, dict) or not isinstance(data.get('days'), list) or not data['days']:
        raise ValueError('Expected a non-empty days array')
    seen, rows = set(), []
    for row in data['days']:
        if not isinstance(row, dict) or set(row) != {'date', 'open', 'close'}:
            raise ValueError('Each day must contain exactly date, open, close')
        date = row['date']
        if not isinstance(date, str) or dt.date.fromisoformat(date).isoformat() != date:
            raise ValueError('Dates must be canonical YYYY-MM-DD')
        if date in seen:
            raise ValueError('Duplicate date; resolve privately before updating')
        seen.add(date)
        for key in ('open', 'close'):
            value = row[key]
            if value is not None and (not isinstance(value, list) or any(not isinstance(s, str) for s in value)):
                raise ValueError('Sessions must be null or arrays of strings')
        normalized = {k: [s.strip() for s in (row[k] or []) if s.strip()] for k in ('open', 'close')}
        statuses = [s.split(':', 1)[1].strip() for s in normalized['close'] if s.startswith('강점 행동:')]
        if len(statuses) > 1:
            raise ValueError('Multiple strength statuses in one day')
        rows.append((date, normalized, statuses))
    rows.sort(key=lambda x: x[0])
    months, counts = {}, collections.Counter()
    recorded = opens = closes = 0
    for date, sessions, statuses in rows:
        active, op, cl = bool(sessions['open'] or sessions['close']), bool(sessions['open']), bool(sessions['close'])
        month = months.setdefault(date[:7], {'month': date[:7], 'days': 0, 'open': 0, 'close': 0})
        recorded += active
        opens += op
        closes += cl
        month['days'] += active
        month['open'] += op
        month['close'] += cl
        if cl:
            value = statuses[0] if statuses else ''
            counts['practiced' if value == '실천했다' else 'partial' if value == '일부 실천했다' else 'other'] += 1
    if not recorded:
        raise ValueError('No recorded sessions')
    active_dates = [d for d, s, _ in rows if s['open'] or s['close']]
    return {'schemaVersion': 1, 'period': {'start': active_dates[0], 'end': active_dates[-1]},
            'recordedDays': recorded, 'openDays': opens, 'closeDays': closes,
            'strength': {k: counts[k] for k in ('practiced', 'partial', 'other')},
            'monthly': list(months.values())}


def outputs(data):
    stats = aggregate(data)
    # Generate from counts only. Never quote free text, student names, or peer fields.
    candidate = {'schemaVersion': 1, 'reviewRequired': True,
        'paragraph': f"{stats['period']['start']}부터 {stats['period']['end']}까지 {stats['recordedDays']}일의 리추얼 기록을 남겼습니다. 아침 기록은 {stats['openDays']}일, 마무리 기록은 {stats['closeDays']}일입니다. 이는 자기보고 기록의 집계입니다."}
    return {'growth-stats.json': encode(stats), 'paragraph-candidate.json': encode(candidate)}


def write_atomic(path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name(path.name + '.tmp')
    temp.write_bytes(payload)
    os.replace(temp, path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', required=True, type=Path, help='Private input outside this repository')
    parser.add_argument('--output', required=True, type=Path, help='Staging directory outside public/')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    public = (root / 'public').resolve()
    destination = args.output.resolve()
    if destination == public or public in destination.parents:
        parser.error('Use a non-public staging directory')
    try:
        data = json.loads(args.input.read_text(encoding='utf-8-sig'))
        generated = outputs(data)
        for name, payload in generated.items():
            write_atomic(destination / name, payload)
        print(json.dumps({'status': 'ok', 'sha256': {n: hashlib.sha256(b).hexdigest() for n, b in generated.items()}}, sort_keys=True))
    except (ValueError, OSError, TypeError, KeyError):
        parser.exit(1, 'Invalid input or output; inspect the source privately. No raw content was logged.\n')


if __name__ == '__main__':
    main()
