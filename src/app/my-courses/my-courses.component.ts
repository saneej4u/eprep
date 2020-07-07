import { Component, OnInit } from '@angular/core';
import { MyCoursesService } from './my-courses.service';
import { IMycourses } from '../shared/models/order-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  myCourses: IMycourses[];
  constructor(
    private myCourseService: MyCoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myCourseService.getMyCourses().subscribe(
      myCourses => {
        this.myCourses = myCourses;
      },
      error => {
        console.log(error);
      }
    );
  }

  onCourseView() {
    this.router.navigate(['learn/my-courses/details/1']);
  }
}
