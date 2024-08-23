import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';
import { AddRoleDialogComponent } from '../add-role-dialog/add-role-dialog.component';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


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

  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  filterValue: string = '';


  //You can use @ViewChild to get a reference to a DOM element in your template.
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<RolesDto>(this.resources);
    this.dataSource.paginator = this.paginator;
    this.getRoles();
  }
  getRoles() {
    const params = new HttpParams().set('pageIndex', this.pageIndex).set('pageSize', this.pageSize);
    this.httpService.get_<any>(API_ENDPOINTS.resources_getAllRolesV1, { params })
      .pipe(
        catchError(error => {
          console.error('Error in POST request:', error);
          // Handle the error here or re-throw it to propagate
          // return throwError(error); // Uncomment this line if you want to propagate the error
          return throwError(() => error); // Or return a new observable with the error
        })
      )
      .subscribe({
        next: (response: HttpResponse<any>) => {
          console.log('Response:', response);
          if (response.status === 204) {
            // Handle 204 No Content
            this.resources = [];
            this.dataSource.data = this.resources;
            this.totalItems = 0;
            this.pageIndex = 0;
          } else {
            this.resources = response.body.items;
            this.dataSource.data = this.resources;
            this.totalItems = response.body.totalItems;
            this.pageIndex = response.body.pageIndex;
            this.pageSize = response.body.pageSize;
          }
        },
        error: error => {
          console.error('Error in GET request:', error);
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
    this.filterValue = (event.target as HTMLInputElement).value;
    console.log("searchValue:", this.filterValue);
    if (this.filterValue.length >= 3) {
      // HttpParams is used to create and manipulate query parameters for HTTP requests. 
      //set replaces the value of a parameter if it already exists.
      //append adds a new value to the parameter if it already exists or creates a new parameter if it doesn’t.
      const params = new HttpParams().set('searchValue', this.filterValue).set('pageIndex', this.pageIndex).set('pageSize', this.pageSize);;
      this.httpService.get_<any>(API_ENDPOINTS.resources_getAllRolesV1, { params })
        .pipe(
          catchError(error => {
            console.error('Error in GET request:', error);
            // Handle the error here or re-throw it to propagate
            // return throwError(error); // Uncomment this line if you want to propagate the error
            return throwError(() => error); // Or return a new observable with the error
          })
        )
        .subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Response:', response);
            if (response.status === 204) {
              // Handle 204 No Content
              this.resources = [];
              this.dataSource.data = this.resources;
              this.totalItems = 0;
              this.pageIndex = 0;
            } else {
              this.resources = response.body.items;
              this.dataSource.data = this.resources;
              this.totalItems = response.body.totalItems;
              this.pageIndex = response.body.pageIndex;
              this.pageSize = response.body.pageSize;
            }
          },
          error: error => {
            console.error('Error in GET request:', error);
          }
        });
    } else if (this.filterValue.length === 0) {
      this.httpService.get_<any>(API_ENDPOINTS.resources_getAllRolesV1)
        .pipe(
          catchError(error => {
            console.error('Error in GET request:', error);
            // Handle the error here or re-throw it to propagate
            // return throwError(error); // Uncomment this line if you want to propagate the error
            return throwError(() => error); // Or return a new observable with the error
          })
        )
        .subscribe({
          next: (response: HttpResponse<any>) => {
            console.log('Response:', response);
            if (response.status === 204) {
              // Handle 204 No Content
              this.resources = [];
              this.dataSource.data = this.resources;
              this.totalItems = 0;
              this.pageIndex = 0;
            } else {
              this.resources = response.body.items;
              this.dataSource.data = this.resources;
              this.totalItems = response.body.totalItems;
              this.pageIndex = response.body.pageIndex;
              this.pageSize = response.body.pageSize;
            }
          },
          error: error => {
            console.error('Error in GET request:', error);
          }
        });
    }
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("pageNumber and pageSize :", this.pageIndex, ":", this.pageSize)
    const params = new HttpParams().set('searchValue', this.filterValue).set('pageIndex', this.pageIndex).set('pageSize', this.pageSize);;
    this.httpService.get_<any>(API_ENDPOINTS.resources_getAllRolesV1, { params })
      .pipe(
        catchError(error => {
          console.error('Error in GET request:', error);
          // Handle the error here or re-throw it to propagate
          // return throwError(error); // Uncomment this line if you want to propagate the error
          return throwError(() => error); // Or return a new observable with the error
        })
      )
      .subscribe({
        next: (response: HttpResponse<any>) => {
          console.log('Response:', response);
          if (response.status === 204) {
            // Handle 204 No Content
            this.resources = [];
            this.dataSource.data = this.resources;
            this.totalItems = 0;
            this.pageIndex = 0;
          } else {
            this.resources = response.body.items;
            this.dataSource.data = this.resources;
            this.totalItems = response.body.totalItems;
            this.pageIndex = response.body.pageIndex;
            this.pageSize = response.body.pageSize;
          }
        },
        error: error => {
          console.error('Error in GET request:', error);
        }
      });
  }
}
