import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { HomeComponent } from './Layout/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './Component/Employee/Create-PopUp/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateComponent } from './Component/Employee/update/update.component';
import { CreateDeptComponent } from './Component/Department/CreateDept/create-dept/create-dept.component';
import { UpdateDeptComponent } from './Component/Department/UpdateDept/update-dept/update-dept.component';
import { DepartmentHomeComponent } from './Component/Department/DepartmentHome/department-home/department-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CreateComponent,
    UpdateComponent,
    CreateDeptComponent,
    UpdateDeptComponent,
    DepartmentHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
