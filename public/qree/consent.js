/* QREE first-visit consent. Shown once per browser; choice is kept in localStorage. */
(function () {
  'use strict';
  var KEY = 'qree_consent_v1';
  if (/(^|\/)(terms|privacy)(\.html)?\/?$/.test(location.pathname)) return; // never block the legal pages

  function accepted() {
    try { return !!localStorage.getItem(KEY); } catch (e) { return !!window.__qreeConsent; }
  }
  function remember() {
    try { localStorage.setItem(KEY, JSON.stringify({ v: 1, t: Date.now() })); } catch (e) { window.__qreeConsent = true; }
  }
  if (accepted()) return;

  var base = '';
  try { base = document.currentScript.src.replace(/consent\.js(\?.*)?$/, ''); } catch (e) {}

  var css = '' +
    '.qc-ov{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(5,7,12,.72);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);animation:qc-fade .25s ease both}' +
    '.qc-card{position:relative;width:min(400px,100%);padding:24px;border:1px solid var(--ln,rgba(255,255,255,.12));border-radius:22px;background:var(--surface,#10131c);color:var(--tx,#f5f7ff);text-align:center;box-shadow:0 36px 90px -30px rgba(0,0,0,.8),0 0 70px -40px var(--vi,#7c5cff);font-family:Manrope,system-ui,sans-serif;animation:qc-rise .35s cubic-bezier(.2,.8,.2,1) both}' +
    '.qc-badge{display:grid;place-items:center;width:42px;height:42px;margin:0 auto;border-radius:13px;color:#fff;background:linear-gradient(135deg,var(--cy,#28d7ff),var(--vi,#7c5cff));box-shadow:0 12px 26px -12px var(--vi,#7c5cff)}' +
    '.qc-badge svg{width:21px;height:21px}' +
    '.qc-title{margin:14px 0 0;font:600 22px/1.15 "Space Grotesk",Manrope,sans-serif;letter-spacing:-.03em;color:var(--tx,#f5f7ff)}' +
    '.qc-text{margin:8px 0 0;color:var(--mu,#a5abc0);font-size:13.5px;line-height:1.6}' +
    '.qc-actions{display:flex;gap:10px;margin-top:20px}' +
    '.qc-btn{flex:1;min-height:46px;padding:0 16px;border-radius:999px;border:1px solid var(--ln,rgba(255,255,255,.12));background:transparent;color:var(--tx,#f5f7ff);font:700 14px Manrope,system-ui,sans-serif;cursor:pointer;transition:transform .18s,box-shadow .2s,border-color .2s}' +
    '.qc-btn:hover{transform:translateY(-1px)}' +
    '.qc-btn:focus-visible,.qc-link:focus-visible{outline:2px solid var(--cy,#28d7ff);outline-offset:3px}' +
    '.qc-primary{flex:1.5;border:0;color:#fff;background:linear-gradient(100deg,var(--vi,#7c5cff),var(--cy,#28d7ff));box-shadow:0 14px 30px -14px var(--vi,#7c5cff)}' +
    '.qc-link{display:inline-block;margin-top:14px;color:var(--mu,#a5abc0);font-size:12px;text-decoration:underline;text-underline-offset:3px}.qc-link:hover{color:var(--cy,#28d7ff)}' +
    '.qc-hide{display:none!important}' +
    'html.qc-lock,html.qc-lock body{overflow:hidden!important}' +
    '@keyframes qc-fade{from{opacity:0}to{opacity:1}}@keyframes qc-rise{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}' +
    '@media(max-width:600px){.qc-ov{align-items:flex-end;padding:0}.qc-card{width:100%;padding:22px 18px calc(18px + env(safe-area-inset-bottom,0px));border-radius:22px 22px 0 0}.qc-actions{flex-direction:column-reverse}.qc-btn,.qc-primary{flex:none;width:100%}}' +
    '@media(prefers-reduced-motion:reduce){.qc-ov,.qc-card{animation:none}}';

  var SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z"/><path d="m9.5 12 1.7 1.7 3.5-3.5"/></svg>';

  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function txt(tag, cls, s) { var n = el(tag, cls); n.textContent = s; return n; }

  function build() {
    var st = document.createElement('style');
    st.id = 'qc-style'; st.textContent = css; document.head.appendChild(st);

    var ov = el('div', 'qc-ov'); ov.id = 'qreeConsent';
    var card = el('div', 'qc-card');
    card.setAttribute('role', 'dialog'); card.setAttribute('aria-modal', 'true');
    card.setAttribute('aria-labelledby', 'qcTitle'); card.setAttribute('aria-describedby', 'qcText');

    /* main view */
    var main = el('div', 'qc-main');
    main.appendChild(el('div', 'qc-badge', SHIELD));
    var h = txt('h2', 'qc-title', 'Before you start'); h.id = 'qcTitle'; main.appendChild(h);
    var p = txt('p', 'qc-text', 'Please use QREE lawfully: no scams, phishing, malware or illegal content. By continuing, you accept our Terms.'); p.id = 'qcText'; main.appendChild(p);
    var acts = el('div', 'qc-actions');
    var no = txt('button', 'qc-btn', 'Decline'); no.type = 'button';
    var yes = txt('button', 'qc-btn qc-primary', 'I agree, continue'); yes.type = 'button';
    acts.appendChild(no); acts.appendChild(yes); main.appendChild(acts);
    var a = txt('a', 'qc-link', 'Terms'); a.href = base + 'terms'; a.target = '_blank'; a.rel = 'noopener'; main.appendChild(a);

    /* declined view */
    var dec = el('div', 'qc-declined qc-hide');
    dec.appendChild(el('div', 'qc-badge', SHIELD));
    dec.appendChild(txt('h2', 'qc-title', 'Consent needed'));
    dec.appendChild(txt('p', 'qc-text', 'You need to agree to use QREE.'));
    var acts2 = el('div', 'qc-actions');
    var leave = txt('button', 'qc-btn', 'Leave site'); leave.type = 'button';
    var back = txt('button', 'qc-btn qc-primary', 'Review again'); back.type = 'button';
    acts2.appendChild(leave); acts2.appendChild(back); dec.appendChild(acts2);

    card.appendChild(main); card.appendChild(dec); ov.appendChild(card); document.body.appendChild(ov);
    document.documentElement.classList.add('qc-lock');

    var prevFocus = document.activeElement;
    yes.focus();

    function close() {
      document.documentElement.classList.remove('qc-lock');
      document.removeEventListener('keydown', onKey, true);
      ov.remove();
      var s = document.getElementById('qc-style'); if (s) s.remove();
      if (prevFocus && prevFocus.focus) try { prevFocus.focus(); } catch (e) {}
    }
    function onKey(e) {
      if (e.key !== 'Tab') return;
      var view = main.classList.contains('qc-hide') ? dec : main;
      var f = view.querySelectorAll('a[href],button');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (!card.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', onKey, true);

    yes.addEventListener('click', function () { remember(); close(); });
    no.addEventListener('click', function () { main.classList.add('qc-hide'); dec.classList.remove('qc-hide'); back.focus(); });
    back.addEventListener('click', function () { dec.classList.add('qc-hide'); main.classList.remove('qc-hide'); yes.focus(); });
    leave.addEventListener('click', function () { location.href = 'about:blank'; });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
