import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewPermissionComponent } from './view-permission/view-permission.component';

const routes = [
  // Add more routes as needed
  { path: 'permissions', component: ViewPermissionComponent }
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
