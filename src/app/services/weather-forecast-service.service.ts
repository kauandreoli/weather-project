import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { APIKEY } from '../utils/environment';
import { observable, Observable } from 'rxjs';
import { forecastModel } from '../models/forecast-model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = `http://api.openweathermap.org/data/2.5`

  getForecastWeatherData = (cidade: string): Observable<HttpResponse<forecastModel>> => {
    const forecastUrl = `${this.baseUrl}/forecast?q=${cidade}&units=metric&appid=${APIKEY}`;

    return this.http.get<forecastModel>(forecastUrl,{ observe: 'response' });

  }




}
