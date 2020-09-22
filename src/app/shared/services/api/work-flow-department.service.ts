import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { END_POINTS } from './globals/global-config';
import { WorkFlowDepartment } from '../../models';

const API_URL = END_POINTS.WorkFlowDepartment;

@Injectable({
  providedIn: 'root'
})
export class WorkFlowDepartmentService {

  constructor(private http: HttpClient) { }

  getWorkFlowDepartment(): Observable<WorkFlowDepartment[]> {
    return this.http.get<WorkFlowDepartment[]>(API_URL);
  }

}

