import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { TrxIn } from '../../models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.TrxIn;

@Injectable({
  providedIn: 'root'
})
export class TrxInService {

  constructor(private http: HttpClient) { }
  post(model : TrxIn): Observable<any>{
    return this.http.post<TrxIn>(API_URL , model);
  }
  DirectTrxToUser(model : any):  Observable<any>{
    const action ='/DirectTrxToUser';
    return this.http.post<any>(API_URL + action , model)
  }
}
