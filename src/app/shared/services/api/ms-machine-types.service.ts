import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from './globals/global-config';
import { MsMachineTypes } from 'src/app/shared/models';


const API_URL = END_POINTS.msMachineTypes;

@Injectable({
  providedIn: 'root'
})
export class MsMachineTypesService {

  constructor(private http: HttpClient) { }


    getMsMachineTypes(): Observable<MsMachineTypes[]> {
      return this.http.get<MsMachineTypes[]>(API_URL);
    }
    PostMaintenancetype(model: MsMachineTypes): Observable<MsMachineTypes[]> {
      return this.http.post<MsMachineTypes[]>(API_URL, model);
    }

    delete(id): Observable<MsMachineTypes>{
      return this.http.delete<MsMachineTypes>(API_URL + `/${id}`);
    }
  
}
