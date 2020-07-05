import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from './my-courses.component';
import { MyCoursesRoutingModule } from './my-courses-routing.module';



@NgModule({
  declarations: [MyCoursesComponent],
  imports: [
    CommonModule,
    MyCoursesRoutingModule
  ]
})
export class MyCoursesModule { }
