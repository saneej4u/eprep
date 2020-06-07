import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [ShopComponent, CourseItemComponent],
  imports: [
    CommonModule,
    CarouselModule.forRoot()
  ],
  exports:[ShopComponent]
})
export class ShopModule { }
