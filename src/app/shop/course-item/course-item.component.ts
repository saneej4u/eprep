import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {

  @Input() course: ICourse;

  constructor() { }

  ngOnInit(): void {
  }
}
