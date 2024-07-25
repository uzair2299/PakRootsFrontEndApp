import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';


import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RolesComponent } from './components/roles/roles.component';
import { AddRoleDialogComponent } from './components/add-role-dialog/add-role-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from './services/DataService';
import { WebSocketService } from './services/WebSocketService';
import { AddPermissionDialogComponent } from './components/add-permission-dialog/add-permission-dialog.component';
import { MenuComponent } from './components/menu/menu.component';
import { DeleteConfirmationDialogComponent } from './components/common/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ResourcesModule } from './components/resources/resources.module';
import { PermissionsModule } from './components/permissions/permissions.module'; // Import PermissionModule
import { AppModoluesModule } from './components/app-modolues/app-modolues.module';

import { PermissionsRoutingModule } from './components/permissions/permissions-routing.module';
import { AppModoluesRoutingModule } from './components/app-modolues/app-modolues-routing.module';
import { ResponseInterceptorService } from './interceptor/response/response-interceptor.service';
import { MyChatComponent } from './components/my-chat/my-chat.component';
import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForgetPasswordComponent,
    NotFoundComponent,
    ToolbarComponent,
    NavBarComponent,
    SidebarComponent,
    RolesComponent,
    AddRoleDialogComponent,
    AddPermissionDialogComponent,
    MenuComponent,
    DeleteConfirmationDialogComponent,
    MyChatComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatTabsModule,
    MatSnackBarModule,
    MatTreeModule,
    AppModoluesRoutingModule,
    PermissionsRoutingModule,
    PermissionsModule,// Add Permission to imports
    AppModoluesModule,
    ResourcesModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorService, multi: true },
    DataService,WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
