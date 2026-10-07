(()=>{
const art=document.querySelector('.err-art');
if(art){
  const kind=art.dataset.variant,N=21,S=10,P=12,W=P*2+N*S;
  let seed=kind.charCodeAt(0)*131+kind.charCodeAt(1)*17+kind.charCodeAt(2);
  const rnd=()=>(seed=(seed*1664525+1013904223)>>>0)/4294967296;
  const fin=(x,y)=>(x<8&&y<8)||(x>N-9&&y<8)||(x<8&&y>N-9);
  let m='';
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){
    if(fin(x,y)||rnd()<.5)continue;
    const cx=x-10,cy=y-10;let dx=0,c='';
    if(kind==='404'&&Math.abs(cx)<=4&&Math.abs(cy)<=4)continue;
    if(kind==='500')dx=(y>=6&&y<=8)?18:(y>=13&&y<=14)?-24:0;
    if(kind==='403')c='dim';
    if(kind==='503')c='pulse';
    m+=`<rect x="${P+x*S+dx}" y="${P+y*S}" width="8" height="8" rx="2.5"${c?` class="${c}"`:''}${kind==='503'?` style="animation-delay:${(x+y)*70}ms"`:''}/>`;
  }
  let f='';
  [[0,0],[N-7,0],[0,N-7]].forEach(([fx,fy],i)=>{
    const g=kind==='404'&&i===2?' ghost':'';
    f+=`<rect class="${g}" x="${P+fx*S+S/2}" y="${P+fy*S+S/2}" width="${6*S}" height="${6*S}" rx="${S*1.2}" fill="none" stroke="url(#eg)" stroke-width="${S}"/><rect class="${g}" x="${P+(fx+2)*S}" y="${P+(fy+2)*S}" width="${3*S}" height="${3*S}" rx="${S*.8}"/>`;
  });
  const icons={
    '404':'?',
    '403':'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    '500':'<svg viewBox="0 0 24 24"><path d="M13 3 5 14h6l-1 7 8-11h-6z"/></svg>',
    '503':'<svg viewBox="0 0 24 24"><rect class="f" x="6" y="5" width="4" height="14" rx="1.5"/><rect class="f" x="14" y="5" width="4" height="14" rx="1.5"/></svg>'
  };
  art.insertAdjacentHTML('afterbegin',`<svg class="qr" viewBox="0 0 ${W} ${W}" aria-hidden="true"><defs><linearGradient id="eg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--cy)"/><stop offset=".55" style="stop-color:var(--vi)"/><stop offset="1" style="stop-color:var(--mg)"/></linearGradient></defs><g fill="url(#eg)">${m}${f}</g></svg>${kind==='404'?'<i class="err-scan"></i>':''}<div class="err-badge" aria-hidden="true">${icons[kind]||''}</div>`);
}
const framed=top!==window;
if(framed)document.querySelectorAll('a[href]').forEach(a=>a.target='_top');
document.querySelectorAll('[data-retry]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();
  if(framed)parent.postMessage({qreeRetry:1},location.origin);else location.reload();
}));
const p=document.querySelector('.err-path');
if(p){
  let path=location.pathname;
  try{if(framed)path=top.location.pathname}catch(e){}
  if(path&&!/\/(403|404)\.html$/.test(path)){p.textContent=path.slice(0,90);p.hidden=false}
}
const c=document.querySelector('.err-count');
if(c){
  let n=30;
  const tick=()=>{c.textContent=`Retrying in ${n}s`;if(n--<=0)location.reload()};
  tick();setInterval(tick,1000);
}
})();
