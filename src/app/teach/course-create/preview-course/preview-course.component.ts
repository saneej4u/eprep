import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-course',
  templateUrl: './preview-course.component.html',
  styleUrls: ['./preview-course.component.scss']
})
export class PreviewCourseComponent implements OnInit {

  itemStringsLeft: any[] = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];
 
  itemStringsRight: any[] = ['Mr. O', 'Tomato'];

  constructor() { }

  ngOnInit(): void {
  }

}
