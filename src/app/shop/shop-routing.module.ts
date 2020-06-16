import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: ':id', component: CourseDetailsComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
