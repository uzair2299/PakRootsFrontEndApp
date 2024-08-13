import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AssignUserRolesComponent } from './assign-user-roles/assign-user-roles.component';

const routes: Routes = [
  { path: 'users', component: ViewUsersComponent },
  { path: 'users/v1/assignUserRoles/:id', component: AssignUserRolesComponent },
 // { path: 'resources/getResourceById/:id', component: AsignResoucePermissionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
