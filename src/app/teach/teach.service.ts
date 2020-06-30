import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ICourse } from '../shared/models/course';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICourseContent } from '../shared/models/course-content';

@Injectable({
  providedIn: 'root'
})
export class TeachService {
  private currentCourseIdSource = new BehaviorSubject(null);
  currentCourseIdDuringCreation$ = this.currentCourseIdSource.asObservable();

  constructor(private firestore: AngularFirestore) {}

  getCoursesByInstructor(
    instructorId: string,
    courseStatus: string = 'Created'
  ): Observable<ICourse[]> {
    return this.firestore
      .collection<ICourse>('courses', ref =>
        ref.where('InstructorId', '==', instructorId)
      )
      .valueChanges({ idField: 'Id' });
  }

  getContentByCourseId(courseId: string): Observable<ICourseContent[]> {
    return this.firestore
      .collection('courses')
      .doc(courseId)
      .collection<ICourseContent>('contents')
      .valueChanges({ idField: 'Id' });
  }

  getCourseById(courseId: string): Observable<ICourse> {
    return this.firestore
      .collection('courses')
      .doc<ICourse>(courseId)
      .valueChanges();
  }

  createCourse(course: ICourse) {
    const courseId = this.firestore.createId();

    this.currentCourseIdSource.next(courseId);

    this.firestore
      .collection('courses')
      .doc(courseId)
      .set(course);
  }

  updateCourse(courseId: string, course: ICourse) {
    this.firestore
      .collection('courses')
      .doc(courseId)
      .update(course);
  }

  creatOrUpdateCourse(courseId: string, course: ICourse) {
    if (courseId) {
      this.currentCourseIdSource.next(courseId);
      this.updateCourse(courseId, course);
    } else {
      this.createCourse(course);
    }
  }

  addContentToCourse(courseId: string, courseContent: ICourseContent) {
    this.firestore
      .collection('courses')
      .doc(courseId)
      .collection<ICourseContent>('contents')
      .add(courseContent);
  }
}
