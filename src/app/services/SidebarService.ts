import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarStateSubject = new Subject<boolean>();
  sidebarState$ = this.sidebarStateSubject.asObservable();
  private isSidebarOpen = false;

  constructor() {
    this.sidebarState$.subscribe((open: boolean) => {
      this.isSidebarOpen = open;
    });
  }

  toggleSidebar(open: boolean = !this.isSidebarOpen) {
    this.sidebarStateSubject.next(open);
  }
}