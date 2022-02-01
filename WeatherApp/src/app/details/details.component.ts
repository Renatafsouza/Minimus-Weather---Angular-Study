import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  darkMode: boolean = false;
  city: string = '';
  state: string = '';
  temp: number = 0;
  hum: number = 0;
  wind: number = 0;

  today: string = '';

  day1Name: string = '';
  day1State: string = '';
  day1Temp: number = 0;

  day2Name: string = '';
  day2State: string = '';
  day2Temp: number = 0;

  day3Name: string = '';
  day3State: string = '';
  day3Temp: number = 0;

  day4Name: string = '';
  day4State: string = '';
  day4Temp: number = 0;

  day5Name: string = '';
  day5State: string = '';
  day5Temp: number = 0;

  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();
  sub4: Subscription = new Subscription();
  sub5: Subscription = new Subscription();
  sub: Subscription = new Subscription();
  
  constructor(private activeRouter: ActivatedRoute ,private weather: WeatherService, private ui: UiService) { }

  ngOnInit(): void {
    this.sub = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    this.activeRouter.paramMap.subscribe((route: any) => {

      this.city = route.params.city;
      this.sub1 = this.weather.getWeatherState(this.city).subscribe((state: any) => this.state = state);
      this.sub2 = this.weather.getCurrentTemp(this.city).subscribe((temperature: any) => this.temp = temperature);
      this.sub3 = this.weather.getCurrentHum(this.city).subscribe((humidity: any) => this.hum = humidity);
      this.sub4 = this.weather.getCurrentWind(this.city).subscribe((windspeed: any) => this.wind = windspeed);
      this.sub5 = this.weather.getForecast(this.city).subscribe((data: any) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i].dt_txt).getDay();
          console.log(days[date]);
          if (((date === todayNumberInWeek + 1) || (todayNumberInWeek === 6 && date === 0)) && !this.day1Name) {
            this.day1Name = days[date];
            this.day1State = data[i].weather[0].main;
            this.day1Temp = Math.round(data[i].main.temp);

          } else if (!!this.day1Name && !this.day2Name && days[date] !== this.day1Name) {
            this.day2Name = days[date];
            this.day2State = data[i].weather[0].main;
            this.day2Temp = Math.round(data[i].main.temp);

          } else if (!!this.day2Name && !this.day3Name && days[date] !== this.day2Name) {
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main.temp);

          } else if (!!this.day3Name && !this.day4Name && days[date] !== this.day3Name) {
            this.day4Name = days[date];
            this.day4State = data[i].weather[0].main;
            this.day4Temp = Math.round(data[i].main.temp);

          } else if (!!this.day4Name && !this.day5Name && days[date] !== this.day4Name) {
            this.day5Name = days[date];
            this.day5State = data[i].weather[0].main;
            this.day5Temp = Math.round(data[i].main.temp);

          }
        }
      });
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
      this.sub3.unsubscribe();
      this.sub4.unsubscribe();
      this.sub5.unsubscribe();
  }
}
