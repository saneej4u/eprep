import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AccountComponent } from './account/account.component';
import { ShopModule } from './shop/shop.module';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { TeachModule } from './teach/teach.module';
import { TeachComponent } from './teach/teach.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeContentComponent },
      {
        path: 'basket',
        loadChildren: () =>
          import('./basket/basket.module').then(mod => mod.BasketModule)
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./shop/shop.module').then(mod => mod.ShopModule)
      },
      {
        path: 'checkout',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./checkout/checkout.module').then(mod => mod.CheckoutModule)
      }
    ]
  },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./account/account.module').then(mod => mod.AccountModule)
      }
    ]
  },
  {
    path: 'teach',
    component: TeachComponent,
    children: [
      {path: '', loadChildren: () => import('./teach/teach.module').then(mod => mod.TeachModule)}
    ]
  },
  { path: '*', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
