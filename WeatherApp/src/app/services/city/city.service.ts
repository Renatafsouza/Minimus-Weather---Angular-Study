import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface City {
  state_name: string
}

export interface Capital {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseUrl = 'https://www.universal-tutorial.com/api';
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "api-token": "6S79xJ6PsZxbf8uwn0tyGcIhSVqhmjeEyh3Qa7yOJRzN88qc1qTilVHztr5QgT4sAvY",
      "user-email": "renata.rfsouza@gmail.com"
    })
  };

  constructor(private http: HttpClient) { }


 // pipe or subscribe?? 
  getCities$() {
    let capitals: { name: string; }[] = [];
    // this.http.get<City[]>(this.baseUrl + '/states/Italy', this.httpOptions)
    // this.http.get<City[]>('https://restcountries.com/v3.1/all')
    //     .subscribe(response => {
    //       return response
    //     }); 
        
    return this.http.get('https://restcountries.com/v3.1/all')
    .pipe(
      first(),
      map((countries: any) => {
        countries.forEach((country: any) => {
          if (country.capital && country.capital.length) {
            capitals.push(country.capital[0]);
          }
        });
        return capitals.sort();
      })
    )
  }
}
