import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { FileUploader } from 'ng2-file-upload';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddContentComponent } from '../add-content/add-content.component';
import { TeachService } from '../../teach.service';
import { ICourseContent } from 'src/app/shared/models/course-content';
import { ActivatedRoute } from '@angular/router';


const URL = 'http://localhost:4200/fileupload/';

@Component({
  selector: 'app-upload-course',
  templateUrl: './upload-course.component.html',
  styleUrls: ['./upload-course.component.scss']
})
export class UploadCourseComponent implements OnInit {

  @Input() appStepper: CdkStepper;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  modalRef: BsModalRef;
  contents: ICourseContent[];

  ngOnInit(): void {
  }

 
  constructor(private modalService: BsModalService, 
    private teachService: TeachService, 
    private activatedRoute: ActivatedRoute)
  {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log("kkkk: " + params.get('id'));
      
      this.teachService.getContentByCourseId(params.get('id')).subscribe(
        contents => {
          this.contents = contents;

          console.log("Contents: " + this.contents)
        },
        error => {
          console.log(error);
        }
      );
    });
  }


  onAddCourseContent() {
    this.modalRef = this.modalService.show(AddContentComponent,  {
      initialState: {
        title: 'Add Content',
        data: {}
      },
      class: 'modal-lg'
    });
  }

  // createContentForm() 
  // {
  //   this.contentForm = this.fb.group({
  //       contentTitle: [null, Validators.required],
  //       contentUrl:[null, Validators.required],
  //       isFree:[null]
  //     });
  // }

}
