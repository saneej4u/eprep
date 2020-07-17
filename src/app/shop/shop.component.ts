import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import {ICourse} from '../shared/models/course';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  courses: ICourse[];
  itemsPerSlide = 4;
  title = 'Wecome to  Novus';
  width: string;
  seasons: string[] = ['ORE', 'LDS', 'MJDF'];

  constructor(private shopService: ShopService, breakpointObserver: BreakpointObserver) {

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        console.log("Mobile");
      }
      else
      {
        console.log("Desktop");
      }
    });

   }

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
      Id: '123test',
      CourseId: "2Uoi3E8eVslwp575z41hx",
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
