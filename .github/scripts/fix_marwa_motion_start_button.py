from pathlib import Path

p = Path('marwa-motion.html')
s = p.read_text(encoding='utf-8')

# Keep the start button permanently safe.
marker = '/* MARWA-CONTROL-VISIBILITY-FIX */'
if marker not in s:
    fix = marker + '#startJourney{opacity:1!important;visibility:visible!important;pointer-events:auto!important}.scene.on .ans{opacity:1!important;visibility:visible!important}.scene.on .btn:not(.hide){visibility:visible!important}'
    s = s.replace('</style>', fix + '</style>', 1)
else:
    s = s.replace('.scene.on .ans{visibility:visible!important}', '.scene.on .ans{opacity:1!important;visibility:visible!important}')

# Interactive controls must never retain the generic motion-item class,
# because that class starts at opacity:0 and can conflict with click/feedback animations.
old = "function addMotionItems(nodes,start=.08,step=.09){nodes.forEach((el,i)=>{el.classList.remove('motion-item');void el.offsetWidth;el.style.setProperty('--motion-delay',(start+i*step)+'s');el.classList.add('motion-item')})}"
new = "function addMotionItems(nodes,start=.08,step=.09){nodes.forEach((el,i)=>{el.classList.remove('motion-item');if(el.matches('.ans,.btn')){el.style.opacity='1';el.style.visibility='visible';return}void el.offsetWidth;el.style.setProperty('--motion-delay',(start+i*step)+'s');el.classList.add('motion-item');setTimeout(()=>{el.classList.remove('motion-item');el.style.removeProperty('--motion-delay')},900+i*90)})}"
if old in s:
    s = s.replace(old, new, 1)
elif new not in s:
    raise SystemExit('addMotionItems function was not found')

# Runtime safety for all visible controls on every scene entry.
old_enter = "function motionEnter(n){const sc=document.querySelector('[data-s=\"'+n+'\"]');if(!sc)return;document.querySelectorAll('.scene.motion-enter').forEach(x=>x.classList.remove('motion-enter'));sc.classList.add('motion-enter');setTimeout(()=>sc.classList.remove('motion-enter'),1300);"
new_enter = "function motionEnter(n){const sc=document.querySelector('[data-s=\"'+n+'\"]');if(!sc)return;sc.querySelectorAll('.ans,.btn').forEach(el=>{el.classList.remove('motion-item');el.style.opacity='1';el.style.visibility='visible'});document.querySelectorAll('.scene.motion-enter').forEach(x=>x.classList.remove('motion-enter'));sc.classList.add('motion-enter');setTimeout(()=>sc.classList.remove('motion-enter'),1300);"
if old_enter in s:
    s = s.replace(old_enter, new_enter, 1)
elif new_enter not in s:
    raise SystemExit('motionEnter function was not found')

# Initial-page safety remains in place.
needle = "setTimeout(()=>motionEnter(cur),120);"
replacement = "setTimeout(()=>{const start=$('startJourney');if(start){start.classList.remove('motion-item');start.style.opacity='1';start.style.visibility='visible'}motionEnter(cur)},120);"
if needle in s:
    s = s.replace(needle, replacement, 1)

# Sanity check: page 2 must contain all four answers before publishing.
for label in ['<b>A</b>مروى 🎓','<b>B</b>مروى طبعًا','<b>C</b>أكيد مروى','<b>D</b>أنا ما أعرف مروى 😭']:
    if label not in s:
        raise SystemExit(f'Missing page 2 answer: {label}')

p.write_text(s, encoding='utf-8')
Path('marwa-motion-fixed.html').write_text(s, encoding='utf-8')
print('Ensured controls stay visible and published fresh cache-busting copy')
