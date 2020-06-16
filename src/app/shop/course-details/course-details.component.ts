import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { ICourseSection } from 'src/app/shared/models/course-section';
import { ICourseContent } from 'src/app/shared/models/course-content';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { VideoModalComponent } from 'src/app/shared/components/video-modal/video-modal.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: ICourse;
  courseSections: ICourseSection[];
  courseContents: ICourseContent[];
  curiculam: any;
  modalRef: BsModalRef;

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadCourse();
    this.loadCourseSection();
    this.loadSubCollection();
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

  loadSubCollection()
  {
    this.shopService.loadSubCollectionWithDocument().subscribe(result => {
      this.curiculam = result;
      console.log("curiculam: " + JSON.stringify(this.curiculam));
    });
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  openModal() {
    this.modalRef = this.modalService.show(VideoModalComponent,  {
      initialState: {
        title: 'Sample Course by Fathima',
        data: {}
      },
      class: 'modal-lg'
    });
  }
  
}
