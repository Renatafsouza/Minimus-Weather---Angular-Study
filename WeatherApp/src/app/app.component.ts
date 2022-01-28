import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';
  showMenu = true;
  darkModeActive = false;

  toggleMenu() {
    console.log("toggle")
  }

  modeToggleSwitch() {
    console.log("mode toggle switch")
  }
}
