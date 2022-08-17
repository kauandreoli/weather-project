import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { APIKEY } from '../utils/environment';
import { weatherModel } from '../models/weather-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = `http://api.openweathermap.org/data/2.5`

  getWeatherData = (cidade: string): Observable<HttpResponse<weatherModel>> => {
    const weatherUrl = `${this.baseUrl}/weather?q=${cidade}&units=metric&appid=${APIKEY}`;

    return this.http.get<weatherModel>(weatherUrl,{ observe: 'response' });
  }
}
