import { Component, computed, signal } from '@angular/core';
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

export interface UserRole {
  id: number;
  roleName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  endPoint: string | null;
  roleIds: string | null;
  checked: boolean;
}

export interface UserDto {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  dateJoined: number | null;
  lastLogin: number | null;
  isActive: boolean | null;
  isLocked: boolean | null;
  profilePicture: string | null;
  bio: string | null;
  primaryPhone: string | null;
  secondaryPhone: string | null;
  workPhone: string | null;
  roles: UserRole[];
}


@Component({
  selector: 'app-assign-user-roles',
  templateUrl: './assign-user-roles.component.html',
  styleUrls: ['./assign-user-roles.component.css']
})
export class AssignUserRolesComponent {

  itemId: any;
  responseData: UserDto | null = null;

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

  
  constructor(private httpService: HttpService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      console.log("selected User id : ", this.itemId);
      this.getUserDetailwithRolesByIdV1();
    });
  }

  onCancel(){
    console.log("");
  }
  getUserDetailwithRolesByIdV1() {
    this.httpService.get<any>(`${API_ENDPOINTS.users_getUserDetailWithRolesByIdV1}/${this.itemId}`)
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
        console.log('Response:', response.roles);
        this.responseData = response;
        this.updateTaskWithPermissions(response.roles)
        //console.log('POST request successful:', this.permissions);
      },
      error: error => {
        console.error('Error in POST request:', error);
      }
    });
  }
  private updateTaskWithPermissions(roles: any[]) {
    const subtasks = roles.map(role => ({
      id: role.id,
      name: role.roleName,
      completed: role.checked
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
