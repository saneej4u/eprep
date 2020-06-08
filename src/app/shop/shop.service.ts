import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICourse } from '../shared/models/course';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private courseCollection: AngularFirestoreCollection<ICourse>;
  private courseDocument: AngularFirestoreDocument<ICourse>;

  constructor(private firestore: AngularFirestore) {}

  getCourses(): Observable<ICourse[]>
  {
    this.courseCollection = this.firestore.collection<ICourse>('Courses');
    return this.courseCollection.valueChanges({idField: 'Id'});
  }

  addCourse(course: ICourse)
  {
    this.courseCollection = this.firestore.collection<ICourse>('Courses');
    this.courseCollection.add(course);
  }
}
