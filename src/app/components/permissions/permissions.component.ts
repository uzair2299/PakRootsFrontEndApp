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

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent {
  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}
  openEditForm() {
    const dialogRef = this.dialog.open(AddPermissionDialogComponent, {
      disableClose: false, // Prevents closing by clicking outside
      width: '50%', // Set the width to 50% of the viewport
  height: '80%', // Set the height to 80% of the viewport
      data: {  },
    });

}
}
