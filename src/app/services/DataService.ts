import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


//The issue of the menu options disappearing on page refresh is because the menu data is stored in memory (using BehaviorSubject), and it gets reset when the application reloads.
export class DataService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();


  private menuSource = new BehaviorSubject<any[]>(this.getMenuDataFromLocalStorage());
  menu$ = this.menuSource.asObservable();

  emitData(data: any) {
    this.dataSubject.next(data);
  }

  setMenuData(menuData: any[]) {
    this.menuSource.next(menuData);
    this.setMenuToLocalStorage(menuData);
  }


  private setMenuToLocalStorage(menuData: any[]) {
    localStorage.setItem('menuData', JSON.stringify(menuData));
  }

  
  private getMenuDataFromLocalStorage(): any[] {
    const menuData = localStorage.getItem('menuData');
    return menuData ? JSON.parse(menuData) : [];
  }

}