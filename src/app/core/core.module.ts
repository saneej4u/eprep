import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot()
  ],
  exports: [
    NavBarComponent,
    CarouselModule,
    AccordionModule
  ]
})
export class CoreModule { }
