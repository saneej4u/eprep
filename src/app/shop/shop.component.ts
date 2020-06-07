import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  itemsPerSlide = 4;
  singleSlideOffset = false;
  noWrap = false;
 
  slidesChangeMessage = '';
 
  slides = [
    {image: '/assets/images/business-care-clean-clinic-208474.jpg'},
    {image: '/assets/images/black-wireless-keyboard-beside-mouse-3143791.jpg'},
    {image: '/assets/images/woman-using-laptop-2422286.jpg'},
    {image: '/assets/images/woman-having-dental-check-up-3845653.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'},
    {image: '/assets/images/hero1.jpg'}
  ];
 
  onSlideRangeChange(indexes: number[]): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

}
