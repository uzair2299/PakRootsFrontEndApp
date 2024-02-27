import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { AddRoleDialogComponent } from 'src/app/components/add-role-dialog/add-role-dialog.component';
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
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})

export class RolesComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(public dialog: MatDialog) {}
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
