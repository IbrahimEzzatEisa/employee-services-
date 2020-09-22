import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { Observable } from 'rxjs';
import { Voting } from '../../models/Voting.model';
import { HttpClient } from '@angular/common/http';
import { ResultWithRanking, FilterParams, ResultWithPagination, Votings } from '../../models';


const API_URL = END_POINTS.Voting;

// finish Voting
const API = END_POINTS.VotingFinsih;




@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private http: HttpClient) { }

  GetForUser():Observable<Voting>{
    const action = 'GetForUser'
    return this.http.get<Voting>(API_URL + `/${action}`);
  }
  Vote(vote : any):Observable<any>{
    const action = 'Vote';
    return this.http.post<any>(API_URL + `/${action}`, vote)
  }
  getvotingAnswer(id: number): Observable<Voting> {
    return this.http.get<Voting>(API_URL+`/${id}`);
  }
  create(model: Votings): Observable<Votings> {
    return this.http.post<Votings>(API_URL, model);
  }
  update(id, model: Votings): Observable<ResultWithRanking<Votings>> {
    return this.http.put<ResultWithRanking<Votings>>(API_URL + `/${id}`, model);
  }
  Finish(id, model: Votings): Observable<Votings> {
    return this.http.post<Votings>(API + `/${id}`, model);
  }
  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<Voting[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<Voting[]>>(API_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "VotingID",
        sortDirection: filterParams.sortDirection
      }
    });
  }
 

  }
  

