import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';


export interface ResourceDto {
  resourceId: number;
  resourceName: string;
  resourceEndpoint: string;
  version: string;
  methodType: string;
  description?: string | null; // Optional, can be string or null
  rateLimit?: number | null;   // Optional, can be number or null
  documentationUrl?: string | null; // Optional, can be string or null
  owner?: string | null;       // Optional, can be string or null
  permissions: string[];       // Array of strings, could also be an array of another type depending on implementation
  active: boolean;
  deprecated: boolean;
  authRequired: boolean;
}

@Component({
  selector: 'app-view-resources',
  templateUrl: './view-resources.component.html',
  styleUrls: ['./view-resources.component.css']
})
export class ViewResourcesComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['resourceId', 'resourceName', 'resourceEndpoint', 'version', 'methodType','permissions','actions'];
  dataSource!: MatTableDataSource<ResourceDto>;
  resources: any[] = [];
  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
    private router:Router
  ) {}

    ngOnInit() {
      this.dataSource = new MatTableDataSource<ResourceDto>(this.resources);
      this.getResourcesV1();
    }
    getResourcesV1() {
      this.httpService.get<any>(API_ENDPOINTS.resources_getAllResourcesWithPermissions)
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
}
