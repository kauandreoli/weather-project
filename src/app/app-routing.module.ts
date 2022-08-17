import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchWeatherComponent } from './weather/search-weather/search-weather.component';
import { SerarchForecastWeatherComponent } from './weather/serarch-forecast-weather/serarch-forecast-weather.component';


const routes: Routes = [
  { path: 'weather', component: SearchWeatherComponent },
  { path: 'forecastweather', component: SerarchForecastWeatherComponent },
  { path: '', pathMatch: 'full', redirectTo: 'weather' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
