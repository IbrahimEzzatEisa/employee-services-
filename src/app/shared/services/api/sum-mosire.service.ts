import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { SumMosire } from '../../models';

const API_URL = END_POINTS.sumMosire;

@Injectable({
  providedIn: 'root'
})
export class SumMosireService {

  constructor(private http: HttpClient) { }

  getSumMosire(): Observable<SumMosire[]> {
    return this.http.get<SumMosire[]>(API_URL);
}
}
