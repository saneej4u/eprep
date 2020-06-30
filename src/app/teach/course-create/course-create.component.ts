import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { ICourse } from 'src/app/shared/models/course';
import { ActivatedRoute } from '@angular/router';
import { TeachService } from '../teach.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {

  courseForm: FormGroup;
  course: ICourse;
  
  constructor(private fb: FormBuilder, private accountService: AccountService, private activatedRoute: ActivatedRoute, private teachService: TeachService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      console.log('Course ID from Query string : ' + params.get('id'));

      this.teachService.getCourseById(params.get('id')).subscribe(
        course => {
          this.course = course;
          console.log('Content retrieved from QS : ' + this.course);
        },
        error => {
          console.log(error);
        }
      );
    });

    this.createCheckoutForm();
  }

  createCheckoutForm() {
    this.courseForm = this.fb.group({
      courseInfoForm: this.fb.group({
        courseTitle: [null, Validators.required],
        courseDescription: [this.course.Description, Validators.required],
        category: [this.course.CategoryId],
        subCategory: [this.course.SubCategoryId],
        price: [this.course.Price, Validators.required],
        duration:[this.course.RentInDays, Validators.required]
      }),
      courseUploadForm: this.fb.group({
        contentTitle: [null, Validators.required],
        contentUrl:[null, Validators.required]
      })
    });
  }

}
