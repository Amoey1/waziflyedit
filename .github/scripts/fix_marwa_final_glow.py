from pathlib import Path

files = [Path('marwa-motion.html'), Path('marwa-motion-fixed.html')]

old = "#ending.show h3{animation:premiumFinalGlow 2.45s ease-in-out infinite;text-shadow:0 0 0 rgba(238,212,141,0)}"
new = "#ending.letter-opening h3{opacity:0;animation:finalLine .5s 1s ease forwards,premiumFinalGlow 2.45s 1.6s ease-in-out infinite;text-shadow:0 0 0 rgba(238,212,141,0)}"

for p in files:
    s = p.read_text(encoding='utf-8')
    if old in s:
        s = s.replace(old, new, 1)
    elif new not in s:
        raise SystemExit(f'Expected final glow rule not found in {p}')

    # Safety checks: the final congratulation text must exist and the visibility-preserving animation must be present.
    if 'مبروك يا خريجتي. ❤️' not in s:
        raise SystemExit(f'Final congratulation text missing in {p}')
    if 'finalLine .5s 1s ease forwards,premiumFinalGlow' not in s:
        raise SystemExit(f'Final glow sequencing fix missing in {p}')

    p.write_text(s, encoding='utf-8')

print('Fixed final congratulation visibility while preserving premium glow')
