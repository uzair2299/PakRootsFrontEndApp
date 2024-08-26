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
    const params = this.createHttpParams()
    this.httpService.get_<any>(API_ENDPOINTS.resources_getAllRolesV1, { params })
      .pipe(catchError(this.handleError))
      .subscribe({
        next: this.handleResponse,
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
      this.getRoles();
    } else if (this.filterValue.length === 0) {
      this.getRoles();
    }
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("pageNumber and pageSize :", this.pageIndex, ":", this.pageSize)
    this.getRoles();
  }


  private createHttpParams(): HttpParams {
    let params = new HttpParams()
      .set('pageIndex', this.pageIndex)
      .set('pageSize', this.pageSize);

    if (this.filterValue) {
      params = params.set('searchValue', this.filterValue);
    }

    return params;
  }

  private handleError = (error: any) => {
    console.error('Error in request:', error);
    this._snackBar.open('An error occurred while processing your request.', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
    return throwError(() => error);
  }

  private handleResponse = (response: HttpResponse<any>) => {
   console.log("Response GET resquest : ",response)
    if (response.status === 204) {
      this.resetData();
    } else {
      this.resources = response.body.items || [];
      this.dataSource.data = this.resources;
      this.totalItems = response.body.totalItems || 0;
      this.pageIndex = response.body.pageIndex || 0;
      this.pageSize = response.body.pageSize || 10;
    }
  }

  private resetData() {
    this.resources = [];
    this.dataSource.data = this.resources;
    this.totalItems = 0;
    this.pageIndex = 0;
  }
}
