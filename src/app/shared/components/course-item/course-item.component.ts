import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {

  @Input() course: ICourse;

  constructor(private basketService: BasketService, private toastrService: ToastrService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addItemToBasket()
  {
    this.basketService.addItemToBasket(this.course);
    this.snackBar.open(this.course.Title + ' added to the basket','Dismiss', {
      duration: 2000,
    });

  }
}
