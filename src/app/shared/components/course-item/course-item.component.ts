import { Component, OnInit, Input } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BasketConfirmModelComponent } from '../basket-confirm-model/basket-confirm-model.component';


@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {

  @Input() course: ICourse;

  constructor(private basketService: BasketService, private toastrService: ToastrService, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  addItemToBasket()
  {
    this.basketService.addItemToBasket(this.course);
    this.snackBar.open('Course added to the basket','Dismiss', {
      duration: 2000,
    });

    this.openDialog();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BasketConfirmModelComponent, {
      width: '650px',
      data: {CourseId: this.course.Id, Title: this.course.Title, Thumbnail: this.course.Thumbnail, InstructorName: this.course.InstructorName, Price: this.course.Price, RentInDays: this.course.RentInDays}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
