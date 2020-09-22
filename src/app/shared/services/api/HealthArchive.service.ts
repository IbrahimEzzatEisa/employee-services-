import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthArchive } from '../../models/HealthArchive.model';
import { HealthArchiveSearchResult } from '../../models/Health-Archive-Search.model';

export class attachment
{
  ArchiveHealthAttachID :number;
  AttachDate:string;
  AttachFile:string;
  Path:string;
  AttachName:string;
  AuthorID:number;
}

interface IDetails {
  x: HealthArchive;
  Attachments: attachment[]
}

interface archiveDetails {
  x: HealthArchiveSearchResult;
  Attachments: attachment[]
}
const API_URL = END_POINTS.HealthArchive;


@Injectable({
  providedIn: 'root'
})
export class HealthArchiveService {

  constructor(private http: HttpClient) { }

  post(model : HealthArchive): Observable<any> {
    return this.http.post<HealthArchive>(API_URL , model);
  }
  put(model : HealthArchive): Observable<any> {
    return this.http.put<HealthArchive>(API_URL , model);
  }
  PostAttachment(id :number ,file : File): Observable<any>{
    const action = '/PostAttachment/';
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<any>(API_URL + action + id , formData);
  }
  GetDetails(id : number):Observable<IDetails>{
    debugger;
    const action = '/GetHealthArchiveInfo/'
    return this.http.get<IDetails>(API_URL + action + id)
  }
  GetDetailsForDetails(id : number):Observable<archiveDetails>{
    debugger;
    const action = '/GetHealthArchiveInfo/'
    return this.http.get<archiveDetails>(API_URL + action + id)
  }

}
