import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyCoursesComponent } from './my-courses.component';

const routes: Routes = [
{ path: 'my-courses' , component: MyCoursesComponent}
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
