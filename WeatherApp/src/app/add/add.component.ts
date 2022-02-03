import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  selectedCity = '';
  capitals = [];
  showNote = false;
  cardCity = '';
  state = "Sunny";
  temp = 0;
  followedCM = false;
  

  constructor() { }

  ngOnInit(): void {
  }

  selectCity(value: string) {

  }

  addCityOfTheMonth() {

  }
}
