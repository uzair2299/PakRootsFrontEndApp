import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.css']
})
export class AddRoleDialogComponent {
  constructor(
    private router: Router,
    private httpService: HttpService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  addRoleForm = new FormGroup({
    roleName: new FormControl('asdfghA1', [Validators.required]),
    description: new FormControl('asdfghA1', [Validators.required]),
    isDeleted: new FormControl(false)
  });

  ngOnInit(): void {
    //console.log("User Id",this.data.id);
  }

  onCancel() {
    // Close the dialog
    console.log("going to close the reset password dialog")
    this.dialogRef.close();
  }

  submitForm() {
    if (this.addRoleForm.valid) {

      //JavaScript's object spread syntax to create a new object that combines the data from the form with the user ID
      const formData = {
        ...this.addRoleForm.value
      };

      console.log(formData);
      this.httpService.post<any>(API_ENDPOINTS.roles_createRoleV1, formData).pipe(
        catchError(error => {
          console.error('Error in POST request:', error);
          // Handle the error here or re-throw it to propagate
          // return throwError(error); // Uncomment this line if you want to propagate the error
          return throwError(() => error); // Or return a new observable with the error
        })
      )
        .subscribe({
          next: response => {
            this.router.navigate(['/roles']);
            console.log('POST request successful:', response);
            this.addRoleForm.reset() // Reset the form after successful API call
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


  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'end', // Positioning the snackbar horizontally
      verticalPosition: 'top', // Positioning the snackbar vertically
    });
  }
}
