import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FilterParams, ResultWithRanking, VacationsBalance, ResultWithPagination } from 'src/app/shared/models';
import { END_POINTS } from './globals/global-config';
const API_URL = END_POINTS.vacationsBalance;

@Injectable({
  providedIn: 'root'
})
export class VactionsBalanceService {


  constructor(private http: HttpClient) { }

  getVactionsBalance(): Observable<VacationsBalance[]> {
    return this.http.get<VacationsBalance[]>(API_URL);
  }

}
