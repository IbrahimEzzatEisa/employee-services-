import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserName, PayrollSetting, EtaSetting, Employee, Menu, User } from '../../models';
import { END_POINTS } from './globals/global-config';
import { AuthenticationService } from '../Auth';

const API_URL = END_POINTS.login;
interface LoginResponse {
  tokenString: string;
  Menu: Menu[];
  User: User;
  PayrollSettings: PayrollSetting;
  EtaSettings: EtaSetting;
  Employee: Employee;
}



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  login(user: {}) {
    return this.http.post(API_URL, user).pipe(
      tap(
        (res: LoginResponse) => {
          localStorage.setItem('token', res.tokenString);
          this.authenticationService.setLocalstorgProperty(res)

        }
      )
    );
  }
  // getName(id: string): Observable<UserName> {
  //   return this.http.get<UserName>(API_URL + `/${id}`);
  // }
  // createPassword( userId: string,  password: string ): Observable<void> {
  //   const action = "/CreatePassword";
  //   return this.http.post<void>(API_URL + action + `/${userId}/${password}`, {})
  // }
  // ChangePassword( model : any ): Observable<void> {
  //   const action = "/CreatePassword";
  //   return this.http.post<void>(API_URL + action , model)
  // }

}
