import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {  RolesComponent} from './components/roles/roles.component';
import {  PermissionsComponent} from './components/permissions/permissions.component';
import {  AddPermissionComponent} from './components/add-permission/add-permission.component';
import {  MenuComponent} from './components/menu/menu.component';



const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'forgotPassword',
    component:ForgetPasswordComponent
  },
  {
    path:'notFound',
    component:NotFoundComponent
  },
  {
    path:'roles',
    component:RolesComponent
  },
  {
    path:'permissions',
    component:PermissionsComponent
  },
  {
    path:'menu',
    component:MenuComponent
  },
  {
    path:'permissions/v1',
    component:AddPermissionComponent
  }
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
