const cacheName = "NiceKopi-ldycntka"
const preCache = ["/", "/style.css","/script.js", 
                "/img/about-bg.jpg", "/img/hero-bg.jpeg",
                "/img/menu/menu1.jpeg","/img/menu/menu2.jpeg", "/img/menu/menu3.jpeg",
                "/img/menu/menu4.jpg", "/img/menu/menu5.jpg", "/img/menu/menu6.jpg"]

self.addEventListener("install",(e) => {
    console.log("service worker installed")

    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName)
            cache.addAll(preCache)
        })(),
    )
})

self.addEventListener("fetch", (e)=>{
    e.respondWith((async ()=> {
        const cache = await caches.open(cacheName)
        const resCache = await caches.match(e.request)

        if(resCache) return resCache

        try{
            const res = await fetch(e.request)

            cache.put(e.request, res.clone())
            return res
            }catch (error) {
                console.log(error)
            }
    })())
})

