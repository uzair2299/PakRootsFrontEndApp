import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AddPermissionDialogComponent } from 'src/app/components/add-permission-dialog/add-permission-dialog.component';
import { DeleteConfirmationDialogComponent } from 'src/app/components/common/delete-confirmation-dialog/delete-confirmation-dialog.component';
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
  selector: 'app-view-permission',
  templateUrl: './view-permission.component.html',
  styleUrls: ['./view-permission.component.css']
})
export class ViewPermissionComponent {
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
      console.log('Response:', response);
      console.log('POST request successful:', this.permissions);
    },
    error: error => {
      console.error('Error in POST request:', error);
    }
  });
}
deletePermissionV1(id: number) {
  console.log("Selected id",id);
  const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
    width: '250px',
    data: { title: 'Delete Confirmation', message: 'Are you sure you want to delete this item?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
    console.log("Confirmation result",result)
if(result){
  this.httpService.delete<any>(`${API_ENDPOINTS.permissionV1}/${id}`).pipe(
    catchError(error => {
      console.error('Error in Delete request:', error);
      // Handle the error here or re-throw it to propagate
      // return throwError(error); // Uncomment this line if you want to propagate the error
      return throwError(() => error); // Or return a new observable with the error
    })
  )
  .subscribe({
    next: response => {
      console.log('Delete request successful:');
      this.getPermissionV1();
      this.onDeleteSucess();
    
    },
    error: error => {
      console.error('Error in Delete request:', error);
    }
  });
}
    // User clicked Yes, proceed with deletion
      // Call your delete method here
      //this.deleteItem();
    }
  });



}


onDeleteSucess():void{
  this._snackBar.open('Delete Successfully', 'Dismiss', {
    duration: 3000, // Duration in milliseconds (e.g., 3000 milliseconds = 3 seconds)
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,

  });
}
}
