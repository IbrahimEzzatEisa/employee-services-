import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, FilterParams, ResultWithRanking, ResultWithPagination, Department, Pergroup, DropdownList } from 'src/app/shared/models';
import { END_POINTS } from './globals/global-config';
const API_URL = END_POINTS.user;
@Injectable({
  providedIn: 'root'
})
export class UsersService { // UsersService not userService

  constructor(private http: HttpClient) { }

  get(id: string | number): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/${id}`);
  }
  getUserByDepartmentId(DepartmentId:  number): Observable<DropdownList[]> {
    const action = '/GetUsersByDepartment';
    return this.http.get<DropdownList[]>(API_URL + action +`/${DepartmentId}`);
  }

  getAll(filterParams?: FilterParams): Observable<ResultWithPagination<User[]>> {
    if (!filterParams) filterParams = new FilterParams();
    return this.http.get<ResultWithPagination<User[]>>(API_URL, {
      params: {
        pageNumber: filterParams.pageNumber.toString(),
        pageSize: filterParams.pageSize.toString(),
        searchValue: filterParams.searchValue,
        sortField: filterParams.sortField || "UserId",
        sortDirection: filterParams.sortDirection
      }
    });
  }
  create(model: User): Observable<User[]> {
    return this.http.post<User[]>(API_URL, model);
  }
  update(id, model: User): Observable<ResultWithRanking<User>> {
    return this.http.put<ResultWithRanking<User>>(API_URL + `/${id}`, model);
  }
  delete(id): Observable<User>{
    return this.http.delete<User>(API_URL + `/${id}`);
  }


  put( user: User) {
    let formData = new FormData();
    let arr = []
    arr = [...Object.entries(user)]
    let headers = new HttpHeaders();
    console.table(arr)
    let params = new HttpParams();
    arr.map(item => {
      formData.append(item[0], item[1])
    })
   return this.http.put<User>(API_URL + `/${user.UserID}`, formData, {
      params: params, headers: new HttpHeaders()
        .append('enctype', 'multipart/form-data')
    })
  }
  
  post( user: User) : Observable<User> {
    let formData = new FormData();
    let arr = []
    arr = [...Object.entries(user)]
    let headers = new HttpHeaders();
    console.table(arr)
    let params = new HttpParams();
    arr.map(item => {
      formData.append(item[0], item[1])
    })
    return this.http.post<User>(API_URL , formData, {
      params: params, headers: new HttpHeaders()
        .append('enctype', 'multipart/form-data')
    })
  }




  usersListTitles = ['كود المستخدم', 'اسم المستخدم']
  userrListProps = ['UserId', 'UserName']

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  GetDepartments(): Observable<Department[]> {
    const action = '/GetDepartments';
    return this.http.get<Department[]>(API_URL + action)

  }
  GetPergroups(): Observable<Pergroup[]> {
    const action = '/GetPergroups';
    return this.http.get<Pergroup[]>(API_URL + action)

  }



  


}