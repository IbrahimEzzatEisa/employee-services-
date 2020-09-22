import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cities } from '../../models';
import { END_POINTS } from './globals/global-config';
const API_URL = END_POINTS.cities;

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }
  getCities(): Observable<Cities[]>{
    return this.http.get<Cities[]>(API_URL)

  }
  
}
