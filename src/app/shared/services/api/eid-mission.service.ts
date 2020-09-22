import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient} from '@angular/common/http';
import { EidMission } from '../../models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.eidMission;
type EidType = {EidMissionTypeId: number,EidMissionTypeName: string};
type Interval = {EidMissionIntervalId: number, EidMissionIntervalName:string};

@Injectable({
  providedIn: 'root'
})
export class EidMissionService {

  constructor(private http: HttpClient) { }

  post(model : EidMission): Observable<{message:string}> {
    return this.http.post<{message:string}>(API_URL , model);
  }
  //التعويض
  GetTypes() : Observable<EidType[]>{
    const action = "/GetTypes"
      return this.http.get<EidType[]>(API_URL + action);
  }
  GetIntervals() : Observable<Interval[]>{
    const action = "/GetIntervals"
      return this.http.get<Interval[]>(API_URL + action);
  }
  

}

