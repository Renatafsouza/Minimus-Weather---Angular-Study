import { Component } from '@angular/core';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  darkModeActive = false;

  constructor(private ui: UiService) { }

  modeToggleEvent(isDarkMode: boolean) {
    this.darkModeActive = isDarkMode;
    this.ui.darkModeState.next(this.darkModeActive);
  }
}
