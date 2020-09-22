import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { Archive, ArchiveType, ArchiveLeve, ArchiveSearchResult, DropdownList, ArchiveSearch, FilterParams, ResultWithPagination } from '../../models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.Archive;

export class attachment
{
  ArchiveAttachID :number;
  AttachDate:string;
  AttachFile:string;
  Path:string;
  AttachName:string;
  AuthorID:number;
}
interface IDetails {
  x: ArchiveSearchResult;
  
  Attachments: attachment[]
}
@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }

  post(model : Archive): Observable<any> {
    return this.http.post<Archive>(API_URL , model);
  }
  postSearch(model : ArchiveSearch ,filterParams?: FilterParams):Observable<ResultWithPagination<ArchiveSearchResult[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.post<ResultWithPagination<any[]>>(API_URL+"/SearchArchives", model , {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "ArchiveID",
        sortDirection: filterParams.sortDirection,
    
      }
    });
  }
  getArchiveType(): Observable<ArchiveType[]>{
    const action = '/GetArchiveTypes';
    return this.http.get<ArchiveType[]>(API_URL + action);
  }
  getArchiveLeve(): Observable<ArchiveLeve[]>{
    const action = '/GetArchiveLevels';
    return this.http.get<ArchiveLeve[]>(API_URL + action);
  }
  PostAttachment(id :number ,file : File): Observable<any>{
    const action = '/PostAttachment/';
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<any>(API_URL + action + id , formData);
  }
  GetDepartments(): Observable<DropdownList[]> {
    return this.http.get<DropdownList[]>(END_POINTS.departmentsIDName )
  }

  GetDepartmentEmployees(depaermentID:number): Observable<DropdownList[]> {
    return this.http.get<DropdownList[]>(END_POINTS.departmentUsersIDName  + depaermentID)
  }
  GetDetails(id : number):Observable<IDetails>{
    debugger;
    const action = '/GetArchiveInfo/'
    return this.http.get<IDetails>(API_URL + action + id)
  }

}
