import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { ShopService } from 'src/app/shop/shop.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {
  allCourses: ICourse[];
  selectedCourse: ICourse;
  itemsPerSlide = 4;
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    //this.addCourse();
    this.loadAllCourse();
  }

  loadAllCourse() {
    this.shopService.getCourses().subscribe(
      courses => {
        this.allCourses = courses;
      },
      error => {}
    );
  }

  addCourse() {
    this.shopService.createCourse({
      BasicInfo: 'string',
      CategoryId: 'string',
      Currency: 'string',
      Description: 'string',
      InstructorId: 'string',
      InstructorName: 'string',
      Price: 2,
      SubCategoryId: 'string',
      SubTitle: 'string',
      Thumbnail: 'string',
      Title: 'string',
      TotalArticle: 'string',
      TotalVideoInHours: 'string'
    });
  }

  getCourseById(courseId: string) {
    // this.shopService.getCourseById(courseId).subscribe(
    //   (course: ICourse) => {
    //     this.selectedCourse = course;
    //   },
    //   error => {}
    // );

     this.shopService.getCourseSnapById(courseId).pipe(
      map(courseSnap => {
        const course = courseSnap.payload.data() as ICourse;
        course.Id = courseSnap.payload.id;
        return course;
      })
    ).subscribe(x => {
        this.selectedCourse = x;
    });
  }

  onSelectCourse(courseId: string)
  {
    this.getCourseById(courseId);
  }

  onUpdateCourse()
  {
    let course: ICourse = this.selectedCourse;

    course.Description = 'New desc updated' ;

    this.shopService.updateCourse(course);
  }
}
