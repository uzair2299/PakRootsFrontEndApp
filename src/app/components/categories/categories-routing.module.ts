import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';

const routes = [
  // Add more routes as needed
  { path: 'categories', component: ViewCategoriesComponent },
  { path: 'categories/v1/addCategory', component: AddCategoryComponent },
  { path: 'categories/v1/details/:id', component: DetailCategoryComponent }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
