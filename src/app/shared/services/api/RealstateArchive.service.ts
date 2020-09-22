import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import {  ArchiveType, ArchiveLeve } from '../../models';
import { Observable } from 'rxjs';
import { RealStateArchive } from '../../models/RealStateArchive.model';
import { RealStateArchiveSearchResult } from '../../models/RealState-Archive-Search.model';

const API_URL = END_POINTS.RealstateArchive;
export class attachment
{
  ArchiveRealStateAttachID :number;
  AttachDate:string;
  AttachFile:string;
  Path:string;
  AttachName:string;
  AuthorID:number;
}

interface IDetails {
  x: RealStateArchiveSearchResult;
  
  Attachments: attachment[]
}

@Injectable({
  providedIn: 'root'
})
export class RealstateArchiveService {

  constructor(private http: HttpClient) { }

  post(model : RealStateArchive): Observable<any> {
    return this.http.post<RealStateArchive>(API_URL , model);
  }
  put(model : RealStateArchive): Observable<any> {
    return this.http.put<RealStateArchive>(API_URL , model);
  }
 
  PostAttachment(id :number ,file : File): Observable<any>{
    const action = '/PostAttachment/';
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<any>(API_URL + action + id , formData);
  }
 
  GetDetails(id : number):Observable<IDetails>{
    debugger;
    const action = '/GetInfo/'
    return this.http.get<IDetails>(API_URL + action + id)
  }

}
