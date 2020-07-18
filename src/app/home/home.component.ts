import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop/shop.service';
import { ICourse } from '../shared/models/course';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BasketService } from '../basket/basket.service';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allCourses: ICourse[];
  selectedCourse: ICourse;
  itemsPerSlide = 4;
  basketItemsCount: number;
  
  constructor(private shopService: ShopService, 
    private router: Router,
    private accoutService: AccountService,
    private basketService: BasketService) {}

  ngOnInit(): void {
    //this.addCourse();
    this.loadAllCourse();

    this.basketService.getBasketItems().subscribe(
      result => {
        if (result) {
          this.basketItemsCount = result.length;
        } else {
          this.basketItemsCount = 0;
        }
        console.log("Basket Count: " + this.basketItemsCount);
        
      },
      error => {
        console.log('error');
      }
    );

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



  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  onHomeClicked()
  {
    this.router.navigate(['/']);
    this.sidenav.close();
  }

  onCourseClicked()
  {
    this.router.navigate(['/shop']);
    this.sidenav.close();
  }

  onTeachClicked()
  {
    this.router.navigate(['teach/instructor']);
    this.sidenav.close();
  }
  
  onSignInClicked()
  {
    this.router.navigate(['/account/login']);
    this.sidenav.close();
  }

  onSignUpClicked()
  {
    this.router.navigate(['/account/register']);
    this.sidenav.close();
  }
}
