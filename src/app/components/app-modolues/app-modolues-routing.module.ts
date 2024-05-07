import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewModuleComponent } from './view-module/view-module.component';


const routes = [
  // Add more routes as needed
  { path: 'appModules', component: ViewModuleComponent }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppModoluesRoutingModule { }
