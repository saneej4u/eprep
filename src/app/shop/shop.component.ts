import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import {ICourse} from '../shared/models/course';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  courses: ICourse[];
  itemsPerSlide = 4;
  title = 'Wecome to  Novus';

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getCourses().subscribe(result => {
      this.courses = result;
    });
  }
}
