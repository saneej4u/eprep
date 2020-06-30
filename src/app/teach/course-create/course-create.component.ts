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

  constructor() { }

  ngOnInit(): void {


  }
}
