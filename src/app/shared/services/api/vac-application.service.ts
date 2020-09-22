import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FilterParams, ResultWithRanking, VacApplication, ResultWithPagination } from 'src/app/shared/models';
import { END_POINTS } from './globals/global-config';
const API_URL = END_POINTS.vacApplication;

@Injectable({
  providedIn: 'root'
})
export class VacApplicationService {

  constructor(private http: HttpClient) { }

  get(id: string | number): Observable<ResultWithRanking<VacApplication>> {
    return this.http.get<ResultWithRanking<VacApplication>>(API_URL + `/${id}`);
  }

  getAll(filterParams?: FilterParams): Observable<VacApplication[]> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<VacApplication[]>(API_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField,
        sortDirection: filterParams.sortDirection
      }
    });
  }
  create(model: VacApplication): Observable<VacApplication> {
    return this.http.post<VacApplication>(API_URL, model);
  }
  update(id, model: VacApplication): Observable<ResultWithRanking<VacApplication>> {
    return this.http.put<ResultWithRanking<VacApplication>>(API_URL + `/${id}`, model);
  }
  delete(id): Observable<VacApplication> {
    return this.http.delete<VacApplication>(API_URL + `/${id}`);
  }
  postFile (fileToUpload: File) {
    const endPoint = ' http://employeeservices.taj-it.com/api/UploadFile' 
     const formData: FormData = new FormData();
     formData.append('files' , fileToUpload)
     return this.http.post(endPoint , formData);
  }
  SearchVacations(model : any ,filterParams?: FilterParams):Observable<ResultWithPagination<any[]>> {
    const action = 'SearchVacations'
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL+`/${action}`, model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "VacationID",
        sortDirection: filterParams.sortDirection,
    
      }
    });
  }

}
