import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkStepper } from '@angular/cdk/stepper';
import { TeachService } from '../../teach.service';
import { ICourse } from 'src/app/shared/models/course';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/models/user';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  @Input() appStepper: CdkStepper;
  courseId: string = null;

  courseInfoForm: FormGroup;
  currentUser: IUser;
  course: ICourse;
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  constructor(
    private accountService: AccountService,
    private teachService: TeachService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.createCourseForm();

    this.accountService.currentUser$.subscribe(
      user => {
        this.currentUser = user;
        this.populateQS();
      },
      error => {
        console.log(error);
      }
    );
  }

  createCourseForm() {
    this.courseInfoForm = this.fb.group({
      courseTitle: [null, Validators.required],
      courseDescription: [null, Validators.required],
      category: [null],
      subCategory: [null],
      price: [null, Validators.required],
      duration: [null, Validators.required],
      imageUrl: [null, Validators.required]
    });
  }

  populateQS() {
    this.activatedRoute.paramMap.subscribe(params => {
      let courseId = params.get('id');

      // if (courseId == null) {
      //     this.teachService.currentCourseIdDuringCreation$
      //     .subscribe(result => {
      //       courseId = result;
      //       console.log("Result: " + result); 
      //     }
      //   );
      // }
      console.log('Course ID from Query string/observable : ' + courseId);
      if (courseId) {
        this.teachService.getCourseById(courseId).subscribe(
          course => {
            console.log(
              'Content retrieved from QS : ' + JSON.stringify(this.course)
            );

            this.course = course;
            this.courseId = courseId;
            this.populateEditCourse(course);
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  populateEditCourse(course: ICourse) {

    console.log("Course Edit: " + JSON.stringify(course.Thumbnail));
    
    this.courseInfoForm.patchValue({
      courseTitle: course.Title,
      courseDescription: course.Description,
      category: course.CategoryId,
      subCategory: course.SubCategoryId,
      price: course.Price,
      duration: course.RentInDays,
      //imageUrl: course.Thumbnail
    });
  }

  onSaveCourseInfo() {

    this.isSubmitted = true;
    //const course = this.courseInfoForm.value;

    // const courseInfo: ICourse = {
    //   Title: course.courseTitle,
    //   Description: course.courseDescription,
    //   CategoryId: course.category,
    //   SubCategoryId: course.subCategory,
    //   Price: course.price,
    //   RentInDays: course.duration,
    //   InstructorId: this.currentUser.uid,
    //   InstructorName: this.currentUser.displayName,
    //   Thumbnail: course.imageUrl
    // };

    // this.teachService.creatOrUpdateCourse(this.courseId, courseInfo);


    var filePath = `course/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          const course = this.courseInfoForm.value;

          const courseInfo: ICourse = {
            Title: course.courseTitle,
            Description: course.courseDescription,
            CategoryId: course.category,
            SubCategoryId: course.subCategory,
            Price: course.price,
            RentInDays: course.duration,
            InstructorId: this.currentUser.uid,
            InstructorName: this.currentUser.displayName,
            Thumbnail: url
          };

          this.teachService.creatOrUpdateCourse(this.courseId, courseInfo);
        })
      })
    ).subscribe();

    this.appStepper.next();
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
}
