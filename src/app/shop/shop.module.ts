import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoreModule } from '../core/core.module';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ShopComponent, CourseDetailsComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }
