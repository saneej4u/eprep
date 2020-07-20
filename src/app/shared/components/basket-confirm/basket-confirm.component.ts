import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-basket-confirm',
  templateUrl: './basket-confirm.component.html',
  styleUrls: ['./basket-confirm.component.scss']
})
export class BasketConfirmComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BasketConfirmComponent>) { }

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
