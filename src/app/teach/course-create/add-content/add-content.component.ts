import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TeachService } from '../../teach.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {

  title: string;
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  submitButtonValue: string = 'Submit';
  currentCourseId: string;

  formTemplate = new FormGroup({
    contentTitle: new FormControl('', Validators.required),
    isFree: new FormControl(''),
    contentUrl: new FormControl('', Validators.required)
  });


 constructor(public modalRef: BsModalRef, private storage: AngularFireStorage, private teachService: TeachService) {}

  ngOnInit(): void {

    this.teachService.currentCourseIdDuringCreation$.subscribe(courseId => {
      this.currentCourseId = courseId;
      console.log("Current Course Id: " + this.currentCourseId);
      
    },
    (error) => {
      console.log(error);
      
    });
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    this.submitButtonValue = 'Please wait...';
    if (this.formTemplate.valid) {
      var filePath = `course/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['contentUrl'] = url;
            this.teachService.addContentToCourse(this.currentCourseId,formValue);
            this.resetForm();
            this.isSubmitted = false;
            this.modalRef.hide();

          })
        })
      ).subscribe();
    }
  }

  onCancel()
  {
    this.resetForm();
    this.modalRef.hide();
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      contentTitle: '',
      isFree: '',
      contentUrl: ''
    });
    this.imgSrc = '/assets/img/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}
