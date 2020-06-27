import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-upload-course',
  templateUrl: './upload-course.component.html',
  styleUrls: ['./upload-course.component.scss']
})
export class UploadCourseComponent implements OnInit {

  @Input() appStepper: CdkStepper;
  @Input() courseForm: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

}
