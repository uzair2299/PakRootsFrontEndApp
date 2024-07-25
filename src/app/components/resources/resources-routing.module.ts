import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewResourcesComponent } from './view-resources/view-resources.component';
import { AsignResoucePermissionsComponent } from './asign-resouce-permissions/asign-resouce-permissions.component';

const routes: Routes = [
  { path: 'resources', component: ViewResourcesComponent },
  { path: 'resources/getResourceById/:id', component: AsignResoucePermissionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
