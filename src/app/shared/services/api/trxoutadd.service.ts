import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trxoutadd, ResultWithRanking } from '../../models';
import { END_POINTS } from './globals/global-config';

const EtaAPI_URL = END_POINTS.trxouradd;
@Injectable({
  providedIn: 'root'
})
export class TrxoutaddService {

  constructor(private http: HttpClient) { }


  create(model: Trxoutadd): Observable<Trxoutadd> {
    return this.http.post<Trxoutadd>(EtaAPI_URL, model);
  }
  update(model: Trxoutadd): Observable<ResultWithRanking<Trxoutadd>> {
    return this.http.put<ResultWithRanking<Trxoutadd>>(EtaAPI_URL , model);
  }
  delete(id): Observable<Trxoutadd>{
    return this.http.delete<Trxoutadd>(EtaAPI_URL + `/${id}`);
  }
}
