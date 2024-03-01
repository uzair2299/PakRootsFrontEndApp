import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AddRoleDialogComponent } from 'src/app/components/add-role-dialog/add-role-dialog.component';
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
export interface PeriodicElement {
  roleName: string;
  id: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, roleName: 'Hydrogen'},
  {id: 2, roleName: 'Helium', }
];

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})

export class RolesComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['position', 'name','actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}
  openEditForm(data: any) {
    console.log("Selected data for role",data)
    const dialogRef = this.dialog.open(AddRoleDialogComponent, {
      disableClose: true, // Prevents closing by clicking outside
      data: { roleData: data },
    });

    dialogRef.afterClosed().subscribe(updatedUserData => {
        console.log('Updated User Data:', updatedUserData);
        // Here you can update the original data with updatedUserData
    });
  }
  
  // isOpen: boolean = false;

  // toggle() {
  //   this.isOpen = !this.isOpen;
  // }

  isOpen: string | null = null;

  toggle(item: string) {
    this.isOpen = this.isOpen === item ? null : item;
  }
  
  deleteRole(id: number) {
    console.log("Selected id",id);
    this._snackBar.open('Delete Successfully', 'Dismiss', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRoleDialogComponent, {
      data: {},
        disableClose: true, // Prevents closing by clicking outside
    });

    dialogRef.afterClosed().subscribe(updatedUserData => {
        console.log('Updated User Data:', updatedUserData);
    });
  }
    
}
