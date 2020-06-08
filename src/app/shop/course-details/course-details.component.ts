import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  course: ICourse;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse()
  {
    this.shopService.getCourseById(this.activateRoute.snapshot.paramMap.get('id')).subscribe(course => {
      this.course = course;
    }, err => {
      console.log(err);
    });
  }
}
