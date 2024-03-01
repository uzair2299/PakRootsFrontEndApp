import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isOpen: string | null = null;

  toggle(item: string) {
    this.isOpen = this.isOpen === item ? null : item;
  }

}

