import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IMycourses } from '../shared/models/order-items';
import { Observable } from 'rxjs';
import { HelperService } from '../shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class MyCoursesService {
  constructor(
    private firestore: AngularFirestore,
    private helperService: HelperService
  ) {}

  getMyCourses(): Observable<IMycourses[]> {
    const token = localStorage.getItem('token');

    return this.firestore
      .collection('userProfile')
      .doc(token)
      .collection<IMycourses>('mycourses')
      .valueChanges({ idField: 'id' });
  }

  startCourse(courseId: string, noOfDays: number) {
    const token = localStorage.getItem('token');

    console.log("Start course: course id" + courseId);
    
    const expiresOn = this.helperService.addDays(new Date(), noOfDays);

    var exp = this.helperService.convertToTimestamp(expiresOn);

    this.firestore
      .collection('userProfile')
      .doc(token)
      .collection('mycourses')
      .doc(courseId)
      .set(
        { startedOn: this.helperService.getCurrentTime(), expiresOn: exp },
        { merge: true }
      );
  }
}
