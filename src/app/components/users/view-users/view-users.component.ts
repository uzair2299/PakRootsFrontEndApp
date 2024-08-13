import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';

export interface UserDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  dateJoined: number;
  lastLogin: number;
  isActive: boolean;
  isLocked: boolean;
  profilePicture: string;
  bio: string;
  primaryPhone: string;
  secondaryPhone: string;
  workPhone: string;
}


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['id', 'userName', 'firstName', 'lastName', 'email','dateJoined','lastLogin','isActive','isLocked','primaryPhone','secondaryPhone','workPhone','actions'];
  dataSource!: MatTableDataSource<UserDto>;
  resources: any[] = [];
  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
    private router:Router
  ) {}

    ngOnInit() {
      this.dataSource = new MatTableDataSource<UserDto>(this.resources);
      this.getResourcesV1();
    }
    getResourcesV1() {
      this.httpService.get<any>(API_ENDPOINTS.users_getAllUsersV1)
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
          this.resources = response;
          this.dataSource.data = this.resources;
          console.log('Response:', response);
          console.log('POST request successful:', this.resources);
        },
        error: error => {
          console.error('Error in POST request:', error);
        }
      });
    }
    navigateToResource(resourceId: number) {
      this.router.navigate([`/resources/getResourceById`, resourceId]);
    }

    navigateToAddResource() {
      this.router.navigate([`resources/v1/addResource`]);
    }
}
