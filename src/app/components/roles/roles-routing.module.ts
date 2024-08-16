import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRolesComponent } from './view-roles/view-roles.component';
import { RolesPermissionComponent } from './roles-permission/roles-permission.component';
import { AddPermissionComponent } from '../permissions/add-permission/add-permission.component';
//import { AddRoleComponent } from './add-role/add-role.component';
import { DetailRoleComponent } from './detail-role/detail-role.component';

const routes: Routes = [  { path: 'roles', component: ViewRolesComponent },
  //{ path: 'roles/v1/addRole', component: AddRoleComponent },
  { path: 'roles/assignRolePermissionById/:id', component: RolesPermissionComponent },
  { path: 'roles/detailRolePermissionById/:id', component: DetailRoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
