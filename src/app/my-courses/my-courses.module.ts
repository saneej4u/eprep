import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from './my-courses.component';
import { MyCoursesRoutingModule } from './my-courses-routing.module';
import { MyCourseDetailsComponent } from './my-course-details/my-course-details.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [MyCoursesComponent, MyCourseDetailsComponent],
  imports: [
    CommonModule,
    MyCoursesRoutingModule,
    SharedModule
  ]
})
export class MyCoursesModule { }
