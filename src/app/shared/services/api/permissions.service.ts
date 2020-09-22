import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { FilterParams, ResultWithPagination, Permission } from '../../models';
import { Observable } from 'rxjs';
import { PermissionMenu } from '../../models/permissionMenu.model';

interface IGroupPermission{
	PerGroupID:string;
  MenuID:string;
}
interface IUserPermission{
	UserID:string;
  MenuID:string;
  IsGrant: '1' | '0';
}

const API_URL = END_POINTS.Permissions;

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  GetUserPermissions(id : string ,filterParams?: FilterParams):Observable<ResultWithPagination<Permission[]>> {
    const action = 'GetUserPermissions'
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<Permission[]>>(API_URL+`/${action}`, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "MenuID",
        sortDirection: filterParams.sortDirection,
        UserId: id
      }
    });
  }
  postUserPermission(model :IUserPermission):Observable<IUserPermission>{
    const action = '/InsertUserPermission';
   return this.http.post<IUserPermission>(API_URL + action ,model)
  }
  editUserPermission(model :IUserPermission):Observable<IUserPermission>{
    const action = '/EditUserPermission';
   return this.http.post<IUserPermission>(API_URL + action ,model)
  }
  deleteUserPermission(UserID :string , menuId : number): Observable<any> {
    const action = 'DeleteUserPermission'
    return this.http.delete<any>(API_URL+`/${action}/${UserID}/${menuId}`);
  }



//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


  GetGroupPermissions(id : string , filterParams?: FilterParams):Observable<ResultWithPagination<Permission[]>> {
    const action = 'GetGroupPermissions'
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<Permission[]>>(API_URL+`/${action}`, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),  
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "PerGroupID",
        sortDirection: filterParams.sortDirection,
        PerGroupId: id
      }
    });
  }
  postGroupPermission(model :IGroupPermission):Observable<IGroupPermission>{
    const action = '/InsertGroupPermission';
    return this.http.post<IGroupPermission>(API_URL + action ,model)
  }
  deleteGroupPermission( groupId :string, menuId : number ): Observable<any> {
    const action = 'DeleteUserPermission'
    return this.http.delete<any>(API_URL+`/${action}/${groupId}/${menuId}`);
  }

 //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  getMenuList() : Observable<PermissionMenu[]>{
    const action = 'getMenus';
    return this.http.get<PermissionMenu[]>(API_URL + `/${action}`);
  }

}
