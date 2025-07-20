import { HttpContext, HttpContextToken } from '@angular/common/http';

export interface CacheOptions {
    ttl?: number; // in ms
    skip?: boolean;
    tag?: string;
}

export const CACHE_CONTEXT = new HttpContextToken<CacheOptions>(() => ({}));

export function withCache(options: CacheOptions): HttpContext {
    return new HttpContext().set(CACHE_CONTEXT, options);
}
