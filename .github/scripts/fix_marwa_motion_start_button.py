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

# Make the progress counter read visually as 02 / 08 inside the RTL page.
counter_fix = '/* MARWA-COUNTER-DIRECTION-FIX */.count{direction:ltr!important;unicode-bidi:isolate!important;text-align:left}'
if '/* MARWA-COUNTER-DIRECTION-FIX */' not in s:
    s = s.replace('</style>', counter_fix + '</style>', 1)

# Interactive controls must never retain the generic motion-item class.
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

# Give page 7's introductory text one extra second before countdown starts.
old_page7 = "function start7(){if(started)return;started=1;setTimeout(()=>{$('pre').classList.add('hide');$('cd').classList.remove('hide');let n=3;"
if old_page7 in s:
    segment_start = s.index(old_page7)
    segment_end = s.find('function openGift()', segment_start)
    segment = s[segment_start:segment_end]
    if '},1700)}' in segment:
        segment = segment.replace('},1700)}', '},2700)}', 1)
        s = s[:segment_start] + segment + s[segment_end:]
    elif '},2700)}' not in segment:
        raise SystemExit('Page 7 intro delay was not found')

# ---------------------------------------------------------------------------
# Seven premium micro-interactions — visuals only, no content or flow changes.
# 1) Tap ripple
# 2) 3D tilt for gift boxes / main gift
# 3) Spotlight on correct answers
# 4) Flip animation for analysis percentages
# 5) Button success morph
# 6) Audio visualizer tied to play/pause
# 7) Final message glow
# ---------------------------------------------------------------------------
premium_css = r'''/* MARWA-PREMIUM-SEVEN-V1 */
.btn,.ans,.gift-pick{position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent}.ripple-dot{position:absolute;z-index:4;border-radius:50%;pointer-events:none;background:rgba(255,255,255,.42);transform:translate(-50%,-50%) scale(0);animation:premiumRipple .62s ease-out forwards}.ans .ripple-dot{background:rgba(155,86,104,.15)}@keyframes premiumRipple{0%{opacity:.7;transform:translate(-50%,-50%) scale(0)}100%{opacity:0;transform:translate(-50%,-50%) scale(1)}}
.gift-pick.premium-tilting,.gift.premium-tilting{animation:none!important;transition:transform .12s ease,filter .18s ease!important;will-change:transform}.gift-pick.premium-tilting{filter:brightness(1.07) drop-shadow(0 16px 24px rgba(0,0,0,.16))}.gift.premium-tilting{filter:drop-shadow(0 24px 32px rgba(0,0,0,.45))}
.answers.premium-spotlight .ans{transition:opacity .28s ease,filter .28s ease,transform .28s ease!important}.answers.premium-spotlight .ans:not(.premium-spot-target){opacity:.36!important;filter:blur(.25px) saturate(.72);transform:scale(.985)}.answers.premium-spotlight .ans.premium-spot-target{opacity:1!important;filter:brightness(1.035);transform:scale(1.025);box-shadow:0 10px 28px rgba(126,76,89,.14),inset 0 0 0 1px rgba(134,81,96,.12)}
.analysis-percent.premium-flip{transform-origin:center;animation:premiumNumberFlip .48s cubic-bezier(.2,.75,.2,1)}@keyframes premiumNumberFlip{0%{opacity:.25;transform:perspective(500px) rotateX(-70deg) scale(.9)}55%{opacity:1;transform:perspective(500px) rotateX(9deg) scale(1.035)}100%{transform:none}}
.btn.premium-success{color:transparent!important;pointer-events:none}.btn.premium-success:after{content:'✓ تم';position:absolute;inset:0;z-index:6;display:grid;place-items:center;color:#fff;font-weight:900;animation:premiumSuccessPop .36s cubic-bezier(.2,.9,.2,1.22)}.btn.premium-success.gold:after{color:#fff}.final .btn.premium-success:after{color:#fff}@keyframes premiumSuccessPop{0%{opacity:0;transform:scale(.65)}75%{opacity:1;transform:scale(1.08)}100%{transform:scale(1)}}
.audio-visualizer{height:46px;margin:14px 0 2px;display:flex;align-items:center;justify-content:center;gap:4px;padding:7px 9px;border-radius:14px;background:rgba(255,255,255,.045);box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}.audio-visualizer span{width:4px;height:7px;border-radius:99px;background:linear-gradient(180deg,#f1d797,#b66c7e);transform-origin:center;animation:premiumAudioBar var(--dur,850ms) ease-in-out infinite;animation-delay:var(--delay,0ms);animation-play-state:paused;opacity:.62}.audio-visualizer.active span{animation-play-state:running;opacity:1}@keyframes premiumAudioBar{0%,100%{height:6px;transform:scaleY(.8)}25%{height:28px;transform:scaleY(1)}52%{height:13px;transform:scaleY(.9)}78%{height:34px;transform:scaleY(1)}}
#ending.show h3{animation:premiumFinalGlow 2.45s ease-in-out infinite;text-shadow:0 0 0 rgba(238,212,141,0)}@keyframes premiumFinalGlow{0%,100%{transform:scale(1);text-shadow:0 0 0 rgba(238,212,141,0)}50%{transform:scale(1.025);text-shadow:0 0 18px rgba(238,212,141,.42),0 0 36px rgba(182,108,126,.18)}}
@media(hover:none){.gift-pick.premium-tilting,.gift.premium-tilting{transform:none!important}}
'''
if '/* MARWA-PREMIUM-SEVEN-V1 */' not in s:
    s = s.replace('</style>', premium_css + '</style>', 1)

premium_js = r'''/* MARWA-PREMIUM-SEVEN-V1-JS */
(function(){
  // 1) Tap ripple on all interactive controls.
  document.addEventListener('pointerdown',function(e){
    const el=e.target.closest('.btn,.ans,.gift-pick');
    if(!el||el.disabled)return;
    const r=el.getBoundingClientRect(),d=Math.max(r.width,r.height)*2.05;
    const dot=document.createElement('span');dot.className='ripple-dot';
    dot.style.width=dot.style.height=d+'px';dot.style.left=(e.clientX-r.left)+'px';dot.style.top=(e.clientY-r.top)+'px';
    el.appendChild(dot);setTimeout(()=>dot.remove(),700);
  },{passive:true});

  // 2) Gentle 3D tilt on desktop for the boxes and the main gift.
  document.querySelectorAll('.gift-pick,.gift').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      if(e.pointerType!=='mouse')return;
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.classList.add('premium-tilting');
      el.style.transform='perspective(700px) rotateX('+(-y*9)+'deg) rotateY('+(x*11)+'deg) translateY(-3px) scale(1.02)';
    });
    el.addEventListener('pointerleave',()=>{el.classList.remove('premium-tilting');el.style.removeProperty('transform')});
  });

  // 3) Correct-answer spotlight. Inline answer handlers run before this bubble listener.
  document.addEventListener('click',function(e){
    const ans=e.target.closest('.ans');if(!ans||!ans.classList.contains('ok'))return;
    const group=ans.closest('.answers');if(!group)return;
    group.classList.add('premium-spotlight');ans.classList.add('premium-spot-target');
    setTimeout(()=>{group.classList.remove('premium-spotlight');ans.classList.remove('premium-spot-target')},900);
  });

  // 4) Flip every percentage change in the analysis screen.
  const pct=document.getElementById('analysisPercent');
  if(pct)new MutationObserver(()=>{pct.classList.remove('premium-flip');void pct.offsetWidth;pct.classList.add('premium-flip')}).observe(pct,{childList:true,characterData:true,subtree:true});

  // 5) Brief success morph for main continuation buttons before the next state appears.
  document.addEventListener('click',function(e){
    const b=e.target.closest('.scene .btn');
    if(!b||b.id==='downloadSongBtn'||b.disabled)return;
    b.classList.add('premium-success');
    setTimeout(()=>b.classList.remove('premium-success'),620);
  });

  // 6) Visualizer attached to the real audio play/pause state — no cross-origin audio processing required.
  const song=document.getElementById('song');
  if(song&&!document.getElementById('marwaAudioVisualizer')){
    const viz=document.createElement('div');viz.className='audio-visualizer';viz.id='marwaAudioVisualizer';viz.setAttribute('aria-hidden','true');
    const durations=[760,930,680,1040,820,710,980,640,870,720,1010,790,660,940,730,880,690,960];
    durations.forEach((dur,i)=>{const bar=document.createElement('span');bar.style.setProperty('--dur',dur+'ms');bar.style.setProperty('--delay',(-i*73)+'ms');viz.appendChild(bar)});
    song.insertAdjacentElement('afterend',viz);
    const sync=()=>viz.classList.toggle('active',!song.paused&&!song.ended);
    song.addEventListener('play',sync);song.addEventListener('playing',sync);song.addEventListener('pause',sync);song.addEventListener('ended',sync);sync();
  }
})();
'''
if '/* MARWA-PREMIUM-SEVEN-V1-JS */' not in s:
    s = s.replace('</script>', premium_js + '</script>', 1)

# Sanity checks before publishing.
for label in ['<b>A</b>مروى 🎓','<b>B</b>مروى طبعًا','<b>C</b>أكيد مروى','<b>D</b>أنا ما أعرف مروى 😭']:
    if label not in s:
        raise SystemExit(f'Missing page 2 answer: {label}')
for required in ['direction:ltr!important','},2700)}function openGift()','MARWA-PREMIUM-SEVEN-V1','audio-visualizer','premium-spotlight','premium-flip','premium-success']:
    if required not in s:
        raise SystemExit(f'Missing final feature marker: {required}')

p.write_text(s, encoding='utf-8')
Path('marwa-motion-fixed.html').write_text(s, encoding='utf-8')
print('Published Marwa final motion page with seven premium interactions')
