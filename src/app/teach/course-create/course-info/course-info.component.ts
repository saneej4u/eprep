import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';
import { TeachService } from '../../teach.service';
import { ICourse } from 'src/app/shared/models/course';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  @Input() appStepper: CdkStepper;
  @Input() courseForm: FormGroup;
  courseId: string;

  currentUser: IUser;

  constructor(
    private accountService: AccountService,
    private teachService: TeachService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.accountService.currentUser$.subscribe(
        user => {
          this.currentUser = user;
          this.courseId = params.get('id');
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  onSaveCourseInfo() {
    const course = this.courseForm.get('courseInfoForm').value;

    const courseInfo: ICourse = {
      Title: course.courseTitle,
      Description: course.courseDescription,
      CategoryId: course.category,
      SubCategoryId: course.subCategory,
      Price: course.price,
      RentInDays: course.duration,
      InstructorId: this.currentUser.uid,
      InstructorName: this.currentUser.displayName
    };

    this.teachService.createCourse(courseInfo);

    this.appStepper.next();
  }
}
