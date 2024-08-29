import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';
import { AddRoleDialogComponent } from '../../add-role-dialog/add-role-dialog.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  categoriesList: any = [];
  constructor(
    private router: Router,
    private httpService: HttpService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    //    @Inject(MAT_DIALOG_DATA) public data: { roleId: number }
  ) { 
    console.log('Received data:', data);
  }

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    parentId: new FormControl(''),
    description: new FormControl(''),
    isActive: new FormControl(false)
  });

  ngOnInit(): void {
    this.getCategoriesList()
  }

  onCancel() {
    // Close the dialog
    this.dialogRef.close();
  
  }
  

  submitForm() {
    if (this.categoryForm.valid) {
      this.createCategory()
    }
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'end', // Positioning the snackbar horizontally
      verticalPosition: 'top', // Positioning the snackbar vertically
    });
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


  private getCategoriesList() {
    this.httpService.get_<any>(`${API_ENDPOINTS.categories_getAllCategoriesV1}`).pipe(
      catchError(this.handleError)
    )
      .subscribe({
        next: this.handleResponse,
        error: error => {
          console.error('Error in GET request:', error);
        }
      });
  }

  private handleResponse = (response: HttpResponse<any>) => {
    console.log("Response GET resquest : ", response)
    if (response.status === 204) {
      //this.resetData();
    } else {
      this.categoriesList = response.body || [];
    }
  }

  private createCategory() {


    //JavaScript's object spread syntax to create a new object that combines the data from the form with the user ID
    const formData = {
      ...this.categoryForm.value
    };

    console.log(formData);
    this.httpService.post<any>(API_ENDPOINTS.categories_createCategoryV1, formData).pipe(
      catchError(error => {
        console.error('Error in POST request:', error);
        // Handle the error here or re-throw it to propagate
        // return throwError(error); // Uncomment this line if you want to propagate the error
        return throwError(() => error); // Or return a new observable with the error
      })
    ).subscribe({
      next: response => {
        console.log('POST request successful:', response);
        this.categoryForm.reset() // Reset the form after successful API call
        this.dialogRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });

        this.openSnackBar('Password has been successfully reset')
      },
      error: error => {
        console.error('Error in POST request:', error);
      }
    });
  }


}
