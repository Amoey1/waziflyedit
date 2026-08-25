from pathlib import Path

p = Path('marwa-motion.html')
s = p.read_text(encoding='utf-8')

marker = '/* MARWA-START-BUTTON-VISIBLE-FIX */'
if marker not in s:
    fix = marker + '#startJourney{opacity:1!important;visibility:visible!important;pointer-events:auto!important}'
    s = s.replace('</style>', fix + '</style>', 1)

# Extra runtime safety: remove any generic entrance class that could keep the button hidden.
needle = "setTimeout(()=>motionEnter(cur),120);"
replacement = "setTimeout(()=>{const start=$('startJourney');if(start){start.classList.remove('motion-item');start.style.opacity='1';start.style.visibility='visible'}motionEnter(cur)},120);"
if needle in s:
    s = s.replace(needle, replacement, 1)

p.write_text(s, encoding='utf-8')
print('Ensured Marwa motion start button is visible')
