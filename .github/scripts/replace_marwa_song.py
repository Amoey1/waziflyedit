from pathlib import Path

OLD = 'https://cdn1.suno.ai/de8cdd97-18b4-423f-87e3-da4d6dbd8667.mp3'
NEW = 'https://cdn1.suno.ai/5878b6d7-f65b-4fd2-87a3-d978e96fe324.mp3'

for name in ('marwa-motion.html', 'marwa-motion-fixed.html'):
    p = Path(name)
    s = p.read_text(encoding='utf-8')
    if OLD not in s and NEW not in s:
        raise SystemExit(f'Expected Marwa song URL not found in {name}')
    s = s.replace(OLD, NEW)
    p.write_text(s, encoding='utf-8')

print('Replaced Marwa song URL only')
