import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // service to transition data from components that are not children to other using RxJs library

  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isDataChange: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  setData(data: any): void {
    this.dataSubject.next(data);
  }

  getData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

}
