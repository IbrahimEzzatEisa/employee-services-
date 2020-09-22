import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { UserAgents } from '../../models/UserAgents.model';
import { Agent } from '../../models/agent.model';
import { ResultWithRanking } from '../../models';
const API_URL = END_POINTS.userAgent;
const API = END_POINTS.agents;

// type updateObject = { UserID: number;
//   MyAgent: number;
//   FromDate:string ;
//   FromDateH:string;
//   ToDate:string;
//   ToDateH:string;
//   Reason:string;
//   IsActive: boolean;
//   AgentTrx: boolean;
//   AgentVacation: boolean;
//   Statment:string;}

@Injectable({
  providedIn: 'root'
})
export class UserAgentsService {

  constructor(private http: HttpClient) { }

  getAgentUsers(id: number): Observable<UserAgents[]> {
    return this.http.get<UserAgents[]>(API_URL+`/${id}`);
  }
  create(model: Agent  ): Observable<Agent[]> {
    return this.http.post<Agent[]>(API, model  );
  }

  update( id: number , model: Agent): Observable<ResultWithRanking<Agent>> {
    return this.http.put<ResultWithRanking<Agent>>(API +`/${id}`, model);
  }
  delete(id): Observable<Agent>{
    return this.http.delete<Agent>(API + `/${id}`);
  }
  
}
