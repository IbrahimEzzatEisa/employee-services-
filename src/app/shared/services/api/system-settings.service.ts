import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultWithPagination, FilterParams, ResultWithRanking, SystemSettings, SettingDirectUser, OutsideDDl, Department, DepartmentManagersUsers, DropdownList } from '../../models';
import { END_POINTS } from './globals/global-config';

const EtaAPI_URL = END_POINTS.systemSettings;
const API_URL = END_POINTS.getTrxInSettings;
const API = END_POINTS.settingsDirectUsersDdl;
const API_OutsideDDl = END_POINTS.outsideddl;
const API_Department = END_POINTS.department;
const API_GetDepartmentManagersUsers= END_POINTS.departmentManagersUsers;
const setting = END_POINTS.setting;







@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<SystemSettings>(setting);
  }
  getSettingDirectUser(): Observable<SettingDirectUser[]> {
    return this.http.get<SettingDirectUser[]>(API );
  }

  getOutsideDDl(): Observable<DropdownList[]> {
    return this.http.get<DropdownList[]>(API_OutsideDDl );
  }
 
  getDepartment():Observable<Department[]> {
    return this.http.get<Department[]>(API_Department );
  }
  getDepartmentManagersUsers():Observable<DepartmentManagersUsers[]> {
    return this.http.get<DepartmentManagersUsers[]>(API_GetDepartmentManagersUsers);
  }

  



  GetParents(): Observable<SystemSettings[]> {
  
    const action = '';
    return this.http.get<SystemSettings[]>(API_URL + action)
  }

}