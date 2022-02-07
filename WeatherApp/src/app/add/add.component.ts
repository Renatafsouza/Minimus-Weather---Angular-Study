import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CityService } from '../services/city/city.service';
import { FbService } from '../services/fb/fb.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  selectedCity = '';
  capitals = Array<any>();
  showNote = false;
  cardCity = '';
  state = "Sunny";
  temp = 0;
  followedCM = false;
  city = "Paris";
  
  sub1: Subscription = new Subscription(); 

  constructor(private weather: WeatherService, private cityService: CityService, private fb: FbService) { }

  ngOnInit() {
    // getting the city placeID data info to right side of the screen
    this.weather.getWeather$(this.city).subscribe((payload) => {
      console.log("main")
      console.log(payload)
      this.temp = payload.main.temp;
      this.state = payload.weather[0].main;
    });

    // getting cities options
    this.cityService.getCities$().subscribe((payload) => {
      this.capitals = payload;
    });

    // this.sub1 = this.fb.getCities$().subscribe((cities) => {
    //   Object.values(cities).forEach((city: any) => {
    //     if (city.name === 'Paris') {
    //       this.followedCM = true;
    //     }
    //   });
    // });

  }

  selectCity(value: string) {
    this.cardCity = value;
  }

  addCityOfTheMonth() {

  }
}
