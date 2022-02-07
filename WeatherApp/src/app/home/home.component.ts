import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { CityName, FbService } from '../services/fb/fb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cities!: CityName[];
  
  constructor(private fb: FbService) { }

  ngOnInit(): void {
    console.log("ONINIG")
    this.fb.getCities$().subscribe(
      (res: any) => {
        this.cities = Object.keys(res).map((key) => { return res[key] });
        console.log(this.cities);
      }
    );
  }

}
