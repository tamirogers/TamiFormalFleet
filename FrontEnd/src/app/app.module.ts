import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FleetService } from 'src/app/fleet.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

import { AppComponent } from './app.component';
import { FleetHomeComponent } from './fleet-home/fleet-home.component';
import { AppRoutingModule } from './/app-routing.module';
import { FleetEditComponent } from './fleet-home/fleet-edit/fleet-edit.component';
import { FleetSearchComponent } from './fleet-home/fleet-search/fleet-search.component';
import { FleetNewComponent } from './fleet-home/fleet-new/fleet-new.component';
/* NgRx Redux store */
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    FleetHomeComponent,
    FleetEditComponent,
    FleetSearchComponent,
    FleetNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    FormsModule,
   // HttpModule,
    HttpClientModule
  ],
  providers: [
    FleetService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
