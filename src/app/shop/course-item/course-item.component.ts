import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {

  @Input() course: ICourse;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  addItemToBasket()
  {
    this.basketService.addItemToBasket(this.course);
  }
}
