import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { ICourseSection } from 'src/app/shared/models/course-section';
import { ICourseContent } from 'src/app/shared/models/course-content';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: ICourse;
  courseSections: ICourseSection[];
  courseContents: ICourseContent[];

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCourse();
    this.loadCourseSection();
  }

  loadCourse() {
    this.shopService
      .getCourseById(this.activateRoute.snapshot.paramMap.get('id'))
      .subscribe(
        course => {
          this.course = course;
        },
        err => {
          console.log(err);
        }
      );
  }

  loadCourseSection() {
    this.shopService
      .getCourseSectionsByCourseId(
        this.activateRoute.snapshot.paramMap.get('id')
      )
      .subscribe(
        result => {
          this.courseSections = result;
        },
        error => {
          console.log('Error: ' + error);
        }
      );
  }

  
}
