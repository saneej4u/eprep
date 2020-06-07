import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [ShopComponent, ProductItemComponent],
  imports: [
    CommonModule,
    CarouselModule.forRoot()
  ],
  exports:[ShopComponent]
})
export class ShopModule { }
