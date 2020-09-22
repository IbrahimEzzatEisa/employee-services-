import { Injectable } from '@angular/core';
import { TrainingRequest } from '../../models';
import { END_POINTS } from './globals/global-config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const API_URL = END_POINTS.trainingRequest;

@Injectable({
  providedIn: 'root'
})
export class TrainingrequestService {

  constructor(private http: HttpClient) { }


  create(model: TrainingRequest): Observable<TrainingRequest> {
    return this.http.post<TrainingRequest>(API_URL, model);
  }
}
