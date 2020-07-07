import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyCoursesComponent } from './my-courses.component';
import { MyCourseDetailsComponent } from './my-course-details/my-course-details.component';

const routes: Routes = [
{ path: 'my-courses' , component: MyCoursesComponent},
{ path: 'my-courses/details/:id' , component: MyCourseDetailsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MyCoursesRoutingModule { }
