# 🔥 @mdfrough/ngx-smart-cache

> A lightweight, flexible caching layer for Angular `HttpClient` — with full support for standalone APIs and NgModules.

[![npm version](https://img.shields.io/npm/v/@mdfrough/ngx-smart-cache.svg)](https://www.npmjs.com/package/@mdfrough/ngx-smart-cache)
[![Angular](https://img.shields.io/badge/Angular-15%2B-red)](https://angular.io)
[![License](https://img.shields.io/npm/l/@mdfrough/ngx-smart-cache.svg)](LICENSE)

---

## ✨ Features

- ✅ TTL-based per-request caching  
- 🔁 In-memory cache for fast re-use of HTTP responses  
- 🏷 Tag-based cache invalidation  
- 🚫 Easily skip cache on-demand  
- 🚀 Works with both `HttpInterceptorFn` (Angular 15+) and `HTTP_INTERCEPTORS` for older apps

---

## 📦 Installation

```bash
npm install @mdfrough/ngx-smart-cache
```

---

## 🚀 Quick Start

### ✅ Enable the Interceptor

#### Option A: Standalone App (Angular 15+)

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { cacheInterceptor } from '@mdfrough/ngx-smart-cache';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([cacheInterceptor]))
  ]
});
```

#### Option B: NgModule App

```ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from '@mdfrough/ngx-smart-cache';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ]
})
export class AppModule {}
```

---

## 🧠 Caching Requests with `withCache()`

```ts
import { withCache } from '@mdfrough/ngx-smart-cache';

this.http.get('/api/products', {
  context: withCache({
    ttl: 60000,       // cache for 60 seconds
    tag: 'products',  // optional group tag
  })
}).subscribe(data => {
  console.log('Loaded:', data);
});
```

---

## ❌ Skip Caching on Specific Calls

```ts
this.http.get('/api/users', {
  context: withCache({ skip: true })
});
```

---

## 🧹 Invalidate Cache Manually

```ts
import { CacheService } from '@mdfrough/ngx-smart-cache';

constructor(private cacheService: CacheService) {}

clearProductsCache() {
  this.cacheService.invalidateByTag('products');
}
```

---

## ⚙️ API Reference

### `withCache(options)`

| Option   | Type     | Description                                  |
|----------|----------|----------------------------------------------|
| `ttl`    | `number` | Time to live (ms) — how long to cache        |
| `tag`    | `string` | Optional tag for manual group invalidation   |
| `skip`   | `boolean`| Bypass cache and fetch fresh data            |

---

## 🧱 How It Works

- Wraps Angular's `HttpClient` with a smart interceptor  
- Uses `HttpContext` to control per-request behavior  
- Stores cached responses in memory using a TTL expiration strategy  
- Compatible with Angular 15+ (both module and standalone styles)

---

## 📌 Angular Compatibility

| Angular Version | Support Type       |
|------------------|--------------------|
| 15+              | ✅ Fully Supported |
| 14 and below     | ⚠️ Use class interceptor only (no `HttpInterceptorFn`) |

---

## 🧪 Example

```ts
ngOnInit() {
  this.loadData();
}

loadData() {
  this.http.get('https://dummyjson.com/products', {
    context: withCache({ ttl: 60000, tag: 'products' })
  }).subscribe(data => console.log('Loaded:', data));
}
```

---

## 🧱 Architecture

```txt
HttpClient ➜ cacheInterceptor ➜ HttpBackend
             ▲         |
             |         ▼
         CacheService <➜> In-Memory Store (Map)
```

---

## 🧪 Roadmap

- [ ] LocalStorage / IndexedDB support  
- [ ] Global cache policy (e.g. `network-first`, `stale-while-revalidate`)  
- [ ] Observable cache invalidation (RxJS-based)

---

## 🛡 License

MIT © Your Name

---

## 🙌 Contributions

PRs and issues welcome! Let’s build faster Angular apps together 🚀
