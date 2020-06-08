import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  course: ICourse;

  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse()
  {
    this.shopService.getCourseById('3X0ohyOTBT0UoL4XdAIB').subscribe(course => {
      this.course = course;
    }, err => {
      console.log(err);
    });
  }
}
