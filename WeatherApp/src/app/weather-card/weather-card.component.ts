import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  darkMode = false;
  condition = 'Snowing';
  currentTemp = "0";
  minTemp = "0";
  maxTemp = "20";
  sub: Subscription = new Subscription();

  constructor(private ui: UiService) { }

  ngOnInit(): void {
    this.sub = this.ui.darkModeState.subscribe((value) => {
      this.darkMode = value;
    });
  }

  openDetails() {
    console.log("open details")
  }

}
