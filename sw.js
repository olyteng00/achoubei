/* 阿臭被零用錢 offline cache — version 98c3c25b3e */
const CACHE="achoubei-98c3c25b3e";
const ASSETS=["./", "index.html", "style.css", "icons.js", "manifest.webmanifest", "senty-core.woff", "icon-180.png", "icon-192.png", "icon-512.png", "lion-wave.webp", "lion-cheer.webp", "lion-wow.webp", "lion-shy.webp", "lion-sad.webp", "lion-sleep.webp"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k.startsWith("achoubei-")).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  const req=e.request; if(req.method!=="GET") return;
  const url=new URL(req.url);
  if(url.origin!==location.origin){
    if(/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) e.respondWith(caches.open(CACHE).then(c=>c.match(req).then(hit=>hit||fetch(req).then(r=>{ c.put(req,r.clone()); return r; }))));
    return;
  }
  const fresh=req.mode==="navigate"||url.pathname.endsWith("/market.json")||url.pathname.endsWith("/index.html");
  if(fresh){ e.respondWith(fetch(req).then(r=>{ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(req.mode==="navigate"?"./":req,cp)); return r; }).catch(()=>caches.match(req.mode==="navigate"?"./":req).then(r=>r||caches.match("index.html")))); return; }
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{ if(r.ok){ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); } return r; })));
});
