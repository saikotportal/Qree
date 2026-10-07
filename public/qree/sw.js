const CACHE='qree-v17';
const ASSETS=['./','./index.html','./site.css','./site.js','./shared-shell.js','./i18n.js','./consent.js','./errors.css','./errors.js','./404.html','./503.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./favicon.ico','./favicon-32x32.png','./favicon-16x16.png','./favicon-48x48.png','./apple-icon.png','./tools/scanner.html','./tools/jsQR.js','./tools/qrcode.js','./backtop.js','./about.html'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Pages, CSS and JS are network-first so a deploy reaches returning visitors immediately;
// the cache is only the offline fallback. Other assets (icons, images) stay cache-first.
const fresh=request=>request.mode==='navigate'||/\.(?:html|css|js)$/i.test(new URL(request.url).pathname);
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
  if(fresh(request)){
    event.respondWith(fetch(request).then(response=>{
      if(response&&response.ok&&response.type==='basic'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy))}
      return response;
    }).catch(()=>caches.match(request).then(cached=>cached||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
    if(response&&response.ok&&response.type==='basic'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy))}
    return response;
  }).catch(()=>caches.match('./index.html'))));
});
