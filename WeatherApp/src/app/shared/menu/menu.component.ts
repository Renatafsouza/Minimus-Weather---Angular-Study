import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  showMenu = false;
  darkModeActive: boolean = true;
  subMenuMode: Subscription = new Subscription();
  subDarkMode: Subscription = new Subscription();

  constructor(private ui: UiService) { }

  ngOnInit(): void {
    this.subMenuMode = this.ui.menuState.subscribe((value) => {
      this.showMenu = value;
    });

    this.subDarkMode = this.ui.darkModeState.subscribe((value) => {
      console.log("my dark")
      console.log(value)
      this.darkModeActive = value;
    });

    console.log("darkmode menu")
    console.log(this.darkModeActive)
  }

  toggleMenu() {
    console.log("show menu")
    this.showMenu = !this.showMenu;
  }

  ngOnDestroy(): void {
    this.subMenuMode.unsubscribe();
    this.subDarkMode.unsubscribe();
  }
}
