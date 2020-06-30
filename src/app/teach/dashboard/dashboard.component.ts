import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/shared/models/course';
import { TeachService } from '../teach.service';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  myCourses: ICourse[];
  currentUser: IUser;

  constructor(private teachService: TeachService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {

    this.accountService.currentUser$.subscribe(
      user => {
        this.currentUser = user;

        this.teachService.getCoursesByInstructor(user.uid)
        .subscribe((courses: ICourse[]) => {
    
          this.myCourses = courses;
        }, error => {
          console.log(error);      
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  onCourseEdit(courseId: string)
  {
    this.router.navigate(['course/' + courseId]);

    //  this.router.navigate(['/heroes', { id: itemId }]);
  }

}
