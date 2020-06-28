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
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    TextInputComponent,
    VideoModalComponent,
    BasketSummaryComponent,
    CourseItemComponent,
    StepperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule,
    CdkStepperModule,
    FileUploadModule,
    SortableModule.forRoot(),
    TabsModule.forRoot(),
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
    CourseItemComponent,
    CdkStepperModule,
    StepperComponent,
    FileUploadModule,
    SortableModule,
    TabsModule
  ]
})
export class SharedModule { }
