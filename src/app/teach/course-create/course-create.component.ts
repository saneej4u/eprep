import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {

  courseForm: FormGroup;
  
  constructor(private fb: FormBuilder, private accountService: AccountService,) { }

  ngOnInit(): void {
    this.createCheckoutForm();
  }

  createCheckoutForm() {
    this.courseForm = this.fb.group({
      courseInfoForm: this.fb.group({
        courseTitle: [null, Validators.required],
        courseDescription: [null, Validators.required],
        category: [null],
        subCategory: [null],
        price: [null, Validators.required],
        duration:[null, Validators.required]
      }),
      courseUploadForm: this.fb.group({
        contentTitle: [null, Validators.required],
        contentUrl:[null, Validators.required]
      })
    });
  }

}
