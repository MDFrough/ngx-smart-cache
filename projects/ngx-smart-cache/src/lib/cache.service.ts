import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

interface CacheEntry {
    response: HttpResponse<any>;
    addedAt: number;
    ttl: number;
    tag?: string;
}

@Injectable({ providedIn: 'root' })
export class CacheService {
    private cache = new Map<string, CacheEntry>();

    generateKey(req: HttpRequest<any>): string {
        return `${req.method}:${req.urlWithParams}`;
    }

    get(key: string): HttpResponse<any> | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        const isExpired = Date.now() > entry.addedAt + entry.ttl;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }
        return entry.response.clone();
    }

    set(key: string, response: HttpResponse<any>, options: { ttl?: number; tag?: string }) {
        this.cache.set(key, {
            response: response.clone(),
            addedAt: Date.now(),
            ttl: options.ttl || 30000, // default 30s
            tag: options.tag
        });
    }

    invalidateByTag(tag: string) {
        for (const [key, entry] of this.cache.entries()) {
            if (entry.tag === tag) {
                this.cache.delete(key);
            }
        }
    }

    clear() {
        this.cache.clear();
    }
}