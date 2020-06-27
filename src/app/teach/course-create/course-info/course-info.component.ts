import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  @Input() appStepper: CdkStepper;
  @Input() courseForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  onSaveCourseInfo()
  {
    var a = this.courseForm.get('courseInfoForm').value;

    console.log("Upload videos" + JSON.stringify(a));

    this.appStepper.next();
  }
}
