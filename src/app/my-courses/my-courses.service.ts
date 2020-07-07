import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IMycourses } from '../shared/models/order-items';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyCoursesService {
  constructor(private firestore: AngularFirestore) {}

  getMyCourses(): Observable<IMycourses[]> {
    const token = localStorage.getItem('token');

    return this.firestore
      .collection('userProfile')
      .doc(token)
      .collection<IMycourses>('mycourses')
      .valueChanges();
  }
}
