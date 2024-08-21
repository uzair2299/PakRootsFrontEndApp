import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';

export interface Permission {
  id: number;
  permissionName: string;
  deleted: boolean;
  checked: boolean;
  resourcesPermissionsId:Number
}

export interface Resource {
  resourceId: number;
  resourceName: string | null;
  resourceEndpoint: string;
  version: string;
  methodType: string;
  description: string | null;
  rateLimit: string | null;
  documentationUrl: string | null;
  owner: string | null;
  permissions: Permission[];
  active: boolean;
  deprecated: boolean;
  authRequired: boolean;
}


@Component({
  selector: 'app-roles-permission',
  templateUrl: './roles-permission.component.html',
  styleUrls: ['./roles-permission.component.css']
})
export class RolesPermissionComponent {
  itemId: any;
  //resources: any[] = [];
  resources: Resource[] = [];
  constructor(private httpService: HttpService,
    private route:ActivatedRoute, 
    private _snackBar: MatSnackBar,
  private router:Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      console.log("selected role id : ",this.itemId);
      this.getResourcesV1();
  });
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
        console.log('Response:', response);
        console.log('POST request successful:', this.resources);
      },
      error: error => {
        console.error('Error in POST request:', error);
      }
    });
  }


  areAllPermissionsChecked(resource: Resource): boolean {
    return resource.permissions.every(permission => permission.checked);
  }

  // Method to handle select all checkbox changes
  selectAll(resource: Resource, event: any): void {
    const checked = event.checked;
    resource.permissions.forEach(permission => permission.checked = checked);
  }

  // Method to handle individual permission checkbox changes
  onPermissionChange(resource: Resource, permission: Permission): void {
    // Logic to handle permission change, if needed
    console.log(`Permission ${permission.permissionName} changed to ${permission.checked}`);
  }


  onUpdate() {
    // Logic to handle the update action
    console.log('Update button clicked');
    const taskData = this.resources
    console.log('Task Data:', taskData);
    console.log(`${API_ENDPOINTS.assign_resource_permisson}/${this.itemId}`);
    this.httpService.post<any>(`${API_ENDPOINTS.roles_assignRolesPermission}/${this.itemId}`,taskData).pipe(
      catchError(error => {
        console.error('Error in POST request:', error);
        // Handle the error here or re-throw it to propagate
        // return throwError(error); // Uncomment this line if you want to propagate the error
        return throwError(() => error); // Or return a new observable with the error
      })
    )
    .subscribe({
      next: response => {
        console.log('POST request successful:', response);
        this.openSnackBar('User roles has been successfully update')
        this.router.navigate(['/roles']);
      },
      error: error => {
        console.error('Error in POST request:', error);
      }
    });
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'end', // Positioning the snackbar horizontally
      verticalPosition: 'top', // Positioning the snackbar vertically
    });
  }

}
