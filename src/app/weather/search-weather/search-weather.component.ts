import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { weatherAll, weatherModel } from 'src/app/models/weather-model';
import { WeatherServiceService } from 'src/app/services/weather-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.css'],
})
export class SearchWeatherComponent implements OnInit {
  constructor(
    private WeatherService: WeatherServiceService,
    private toastr: ToastrService
  ) {}

  // weatherArray: weatherModel[] = [];
  weatherArray: weatherAll[] = [];

  onSubmit(cidade: string): void {
    if (cidade == '') {
      this.toastr.error('Campo vazio! Por favor, digite algo!');
    } else {
      this.WeatherService.getWeatherData(cidade).subscribe(
        (data: HttpResponse<weatherModel>) => {
          if (
            this.weatherArray.filter(
              (weatherItem) => weatherItem.name === data.body.name
            ).length === 0
          ) {
            // this.weatherArray.push(data.body);
            this.fillArray(data.body);
          } else {
            this.toastr.error('Cidade já inserida!');
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.toastr.error('Cidade inexistente!');
        },
        () => {}
      );
    }
  }

  fillArray = (data: weatherModel) => {
    let weather: weatherAll = {
      name: data.name,
      country: data.sys.country,
      sunset: data.sys.sunset,
      sunrise: data.sys.sunrise,

      temp: data.main.temp,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,

      icon: data.weather[0].icon,

      isDay: true,
    };

    weather.isDay = this.calcIsDay(weather);

    this.weatherArray.push(weather);
  };

  calcIsDay = (data: weatherAll): boolean => {
    let sunsetTime = new Date(data.sunset * 1000);
    let sunriseTime = new Date(data.sunrise * 1000);
    let currentTime = new Date();

    let isDay = currentTime > sunriseTime && currentTime < sunsetTime;

    return isDay;
  };

  ngOnInit() {
    this.fillArray;
  }
}
