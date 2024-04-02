import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: { [key: string]: any } = {};

  set(key: number, value: any) {
    this.cache[key] = value;
  }

  get(key: number) {
    return this.cache[key];
  }

  clear(key: number) {
    delete this.cache[key];
  }

  clearAll() {
    this.cache = {};
  }
}
