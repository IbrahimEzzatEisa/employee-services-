import { Injectable } from '@angular/core';
import { EtaAPI_URL, END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DropdownList , Attendance, FilterParams, ResultWithPagination } from '../../models';

const API_URL = END_POINTS.attendance;

interface ISarchAttendance {
  UserID: string | number;
  DateFrom: string | number;
  DateTo: string;
  DepartmentID: string;
  AttendTypeID: string | number
}
export interface IResultSum {
  InDays: number;
  InLeftHours: number;
  InLeftMintues: number;
  OutDays: number;
  OutLeftHours: number;
  OutLeftMintues: number;
  Absence: number;
}
export interface IAttendance {
  Date: string;
  DateH: string;
  DateH1: string;
  EmpName: string;
  EmpID: number;
  User_Id: number;
  InTime: string;
  OutTime: string;
  AttendTypeName: string;
  AttendTypeID: 7;
  PermissionTypeName: string;
  PermissionReason: string;
}
export interface IAttendanceResult{
  attendance:IAttendance[],
  resultSum:IResultSum
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getAttendanceTypes(): Observable<DropdownList[]> {
    const action = '/GetAttendanceTypes';
    return this.http.get<DropdownList[]>(API_URL + action);
  }
  sarchAttendance(attendance: ISarchAttendance, filterParams?: FilterParams): Observable<ResultWithPagination<IAttendanceResult>> {

    Object.keys(attendance).map(key => {
      if (attendance[key] === null) {
        attendance[key] = 'null'
      }
    })
    const action = '/SearchAttendance';
    return this.http.post<ResultWithPagination<IAttendanceResult>>(API_URL + action, attendance, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || 'User_Id',
        sortDirection: filterParams.sortDirection
      }
    });
  }

}
