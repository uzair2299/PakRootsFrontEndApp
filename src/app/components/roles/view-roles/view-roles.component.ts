import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';
import { AddRoleDialogComponent } from '../add-role-dialog/add-role-dialog.component';
import { HttpParams } from '@angular/common/http';


export interface RolesDto {
  id: number;
  roleName: string;
  description?: string | null; // Optional, can be string or null
}


@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.css']
})
export class ViewRolesComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id', 'roleName', 'description', 'actions'];
  dataSource!: MatTableDataSource<RolesDto>;
  resources: any[] = [];
  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<RolesDto>(this.resources);
    this.getResourcesV1();
  }
  getResourcesV1() {
    this.httpService.get<any>(API_ENDPOINTS.resources_getAllRolesV1)
      .pipe(
        catchError(error => {
          console.error('Error in POST request:', error);
          // Handle the error here or re-throw it to propagate
          // return throwError(error); // Uncomment this line if you want to propagate the error
          return throwError(() => error); // Or return a new observable with the error
        })
      )
      .subscribe({
        next: response => {
          this.resources = response;
          this.dataSource.data = this.resources;
          console.log('Response:', response);
          console.log('POST request successful:', this.resources);
        },
        error: error => {
          console.error('Error in POST request:', error);
        }
      });
  }
  navigateToResource(resourceId: number) {
    this.router.navigate([`roles/assignRolePermissionById`, resourceId]);
  }

  navigateToRoleDetail(resourceId: number) {
    this.router.navigate([`roles/detailRolePermissionById`, resourceId]);
  }


  openAddRoleDialgo(): void {
    const dialogRef = this.dialog.open(AddRoleDialogComponent, {
      width: '500px',
      // You can pass data to the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(['/roles']);
      // Handle any actions after the dialog is closed
    });
  }

  openUpdateRoleDialog(roleId: number): void {
    console.log("roleId", roleId)
    const dialogRef = this.dialog.open(AddRoleDialogComponent, {
      width: '500px',
      // You can pass data to the dialog component
      data: roleId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigate(['/roles']);
      // Handle any actions after the dialog is closed
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("searchValue:", filterValue);
    if(filterValue.length>=3){
    // HttpParams is used to create and manipulate query parameters for HTTP requests. 
    //set replaces the value of a parameter if it already exists.
    //append adds a new value to the parameter if it already exists or creates a new parameter if it doesn’t.
    const params = new HttpParams().set('searchValue', filterValue);
    this.httpService.get<any>(API_ENDPOINTS.resources_getAllRolesV1, { params })
      .pipe(
        catchError(error => {
          console.error('Error in GET request:', error);
          // Handle the error here or re-throw it to propagate
          // return throwError(error); // Uncomment this line if you want to propagate the error
          return throwError(() => error); // Or return a new observable with the error
        })
      )
      .subscribe({
        next: response => {
          this.resources = response;
          this.dataSource.data = this.resources;
          console.log('Response:', response);
          console.log('GET request successful:', this.resources);
        },
        error: error => {
          console.error('Error in GET request:', error);
        }
      });
    }else if(filterValue.length===0){
      this.httpService.get<any>(API_ENDPOINTS.resources_getAllRolesV1)
      .pipe(
        catchError(error => {
          console.error('Error in GET request:', error);
          // Handle the error here or re-throw it to propagate
          // return throwError(error); // Uncomment this line if you want to propagate the error
          return throwError(() => error); // Or return a new observable with the error
        })
      )
      .subscribe({
        next: response => {
          this.resources = response;
          this.dataSource.data = this.resources;
          console.log('Response:', response);
          console.log('GET request successful:', this.resources);
        },
        error: error => {
          console.error('Error in GET request:', error);
        }
      });
    }
  }
}
