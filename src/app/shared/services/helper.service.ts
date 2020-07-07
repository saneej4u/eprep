import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }


  getCurrentTime(): firebase.firestore.Timestamp
  {
    return firebase.firestore.Timestamp.now();
  }

  addDays(date, days): Date {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

 convertToTimestamp(date: Date): firebase.firestore.Timestamp
 {
   return firebase.firestore.Timestamp.fromDate(date);
 }

 convertToDate(times: firebase.firestore.Timestamp): Date
 {
   return  times.toDate();
 }

}
