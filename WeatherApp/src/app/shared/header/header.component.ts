import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'WeatherApp';
  showMenu = false;
  darkModeActive = false;
  @Output() themeModeEvent = new EventEmitter<boolean>();

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.uiService.menuState.next(this.showMenu);
  }

  modeToggleSwitch(value: boolean) {
    this.darkModeActive = !this.darkModeActive;
    this.themeModeEvent.emit(value);
  }
}