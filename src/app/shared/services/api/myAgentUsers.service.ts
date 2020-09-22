import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { MyAgentUsers } from '../../models/myAgentUserst.model';
const API_URL = END_POINTS.myAgentUsers;

@Injectable({
  providedIn: 'root'
})
export class MyAgentUsersService {

  constructor(private http: HttpClient) { }

  getMyAgentUsers(id: number): Observable<MyAgentUsers[]> {
    return this.http.get<MyAgentUsers[]>(API_URL+`/${id}`);
  }
  

}
