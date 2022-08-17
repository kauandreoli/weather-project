import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { forecastModel, TempMedia } from 'src/app/models/forecast-model';
import { ForecastService } from 'src/app/services/weather-forecast-service.service';
import { List } from '../../models/forecast-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-serarch-forecast-weather',
  templateUrl: './serarch-forecast-weather.component.html',
  styleUrls: ['./serarch-forecast-weather.component.css'],
})
export class SerarchForecastWeatherComponent implements OnInit {
  constructor(
    private ForecastService: ForecastService,
    private toastr: ToastrService
  ) {}

  cidadeNome: forecastModel;
  arrayDeMedia: TempMedia[] = [];
  name: forecastModel[] = [];

  onSubmit(cidade: string): void {
    if (cidade == '') {
      this.toastr.error('Campo vazio! Por favor, digite algo!');
    } else {
      this.ForecastService.getForecastWeatherData(cidade).subscribe(
        (data: HttpResponse<forecastModel>) => {
          if (
            this.name.filter(
              (nameItem) => nameItem.city.name === data.body.city.name
            ).length === 0
          ) {
            this.fillname(data.body);
            this.calcMediaArray(data.body.list);
            this.cidadeNome = data.body;
          } else {
            this.toastr.error('Cidade já inserida');
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.toastr.error('Cidade inexistente!');
        }
      );
    }
  }

  fillname = (data: forecastModel) => {
    this.name.push(data);
  };

  calcMediaArray = (list: List[]) => {
    let peso = 0;
    let somaMedia = 0;
    let somaMediaMin = 0;
    let somaMediaMax = 0;
    let icon = '';
    let data: TempMedia = {
      tempMedia: 0,
      temp_minMedia: 0,
      temp_maxMedia: 0,
      icon: '',
    };

    for (let i = 0; i < list.length; i++) {
      somaMedia += list[i].main.temp;
      somaMediaMin += list[i].main.temp_min;
      somaMediaMax += list[i].main.temp_max;
      icon = list[i].weather[0].icon;

      peso++;
      if (this.calcUnix(list[i].dt)) {
        data.tempMedia = somaMedia / peso;
        data.temp_minMedia = somaMediaMin / peso;
        data.temp_maxMedia = somaMediaMax / peso;
        data.icon = icon;

        this.arrayDeMedia.push(data);
        console.log(this.arrayDeMedia);

        somaMedia = 0;
        somaMediaMin = 0;
        somaMediaMax = 0;
        icon = '';

        peso = 0;

        data = {
          tempMedia: 0,
          temp_minMedia: 0,
          temp_maxMedia: 0,
          icon: '',
        };
      }
    }
  };

  calcUnix = (dt: number) => {
    let date = new Date(dt * 1000);

    let hour = date.getHours();

    if (hour === 21) {
      return true;
    }
    return false;
  };

  // calcMediaMinArray = (list: List[]) => {
  //   let peso = 0;
  //   let somaMedia = 0;

  //   for(let i = 0; i<list.length; i++){
  //     somaMedia += list[i].main.temp_min
  //     peso ++;

  //     if(this.calcUnix(list[i].dt)) {
  //       let media = somaMedia/peso;
  //       this.mediaMinArray.push(media);
  //       somaMedia = 0;
  //       peso = 0;
  //     }

  //   }
  //   console.log(this.mediaMinArray)
  // }

  ngOnInit(): void {}
}
