import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'WeatherApp';
  showMenu = true;
  darkModeActive = false;
  @Output() themeModeEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    console.log("toggle")
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch(value: boolean) {
    this.themeModeEvent.emit(value);
  }

}
