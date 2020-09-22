import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DropdownList, TrxinboxDetailsPost } from '../../models';

interface ITrxDetails {
  StatementID: number;
  StatementText: string
}

const API_URL = END_POINTS.TrxDetails;

@Injectable({
  providedIn: 'root'
})
export class TrxDetailsService {

  constructor(private http: HttpClient) { }
  GetTrxDirectiveStatements(): Observable<ITrxDetails[]> {
    const action = '/GetTrxDirectiveStatements';
    return this.http.get<ITrxDetails[]>(API_URL + action)
  }
  GetUndoDepartments(): Observable<DropdownList[]> {
    const action = '/GetUndoDepartments';
    return this.http.get<DropdownList[]>(API_URL + action)
  }
  GetRedirectEmployees(): Observable<DropdownList[]> {
    const action = '/GetRedirectEmployees';
    return this.http.get<DropdownList[]>(API_URL + action)
  }
  GetFoldersForSave(): Observable<DropdownList[]> {
    const action = '/GetFoldersForSave';
    return this.http.get<DropdownList[]>(API_URL + action)
  }
  GetCopyToDepartments(): Observable<DropdownList[]> {
    const action = '/GetCopyToDepartments';
    return this.http.get<DropdownList[]>(API_URL + action)
  }
  TrxRecive(directiveID: number): Observable<any> {
    const action = '/TrxRecive/';
    return this.http.get<any>(API_URL + action + directiveID)
  }
  AdddirectiveStatements(Name: string): Observable<any> {
    const action = '/AdddirectiveStatements';
    return this.http.post<any>(API_URL + action, {
      StatementID: 0,
      StatementText: Name,
      Active: true
    })
  }
  AddSaveFolder(Name: string): Observable<any> {
    const action = '/AddSaveFolder';
    return this.http.post<any>(API_URL + action, {
      FolderID: 0,
      FolderName: Name,
      DepartmentID: JSON.parse(localStorage.getItem('User')).DepartmentID
    })
  }

  SaveTrxDirectiveForDetails(model: TrxinboxDetailsPost): Observable<TrxinboxDetailsPost> {
    const action = '/SaveTrxDirectiveForDetails';
    let formData = new FormData();
    let arr = []
    arr = [...Object.entries(model)]
    let headers = new HttpHeaders();
    console.table(arr)
    let params = new HttpParams();
    arr.map(item => {
      formData.append(item[0], item[1])
    })
    console.log(formData);
    return this.http.post<TrxinboxDetailsPost>(API_URL + action, formData, {
      params: params, headers: new HttpHeaders()
        .append('enctype', 'multipart/form-data')
    })
  }
  SaveTrxCopiesUser(model : any):Observable<any>{
    const action = '/SaveTrxCopiesUser';
    return this.http.post(API_URL + action , model);
  }
  

}
