import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = END_POINTS.fingerPrint;
@Injectable({
  providedIn: 'root'
})
export class FingerPrintService {

  constructor(
    private http: HttpClient
  ) { }

  UpdateFingerPrintData(model:any): Observable<any> {
    const action = '/UpdateFingerPrintData';
    return this.http.post<any>(API_URL + action, model);
  }

}
