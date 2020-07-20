import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';
import { HomeModule } from './home/home.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountModule } from './account/account.module';
import { BasketConfirmComponent } from './shared/components/basket-confirm/basket-confirm.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { BasketConfirmModelComponent } from './shared/components/basket-confirm-model/basket-confirm-model.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    BasketConfirmComponent,
    BasketConfirmModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    CoreModule,
    HomeModule,
    AccountModule,
    MatBottomSheetModule,
    MatDialogModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  entryComponents: [BasketConfirmComponent, BasketConfirmModelComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
