import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule } from 'ngx-videogular';




@NgModule({
  declarations: [NavBarComponent, VideoModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule
  ],
  exports: [
    NavBarComponent,
    CarouselModule,
    AccordionModule,
    ModalModule,
    VideoModalComponent
  ]
})
export class CoreModule { }
