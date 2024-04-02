import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from './cache.service';
import { Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private HttpClient: HttpClient, private cacheService: CacheService) { }

  Get<T>(endPoint: string) {
    return this.HttpClient.get<T>(endPoint);
  }

  GetDataById(id: number, httpEndPoint: string): Observable<any> {
    const cachedData = this.cacheService.get(id);
    if (cachedData) {
      return of(cachedData);
    } else {
      return this.HttpClient.get<any>(httpEndPoint).pipe(
        tap(data => this.cacheService.set(id, data))
      );
    }
  }

}
