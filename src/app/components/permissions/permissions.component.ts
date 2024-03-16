import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AddPermissionDialogComponent } from 'src/app/components/add-permission-dialog/add-permission-dialog.component';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';
import { catchError } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { ViewChild } from '@angular/core';

export interface PermissionDto {
  permissionId: number;
  permissionName: string;
  code: string;
  module: string;
  createdAt: number;
  updatedAt: number;
  description: string;
}


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id', 'permissionName', 'code', 'module', 'description','actions'];
  dataSource!: MatTableDataSource<PermissionDto>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private httpService: HttpService) {}

    permissions: any[] = [];


    ngOnInit() {
      console.log("Permision.component INT")
      this.dataSource = new MatTableDataSource<PermissionDto>(this.permissions);
      this.getPermissionV1();
    }

  openEditForm() {
    const dialogRef = this.dialog.open(AddPermissionDialogComponent, {
      disableClose: false, // Prevents closing by clicking outside
      width: '50%', // Set the width to 50% of the viewport
      height: '80%', // Set the height to 80% of the viewport
      data: {  },
    });
}

getPermissionV1() {
  this.httpService.get<any>(API_ENDPOINTS.permissionV1)
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
      this.permissions = response;
      this.dataSource.data = this.permissions;
      console.log('POST request successful:', this.permissions);
    },
    error: error => {
      console.error('Error in POST request:', error);
    }
  });
}
deleteRole(id: number) {
  console.log("Selected id",id);
  this._snackBar.open('Delete Successfully', 'Dismiss', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,

  });
}
}
