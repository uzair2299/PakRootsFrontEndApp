import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';
import { AddPermissionDialogComponent } from '../../add-permission-dialog/add-permission-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../common/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { PermissionDto } from '../../permissions/view-permission/view-permission.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { HttpResponse } from '@angular/common/http';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


export interface Category {
  id: number;
  name: string;
  parent_id: number;
  description: string | null;
  children: Category[];
}

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private httpService: HttpService, private router: Router) { }

  categories: Category[] = [];
  //This control manages the nested tree structure of the data
  //It takes a function node => node.children which defines how to get the children of a given node in the tree.
  treeControl = new NestedTreeControl<Category>(node => node.children);

  //This is the data source for the material tree component.
  //It holds the data that will be displayed in the tree.
  dataSource = new MatTreeNestedDataSource<Category>();

  ngOnInit() {
    this.getCategoriesV1();
  }

  openEditForm() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      disableClose: false, // Prevents closing by clicking outside
      width: '50%', // Set the width to 50% of the viewport
      height: '80%', // Set the height to 80% of the viewport
      data: {},
    });
  }

  getCategoriesV1() {
    this.httpService.get_<any>(API_ENDPOINTS.categories_getAllActiveCategoriesV1)
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
          if (response.status === 204) {
            // Handle 204 No Content
            this.categories = [];
          } else {
            this.categories = response.body;
            this.dataSource.data = this.categories;
            console.log("received data :",this.categories)
          }
        },
        error: error => {
          console.error('Error in GET request:', error);
        }
      });
  }
  deletePermissionV1(id: number) {
    console.log("Selected id", id);
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: { title: 'Delete Confirmation', message: 'Are you sure you want to delete this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        console.log("Confirmation result", result)
        if (result) {
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
                this.getCategoriesV1();
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


  onDeleteSucess(): void {
    this._snackBar.open('Delete Successfully', 'Dismiss', {
      duration: 3000, // Duration in milliseconds (e.g., 3000 milliseconds = 3 seconds)
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }

  navigateToResource(resourceId: number) {
    this.router.navigate([`/resources/getResourceById`, resourceId]);
  }

  
  //This function is used to determine if a given node has children or not.
  //This function is used by the material tree component to display expand/collapse icons for nodes with children.
  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;
}
