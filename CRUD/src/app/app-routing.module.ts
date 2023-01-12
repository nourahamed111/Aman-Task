import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentHomeComponent } from './Component/Department/DepartmentHome/department-home/department-home.component';
import { HomeComponent } from './Layout/home/home.component';

const routes: Routes = [
  { path: 'Department', component: DepartmentHomeComponent },
  { path: 'Employee', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
