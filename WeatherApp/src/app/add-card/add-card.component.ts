import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit, OnDestroy {
  darkMode = false;
  sub: Subscription = new Subscription();

  constructor(private ui: UiService) { }

  ngOnInit(): void {
    this.sub = this.ui.darkModeState.subscribe((value) => {
      this.darkMode = value;
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
