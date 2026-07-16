// ================================================================
// SERVICE WORKER — MathUniverse
// Cache toàn bộ tài nguyên tĩnh để web hoạt động offline sau lần
// truy cập đầu tiên. Chiến lược: cache-first, fallback về network.
// ================================================================

const CACHE_NAME = 'mathuniverse-cache-v14';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './app-core.js',
    './formulas.js',
    './quiz.js',
    './extras.js',
    './style.css',
    './manifest.json',
    './icon.svg'
];

// Cài đặt: lưu toàn bộ tài nguyên tĩnh vào cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Kích hoạt: xóa các cache phiên bản cũ
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Fetch: ưu tiên lấy từ cache trước, nếu không có mới gọi mạng
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                // Lưu thêm các tài nguyên mới tải được (VD: font Google) vào cache
                if (response && response.status === 200 && event.request.url.startsWith('http')) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => cached);
        })
    );
});