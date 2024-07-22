import { DataService } from '../../services/DataService';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isOpen: string | null = null;
  receivedData: any;
  private subscription: Subscription | undefined;
  menu: any[] = [];

  constructor(private dataService: DataService){}
  
  ngOnInit() 
  {
    this.subscription = this.dataService.data$.subscribe(data => {
    this.receivedData = data;
    console.log("data received",this.receivedData);
  });

  this.dataService.menu$.subscribe(menuData => {
    this.menu = menuData;
    console.log(menuData)
  });
}

ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
    console.log("data unsubscribe");
  }
}
  
  toggle(item: string) {
    this.isOpen = this.isOpen === item ? null : item;
  }

  
}

