import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { ICourseSection } from 'src/app/shared/models/course-section';
import { ICourseContent } from 'src/app/shared/models/course-content';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { VideoModalComponent } from 'src/app/shared/components/video-modal/video-modal.component';
import { BasketService } from '../../basket/basket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { BasketConfirmComponent } from '../../shared/components/basket-confirm/basket-confirm.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BasketConfirmModelComponent } from '../../shared/components/basket-confirm-model/basket-confirm-model.component';



@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: ICourse;
  courseSections: ICourseSection[];
  courseContents: ICourseContent[];
  courseContentsNew: ICourseContent[];
  curiculam: any;
  modalRef: BsModalRef;

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService,
    private basketService: BasketService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadCourse();
    this.loadCourseContentNew();
    //this.loadCourseSection();
    //this.loadSubCollection();
  }

  loadCourse() {
    this.shopService
      .getCourseById(this.activateRoute.snapshot.paramMap.get('id'))
      .subscribe(
        course => {
          this.course = course;
        },
        err => {
          console.log(err);
        }
      );
  }

  loadCourseSection() {
    this.shopService
      .getCourseSectionsByCourseId(
        this.activateRoute.snapshot.paramMap.get('id')
      )
      .subscribe(
        result => {
          this.courseSections = result;
        },
        error => {
          console.log('Error: ' + error);
        }
      );
  }

  loadCourseContentNew() {

    this.shopService.getCourseContentsByCourseId(this.activateRoute.snapshot.paramMap.get('id')).subscribe((contents: ICourseContent[]) => {
      this.courseContentsNew = contents;
    }, (error) => {

    });
  }

  loadSubCollection() {
    this.shopService.loadSubCollectionWithDocument().subscribe(result => {
      this.curiculam = result;
      console.log("curiculam: " + JSON.stringify(this.curiculam));
    });
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  openModal(content: ICourseContent) {
    this.modalRef = this.modalService.show(VideoModalComponent, {
      initialState: {
        title: this.course.Title,
        data: {content}
      },
      class: 'modal-lg'
    });
  }

  addItemToBasket()
  {
   console.log("basket : " + JSON.stringify(this.course));
   this.course.Id = this.activateRoute.snapshot.paramMap.get('id');
    this.basketService.addItemToBasket(this.course);
    this.snackBar.open('Course added to the basket','Dismiss', {
      duration: 2000,
    });

    //this.bottomSheet.open(BasketConfirmComponent);

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
