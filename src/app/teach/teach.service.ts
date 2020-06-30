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

  createCourse(course: ICourse) {

    const courseId = this.firestore.createId();

    this.currentCourseIdSource.next(courseId);

    this.firestore
    .collection('courses')
    .doc(courseId)
    .set(course);
  }

  getCoursesByInstructor(instructorId: string, courseStatus: string= 'Created'): Observable<ICourse[]>
  {
    return this.firestore
    .collection<ICourse>('courses', ref => ref.where('InstructorId', '==', instructorId))
    .valueChanges({ idField: 'Id' });
  }

  getContentByCourseId(courseId: string): Observable<ICourseContent[]>
  {
    return this.firestore
    .collection('courses')
    .doc(courseId)
    .collection<ICourseContent>('contents')
    .valueChanges({ idField: 'Id' });
  }

  getCourseById(courseId: string): Observable<ICourse>
  {
    return this.firestore
    .collection('courses')
    .doc<ICourse>(courseId)
    .valueChanges();
  }

  addContentToCourse(courseId: string, courseContent: ICourseContent)
  { 
    this.firestore
    .collection('courses')
    .doc(courseId)
    .collection<ICourseContent>('contents')
    .add(courseContent);
  }
}
