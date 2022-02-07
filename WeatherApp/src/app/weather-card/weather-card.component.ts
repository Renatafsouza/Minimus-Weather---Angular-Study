import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { FbService } from '../services/fb/fb.service';
import { UiService } from '../services/ui.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  darkMode = false;
  condition = 'Snowing';
  currentTemp = 0;
  minTemp = 0;
  maxTemp = 20;
  cityName = "Paris";
  state = "";
  temp = 0;
  errorMessage = "";

  sub: Subscription = new Subscription();

  @Input() addMode: boolean = false;
  @Input('city') set city(city: string) {
    this.cityName = city;
    this.weather.getWeather$(city)
      .pipe(first())
      .subscribe((payload) => {
        this.condition = payload.weather[0].main;
        this.currentTemp = Math.ceil(payload.main.temp);
      // }, (err) => {
      //   this.errorMessage = err.error.message;
      //   setTimeout(() => {
      //     this.errorMessage = '';
      //   }, 3000);
      });
      
    this.weather.getForecast$(city)
      .pipe(first())
      .subscribe((payload) => {
        console.log("Get Forecast")
        console.log(payload)
        this.maxTemp = Math.round(payload[0].main.temp_max);
        this.minTemp = Math.round(payload[0].main.temp_min);
        for (const res of payload) {
          if (new Date().toLocaleDateString('en-GB') === new Date(res.dt_txt).toLocaleDateString('en-GB')) {
            this.maxTemp = res.main.temp > this.maxTemp ? Math.round(res.main.temp) : this.maxTemp;
            this.minTemp = res.main.temp < this.minTemp ? Math.round(res.main.temp) : this.minTemp;
          }
        }
      }, (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });

  };

  @Output() cityStored = new EventEmitter();
  cityAdded = false;

  constructor(private router: Router,
            private ui: UiService,
            private weather: WeatherService,
            private fb: FbService
            ) { }

  ngOnInit(): void {
    
    this.sub = this.ui.darkModeState.subscribe((value) => {
      this.darkMode = value;
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  openDetails() {
    console.log("open details")
    console.log(this.cityName)
    this.router.navigateByUrl('/details/' + this.cityName);

    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity() {
    console.log("Add city here");

    this.fb.addCity$(this.cityName).subscribe(data => {
      console.log(data)
      // this.cityName = null;
      // this.maxTemp = null;
      // this.minTemp = null;
      // this.state = null;
      // this.temp = null;
      this.cityAdded = true;
      this.cityStored.emit();
      setTimeout(() => this.cityAdded = false, 2000);
    });
  }

  

}
