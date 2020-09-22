
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { DepartmentByUser } from '../../models';



const API_URL = END_POINTS.departmentByUser;

@Injectable({
  providedIn: 'root'
})
export class DepartmentByUserService {

  constructor(private http: HttpClient) { }
  get(id: number): Observable<DepartmentByUser[]> {
    return this.http.get<DepartmentByUser[]>(API_URL+`/${id}`);
}


}
