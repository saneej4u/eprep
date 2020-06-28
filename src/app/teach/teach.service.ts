import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ICourse } from '../shared/models/course';
import { BehaviorSubject } from 'rxjs';
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

  addContentToCourse(courseId: string, courseContent: ICourseContent)
  { 
    this.firestore
    .collection('courses')
    .doc(courseId)
    .collection<ICourseContent>('contents')
    .add(courseContent);
  }
}
