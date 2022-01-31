import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  darkModeActive = false;

  constructor() { }

  modeToggleEvent(isDarkMode: boolean) {
    this.darkModeActive = isDarkMode;
  }
}
