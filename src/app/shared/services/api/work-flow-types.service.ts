import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { END_POINTS } from './globals/global-config';
import { WorkFlowTypes } from '../../models';

const API_URL = END_POINTS.WorkFlowTypes;

@Injectable({
  providedIn: 'root'
})
export class WorkFlowTypesService {

  constructor(private http: HttpClient) { }


  getWorkFlowTypes(): Observable<WorkFlowTypes[]> {
    return this.http.get<WorkFlowTypes[]>(API_URL);
  }

}
