import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TrainingEmp } from '../../models';
import { END_POINTS } from './globals/global-config';
const API_URL = END_POINTS.trainingEmp;


@Injectable({
  providedIn: 'root'
})
export class TrainingEmpService {

  constructor(private http: HttpClient) { }

  getTrainingEmp(): Observable<TrainingEmp[]> {
    return this.http.get<TrainingEmp[]>(API_URL);
  }
  getTrainingEmployee(id: number): Observable<TrainingEmp[]> {
    return this.http.get<TrainingEmp[]>(API_URL + `/${id}`);
  }


}
