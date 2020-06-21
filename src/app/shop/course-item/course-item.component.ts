import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {

  @Input() course: ICourse;

  constructor(private basketService: BasketService, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  addItemToBasket()
  {
    this.basketService.addItemToBasket(this.course);
    this.toastrService.success(this.course.Title + ' added to the basket')
  }
}
