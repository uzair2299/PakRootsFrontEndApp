import { Component, computed,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';
export interface Task {
  id: number;
  name: string;
  completed: boolean;
  subtasks?: Task[];
}


export interface ResourceData {
  active: boolean;
  authRequired: boolean;
  deprecated: boolean;
  description: string;
  documentationUrl: string;
  methodType: string;
  owner: string;
  permissions: { id: number, permissionName: string, code: string, module: string, createdAt: number, updatedAt: number, description: string, deleted: boolean }[];
  rateLimit: number;
  resourceEndpoint: string;
  resourceId: number;
  resourceName: string;
  version: string;
}

@Component({
  selector: 'app-asign-resouce-permissions',
  templateUrl: './asign-resouce-permissions.component.html',
  styleUrls: ['./asign-resouce-permissions.component.css']
})


export class AsignResoucePermissionsComponent {
  itemId: any;
  responseData: ResourceData | null = null;

  constructor(private httpService: HttpService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      console.log("selected permission id : ",this.itemId);
    this.getgetResourceByIdV1();
  });
  }

  getgetResourceByIdV1() {
    this.httpService.get<any>(`${API_ENDPOINTS.resources_getResourceById}/${this.itemId}`)
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
        console.log('Response:', response.permissions);
        this.responseData = response;
        this.updateTaskWithPermissions(response.permissions)
        //console.log('POST request successful:', this.permissions);
      },
      error: error => {
        console.error('Error in POST request:', error);
      }
    });
  }

  readonly task = signal<Task>({
    id:100,
    name: 'Assign All',
    completed: false,
    subtasks: [], // Start with an empty array
  });;

  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every(t => t.completed) ?? true;
      }
      return {...task};
    });
  }

  private updateTaskWithPermissions(permissions: any[]) {
    const subtasks = permissions.map(permission => ({
      id: permission.id,
      name: permission.permissionName,
      completed: permission.checked
    }));

    this.task.update(task => ({
      ...task,
      subtasks: subtasks
    }));
  }

  onUpdate() {
    // Logic to handle the update action
    console.log('Update button clicked');
    const taskData = this.task();
    console.log('Task Data:', taskData);
    console.log(`${API_ENDPOINTS.assign_resource_permisson}/${this.itemId}`);
    this.httpService.post<any>(`${API_ENDPOINTS.assign_resource_permisson}/${this.itemId}`,taskData.subtasks).pipe(
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
      },
      error: error => {
        console.error('Error in POST request:', error);
      }
    });
  }
}
