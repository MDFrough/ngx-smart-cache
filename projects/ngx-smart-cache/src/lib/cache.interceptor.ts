// projects/ngx-smart-cache/src/lib/cache.interceptor.ts
import {
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn,
    HttpResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { CACHE_CONTEXT, CacheOptions } from './with-cache';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
    const cacheService = inject(CacheService);
    const options: CacheOptions = req.context.get(CACHE_CONTEXT);

    if (req.method !== 'GET' || options.skip) {
        return next(req);
    }

    const key = cacheService.generateKey(req);
    const cached = cacheService.get(key);

    if (cached) {
        return of(cached);
    }

    return next(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                cacheService.set(key, event, options);
            }
        })
    );
};
