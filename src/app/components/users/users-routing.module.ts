import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  { path: 'users', component: ViewUsersComponent },
//  { path: 'resources/v1/addResource', component: AddResourceComponent },
 // { path: 'resources/getResourceById/:id', component: AsignResoucePermissionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
