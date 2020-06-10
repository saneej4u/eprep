import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, observable } from 'rxjs';
import { ICourse } from '../shared/models/course';
import { ICourseSection } from '../shared/models/course-section';
import { ICourseContent } from '../shared/models/course-content';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private courseCollection: AngularFirestoreCollection<ICourse>;
  private courseDocument: AngularFirestoreDocument<ICourse>;

  constructor(private firestore: AngularFirestore) {}

  getCourses(): Observable<ICourse[]> {
    this.courseCollection = this.firestore.collection<ICourse>('Courses');
    return this.courseCollection.valueChanges({ idField: 'Id' });
  }

  getCourseById(id: string): Observable<ICourse> {
    this.courseDocument = this.firestore.doc<ICourse>('Courses/' + id);
    return this.courseDocument.valueChanges();
  }

  addCourse(course: ICourse) {
    this.courseCollection = this.firestore.collection<ICourse>('Courses');
    this.courseCollection.add(course);
  }

  getCourseSectionsByCourseId(courseId: string): Observable<ICourseSection[]> {
    return this.firestore
      .collection<ICourseSection>('CourseSections', ref =>
        ref.where('CourseId', '==', courseId)
      )
      .valueChanges();
  }

  addCourseSection(courseSection: ICourseSection) {
    this.firestore
      .collection<ICourseSection>('CourseSections')
      .add(courseSection);
  }

  getCourseContentByCourseSectionId(
    courseSectionId: string
  ): Observable<ICourseContent[]> {
    return this.firestore
      .collection<ICourseContent>('CourseContents', ref =>
        ref.where('CourseSectionId', '==', courseSectionId)
      )
      .valueChanges();
  }

  addCourseContent(courseContent: ICourseContent) {
    this.firestore
      .collection<ICourseContent>('CourseContents')
      .add(courseContent);
  }

  addSubCollection() {
    this.firestore
      .collection('CourseSections')
      .doc('96luXnrKgqU0NMdI5OPZ')
      .collection('NewCourseContents')
      .add({
        SubTitle: 'Sub collection Title',
        SubSubTitle: 'Sub Collection Sub Title',
        SubDesc: 'Sub Collection desc'
      });
  }

  getSubCollection(): Observable<any[]> {
    return this.firestore
      .collection('CourseSections')
      .doc('96luXnrKgqU0NMdI5OPZ')
      .collection('NewCourseContents')
      .valueChanges();
  }
  
  loadSubCollectionWithDocument(): Observable<any[]> 
  {
    return this.firestore.collection(`CourseSections/96luXnrKgqU0NMdI5OPZ/NewCourseContents`).valueChanges();

  }
}

// Learn Flexbox and Bootstrap 4
