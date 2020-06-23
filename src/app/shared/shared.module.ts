import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule } from 'ngx-videogular';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { ToastrModule } from 'ngx-toastr';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    TextInputComponent,
    VideoModalComponent,
    BasketSummaryComponent,
    CourseItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    VideoModalComponent,
    CarouselModule,
    AccordionModule,
    ModalModule,
    BasketSummaryComponent,
    ToastrModule,
    CourseItemComponent
  ]
})
export class SharedModule { }
