import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPermissionComponent } from './view-permission/view-permission.component';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from 'src/common/modules/material.module';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog"
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { DetailPermissionComponent } from './detail-permission/detail-permission.component';

import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    ViewPermissionComponent,
    AddPermissionComponent,
    DetailPermissionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PermissionsRoutingModule,

    //Material
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTreeModule,
    MatTabsModule
  ]
})
export class PermissionsModule { }
