import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import {MaintenanceTabel, Maintenance, ResultWithRanking, MaintenanceSendNotes, MaintenanceDetails, SaveDirective, MaintenanceSearchBox, FilterParams, ResultWithPagination } from '../../models';


const API_URL = END_POINTS.maintenancetabel;
const API = END_POINTS.maintenance;
const API_Notes = END_POINTS.maintenanceSendNotes;
const API_Details = END_POINTS.maintenanceDetails;
const API_SaveDirective = END_POINTS.SaveDirective;




@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  getMaintance(id): Observable<MaintenanceTabel[]> {
    return this.http.get<MaintenanceTabel[]>(API_URL + `/${id}`);
  }

  create(model: Maintenance): Observable<Maintenance[]> {
    return this.http.post<Maintenance[]>(API, model);
  }
  update( id: number ,model: Maintenance): Observable<ResultWithRanking<Maintenance>> {
    return this.http.put<ResultWithRanking<Maintenance>>(API +`/${id}`, model);
  }
  delete(id): Observable<Maintenance>{
    return this.http.delete<Maintenance>(API + `/${id}`);
  }

  // send notes
  postNote(model: MaintenanceSendNotes): Observable<MaintenanceSendNotes[]> {
    return this.http.post<MaintenanceSendNotes[]>(API_Notes, model);
  }
  // get maintenance Details
  
  getMaintanceDetails(id): Observable<MaintenanceDetails> {
    return this.http.get<MaintenanceDetails>(API_Details + `/${id}`);
  }
  // save Directive 
  SaveDirective(model: SaveDirective): Observable<SaveDirective[]> {
    return this.http.post<SaveDirective[]>(API_SaveDirective, model);
  }
  SearchMaintenance(model : MaintenanceSearchBox , filterParams:FilterParams):Observable<ResultWithPagination<any[]>>{
    const action ='/SearchMaintenance';
    return this.http.post<ResultWithPagination<any[]>>(API + action , model ,{
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "MaintenanceID",
        sortDirection: filterParams.sortDirection
      }
    });
    
  }

  
}
