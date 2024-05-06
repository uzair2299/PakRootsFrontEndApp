import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPermissionComponent } from './view-permission/view-permission.component';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ViewPermissionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PermissionsRoutingModule
  ]
})
export class PermissionsModule { }
