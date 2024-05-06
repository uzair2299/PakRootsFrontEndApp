import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewPermissionComponent } from './view-permission/view-permission.component';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { DetailPermissionComponent } from './detail-permission/detail-permission.component';

const routes = [
  // Add more routes as needed
  { path: 'permissions', component: ViewPermissionComponent },
  { path: 'permissions/v1', component: AddPermissionComponent },
  { path: 'permissions/v1/details/:id', component: DetailPermissionComponent }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
