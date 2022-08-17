import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchWeatherComponent } from './weather/search-weather/search-weather.component';
import { FormsModule } from '@angular/forms';
import { SerarchForecastWeatherComponent } from './weather/serarch-forecast-weather/serarch-forecast-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchWeatherComponent,
    SerarchForecastWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar: true,
      tapToDismiss: true
    }),
    BrowserAnimationsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
