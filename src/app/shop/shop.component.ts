import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import {ICourse} from '../shared/models/course';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  courses: ICourse[];
  itemsPerSlide = 4;
  title = 'Wecome to  Novus';

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getCourses().subscribe(result => {
      this.courses = result;
    });

    //this.addCourseSection();
    //this.addCourseContent();

    //this.addSubCollection();

    //this.loadSubCollection();
  }

  addCourseSection()
  {
    this.shopService.addCourseSection(
      {
      Id: '',
      CourseId: "2Uoi3E8eVslwp575z41h",
      Description: "Course section 3 - New dental course Descriptions ",
      InstructorId: "Fathima",
      SubTitle: "Course section 3 Sub title - New dental course",
      Title: "Course section 3 Title - New dental course"
    });
  }

  addCourseContent()
  {
    this.shopService.addCourseContent(
      {
      Id: '',
      ContentType: "Video",
      CourseSectionId: "2Uoi3E8eVslwp575z41h",
      Info: "Fathima course",
      IsPreview: "true",
      SubTitle: "Course content 3 Sub title - New dental course",
      Title: "Course content 3 Title - New dental course"
    });
  }

  addSubCollection()
  {
    this.shopService.addSubCollection();
  }
}
