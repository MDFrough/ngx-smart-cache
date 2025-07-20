import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_CONTEXT, CacheOptions } from './with-cache';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cacheService: CacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const options: CacheOptions = req.context.get(CACHE_CONTEXT);

        if (req.method !== 'GET' || options.skip) {
            return next.handle(req);
        }

        const key = this.cacheService.generateKey(req);
        const cached = this.cacheService.get(key);

        if (cached) {
            return of(cached);
        }

        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cacheService.set(key, event, options);
                }
            })
        );
    }
}