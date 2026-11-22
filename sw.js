/* 阿臭被零用錢 offline cache — version fc5db18424 */
const CACHE="achoubei-fc5db18424";
const ASSETS=["./", "index.html", "style.css", "icons.js", "town-data.js", "manifest.webmanifest", "senty-core.woff", "icon-180.png", "icon-192.png", "icon-512.png", "lion-wave.webp", "lion-cheer.webp", "lion-wow.webp", "lion-shy.webp", "lion-sad.webp", "lion-sleep.webp"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k.startsWith("achoubei-")).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  const req=e.request; if(req.method!=="GET") return;
  const url=new URL(req.url);
  if(url.origin!==location.origin){
    if(/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) e.respondWith(caches.open(CACHE).then(c=>c.match(req).then(hit=>hit||fetch(req).then(r=>{ c.put(req,r.clone()); return r; }))));
    return;
  }
  const key=req.mode==="navigate"?"./":req;
  e.respondWith(fetch(req,{cache:"no-cache"}).then(r=>{ if(r.ok){ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(key,cp)); } return r; }).catch(()=>caches.match(key,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))));
});
