import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, Observable, Subject } from 'rxjs';
import { Weather } from '../models/Weather.model';
import { environment } from 'src/environments/environment';

export interface WeatherList {
  list: Weather[]
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = environment.appID;
  
  constructor(private http: HttpClient) { }

/** 
 * Implementing using RxJS operators pipe, first, map
 */

  getWeather$(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get<Weather>(
      `${this.baseURL}${city}&units=${metric}&APPID=${this.appID}`).pipe((first()));
  }

  getForecast$(city: string, metric: 'metric' | 'imperial' = 'metric'): Observable<any> {
    return this.http.get<WeatherList>(
      `${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first(), map((weather) => weather['list']));
  }

 /*
  Implementing with Subject
 */ 
  
  getCityWeatherByName(city: string, metric: string) {
    const dataSub = new Subject();

    this.http.get<Weather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=517c5053a8d35544f0d4c91fdacf09ab`)
              .subscribe((data) => {
                dataSub.next(data['weather']);
              });

    return dataSub;          
  }

  getCitiesWeathersByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const citiesSubject = new Subject();
    cities.forEach((city) => {
      citiesSubject.next(this.http.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=517c5053a8d35544f0d4c91fdacf09ab`));
    });
    return citiesSubject;
  }

  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get<Weather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=517c5053a8d35544f0d4c91fdacf09ab`)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
      });
    return dataSubject;
  }

  getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get<Weather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=517c5053a8d35544f0d4c91fdacf09ab`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }


  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=517c5053a8d35544f0d4c91fdacf09ab`)
      .subscribe((weather: any) => {
        console.log(weather);
        dataSubject.next(weather.main.humidity);
      });
    return dataSubject;
  }


  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    this.http.get<Weather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=517c5053a8d35544f0d4c91fdacf09ab`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Math.round(weather.wind.speed)));
      });
    return dataSubject;
  }


  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.get<Weather>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=517c5053a8d35544f0d4c91fdacf09ab`)
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.forEach((value: any) => {
          if (max < value.main.temp) {
            max = value.main.temp;
          }
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let min: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=517c5053a8d35544f0d4c91fdacf09ab`)
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach((value: any) => {
          if (min > value.main.temp) {
            min = value.main.temp;
          }
        });
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>>  {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=517c5053a8d35544f0d4c91fdacf09ab`)
      .subscribe((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject;
  }

}
