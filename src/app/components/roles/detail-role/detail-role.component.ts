import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';




// RoleAssignedResourcePermissionDTO Interface
export interface RoleAssignedResourcePermissionDTO_ {
  roles: RoleDto;
}



export interface Permission {
  id: number;
  permissionName: string;
  deleted: boolean;
  checked: boolean;
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

export interface RoleDto {
  id: number;
  roleName: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  endPoint: string;
  isDeleted: boolean;
  roleIds: number[];
  resources: Resource[];
}

@Component({
  selector: 'app-detail-role',
  templateUrl: './detail-role.component.html',
  styleUrls: ['./detail-role.component.css']
})
export class DetailRoleComponent {
  itemId: any;
  //resources: any[] = [];
  resources: RoleAssignedResourcePermissionDTO_[] = [];
  constructor(private httpService: HttpService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      console.log("selected role id : ",this.itemId);
      this.getResourcesV1();
  });
  }
  getResourcesV1() {

    const roleDto: RoleDto = {
      id: 0, // Assuming you have a value for id
      roleName: '',
      description: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      endPoint: '',
      isDeleted: false,
      roleIds: [this.itemId], // Add itemId to roleIds array
      resources:[]
    };
    this.httpService.post<any>(API_ENDPOINTS.roles_getRoleAssignResourcesPermission,roleDto)
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
}
