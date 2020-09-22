import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { Emploans } from '../../models';

const API_URL = END_POINTS.emploans;

@Injectable({
  providedIn: 'root'
})
export class EmpLoansService {

  constructor(private http: HttpClient) { }

  getEmploans(): Observable<Emploans> {
    return this.http.get<Emploans>(API_URL);
}
}
