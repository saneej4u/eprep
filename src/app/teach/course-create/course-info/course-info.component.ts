import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  courseId: string;

  courseInfoForm: FormGroup;
  currentUser: IUser;
  course: ICourse;

  constructor(
    private accountService: AccountService,
    private teachService: TeachService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createCourseForm();

    this.accountService.currentUser$.subscribe(
      user => {
        this.currentUser = user;
        this.populateQS();
      },
      error => {
        console.log(error);
      }
    );
  }

  createCourseForm() {
    this.courseInfoForm = this.fb.group({
      courseTitle: [null, Validators.required],
      courseDescription: [null, Validators.required],
      category: [null],
      subCategory: [null],
      price: [null, Validators.required],
      duration: [null, Validators.required]
    });
  }

  populateQS() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log('Course ID from Query string : ' + params.get('id'));
      const courseId = params.get('id');

      if (courseId) {
        this.teachService.getCourseById(courseId).subscribe(
          course => {
            this.course = course;
            this.editCourse(course);
            console.log(
              'Content retrieved from QS : ' + JSON.stringify(this.course)
            );
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  editCourse(course: ICourse) {
    this.courseInfoForm.patchValue({
      courseTitle: course.Title,
      courseDescription: course.Description,
      category: course.CategoryId,
      subCategory: course.SubCategoryId,
      price: course.Price,
      duration: course.RentInDays
    });
  }

  onSaveCourseInfo() {
    const course = this.courseInfoForm.value;

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
