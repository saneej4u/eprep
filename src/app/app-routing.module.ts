import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { CourseDetailsComponent } from './shop/course-details/course-details.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  { path: 'account/login', component: LoginComponent},
  { path: 'account/register', component: RegisterComponent},
  {path: 'shop/:id', component: CourseDetailsComponent},
  {path: '*', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
