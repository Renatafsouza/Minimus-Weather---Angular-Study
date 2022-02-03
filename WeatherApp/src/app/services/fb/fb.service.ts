import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, switchMap } from 'rxjs';

export interface CityName {
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class FbService {
  constructor(private http: HttpClient) {}

  addCity$(name: string) {

    return this.http.post(
      'https://minimus-49e69-default-rtdb.firebaseio.com/cities.json',
      name
    ).subscribe(response => console.log(response));

    // return this.auth.uid()
    //   .pipe(switchMap((uid) => {
    //     return this.fs
    //       .write(`${uid}/${name}`, {name, added: new Date()})
    //       .pipe(first());
    //   }), first());
  }

  getCities$() {
    return this.http.get<CityName[]>(
      'https://minimus-49e69-default-rtdb.firebaseio.com/cities.json'
    ).pipe(
      switchMap(data => {
        return data;
    }));
     
    // return this.auth.uid().pipe(
    //   switchMap((uid) => {
    //     return this.fs.read(`${uid}`);
    //   })
    // );
  }
}
