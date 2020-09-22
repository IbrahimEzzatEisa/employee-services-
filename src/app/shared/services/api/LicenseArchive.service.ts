import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import {  DropdownList } from '../../models';
import { Observable } from 'rxjs';
import { LicenseArchive, LicenseArchiveType } from '../../models/LicenseArchive.model';
import { LicenseArchiveSearchResult } from '../../models/License-Archive-Search.model';

const API_URL = END_POINTS.LicenseArchive;

export class attachment
{
  ArchiveLicenseAttachID :number;
  AttachDate:string;
  AttachFile:string;
  Path:string;
  AttachName:string;
  AuthorID:number;
}

interface IDetails {
  x: LicenseArchiveSearchResult;
  
  Attachments: attachment[]
}
@Injectable({
  providedIn: 'root'
})
export class LicenseArchiveService {

  constructor(private http: HttpClient) { }
  GetDetails(id : number):Observable<IDetails>{
    debugger;
    const action = '/GetLicenseArchiveInfo/'
    return this.http.get<IDetails>(API_URL + action + id)
  }

  post(model : LicenseArchive): Observable<any> {
    return this.http.post<LicenseArchive>(API_URL , model);
  }
  put(model : LicenseArchive): Observable<any> {
    return this.http.put<LicenseArchive>(API_URL , model);
  }
  GetTypes(): Observable<DropdownList[]> {
    
    return this.http.get<DropdownList[]>(END_POINTS.LicenseArchiveSearchTypes )
  }

  postType(model : LicenseArchiveType): Observable<LicenseArchiveType>{
    return this.http.post<LicenseArchiveType>(API_URL , model);
  }

  PostAttachment(id :number ,file : File): Observable<any>{
    const action = '/PostAttachment/';
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<any>(API_URL + action + id , formData);
  }


}
