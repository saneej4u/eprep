import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseCreateComponent } from './course-create/course-create.component';

const routes: Routes = [
  { path: 'course', component: DashboardComponent},
  { path: 'course/create', component: CourseCreateComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TeachRoutingModule { }
