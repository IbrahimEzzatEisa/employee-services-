import { Injectable } from '@angular/core';
import { END_POINTS, EtaAPI_URL } from './globals/global-config';
import { FilterParams, ResultWithPagination, RequestBox, Direction } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = END_POINTS.requestsBobx;
const etaBaseURL = EtaAPI_URL;

interface IBoxDetali<T> {
  Details: T;
  DirectiveT: IDirectiveT[]
}
interface IDirectiveT {
  DirectiveDateH: string;
  FromUserName: string;
  ToUserName: string;
  ToDepartmentName: string;
  FromDepartmentName: string;
  TrainingTrxStatusName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestsBoxService {

  constructor(private http: HttpClient) { }

  getAll(type: string, filterParams?: FilterParams): Observable<ResultWithPagination<RequestBox[]>> {
    if (!filterParams) { filterParams = new FilterParams(); }
    return this.http.get<ResultWithPagination<RequestBox[]>>(API_URL + `/${type}`, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "DateFrom",
        sortDirection: filterParams.sortDirection
      }
    });
  }
  get(ID: string, type: string, finishUser: boolean): Observable<any> {
    return this.http.get<any>(API_URL + `/${type}/${ID}`);
    // return this.http.get<IBoxDetali<any>>(API_URL + `/${ID}`, {
    //   params: {
    //     TypeID: type,
    //     FinishUser: String(finishUser)
    //   }
    // });
  }
  ReceiveRequest(obj: { DirectiveID: number, TypeID: number }) {
    const action = '/Receive'
    return this.http.post(API_URL + action, {}, {
      params: {
        TypeID: obj.TypeID.toString(),
        DirectiveID: obj.DirectiveID.toString()
      }
    }
    )
  }
  AcceptRefuseRequest(obj: any) {
    const action = '/AcceptRefuseRequest'
    return this.http.post(API_URL + action, obj)
  }
  delete(obj: { Type: number, Id: number }): Observable<any> {
    const action = '/RequestsBox'
    return this.http.delete(etaBaseURL + action + `/${obj.Type}/${obj.Id}`);
  }

}
