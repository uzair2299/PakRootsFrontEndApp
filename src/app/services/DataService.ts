import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();


  private menuSource :  BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  public menu$ = this.menuSource.asObservable();

  emitData(data: any) {
    this.dataSubject.next(data);
  }

  setMenuData(menuData: any[]) {
    this.menuSource.next(menuData);
  }

  
}