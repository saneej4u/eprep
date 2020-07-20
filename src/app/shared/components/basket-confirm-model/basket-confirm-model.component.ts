import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ICourse } from '../../models/course';
import { Router } from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-basket-confirm-model',
  templateUrl: './basket-confirm-model.component.html',
  styleUrls: ['./basket-confirm-model.component.scss']
})
export class BasketConfirmModelComponent implements OnInit  {

  isMobile: boolean;
  
  constructor(public dialogRef: MatDialogRef<BasketConfirmModelComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      }
      else
      {
        this.isMobile = false;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onGoToCart()
  {

    this.dialogRef.close();
    this.router.navigate(['/basket']);
  }

}
