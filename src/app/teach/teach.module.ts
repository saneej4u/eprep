import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachComponent } from './teach.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeachRoutingModule } from './teach-routing.module';
import { CourseCreateComponent } from './course-create/course-create.component';
import { SharedModule } from '../shared/shared.module';
import { CourseInfoComponent } from './course-create/course-info/course-info.component';
import { UploadCourseComponent } from './course-create/upload-course/upload-course.component';
import { PreviewCourseComponent } from './course-create/preview-course/preview-course.component';
import { FormsModule } from '@angular/forms';
import { AddContentComponent } from './course-create/add-content/add-content.component';




@NgModule({
  declarations: [TeachComponent, DashboardComponent, CourseCreateComponent, CourseInfoComponent, UploadCourseComponent, PreviewCourseComponent, AddContentComponent],
  imports: [
    CommonModule,
    FormsModule,
    TeachRoutingModule,
    SharedModule
  ]
})
export class TeachModule { }
