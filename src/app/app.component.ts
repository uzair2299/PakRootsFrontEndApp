import { Component,ViewChild,ChangeDetectorRef} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarService } from "./services/SidebarService";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pak-Roots-FrontEnd-App';
  @ViewChild('sideDrawer') drawer!: MatDrawer;
  showTopBar = true;
  isSidebarOpen = true;
  private destroy$ = new Subject<void>();
  

  constructor(private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }


  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.checkActiveRoute();
    });

    this.sidebarService.sidebarState$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isSidebarOpen = !this.isSidebarOpen;
      console.log("drawer",this.drawer)
      console.log("isSidebarOpen",this.isSidebarOpen)
      if (this.drawer) {
        this.drawer.toggle();
        this.cdr.detectChanges(); // Trigger change detection to avoid ExpressionChangedAfterItHasBeenCheckedError
      }
    });

  }

  ngAfterViewInit() {
    // Ensure the drawer's state is set based on the initial route
    this.checkActiveRoute();
    this.cdr.detectChanges(); // Ensure change detection runs after view initialization
  }

  checkActiveRoute() {
    console.log("route url",this.router.url)
    const isLoginRoute = this.router.url.includes('/login');
    console.log("Login state",isLoginRoute);
    this.showTopBar = !isLoginRoute;
    console.log("showTopBar state",this.showTopBar);
    if (this.drawer) {
      if (isLoginRoute) {
        console.log("going to close the drawer")
        this.drawer.close();
        this.isSidebarOpen = false; // Ensure the sidebar is closed after login
      } else {
        console.log("going to open the drawer")
        this.drawer.open();
        this.isSidebarOpen = true; // Ensure the sidebar is closed after login
      }
    }
    
  }
}

