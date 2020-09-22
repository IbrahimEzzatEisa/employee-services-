import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { ArchiveType } from '../../models';
import { Observable } from 'rxjs';


const API_URL = END_POINTS.ArchiveTypes;

@Injectable({
  providedIn: 'root'
})
export class ArchiveTypesService {

  constructor(private http: HttpClient) { }

  postArchiveTypes(model : ArchiveType): Observable<ArchiveType>{
    return this.http.post<ArchiveType>(API_URL , model);
  }
}
