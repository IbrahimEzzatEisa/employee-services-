import { Injectable } from '@angular/core';
import { AuthenticationService } from './Auth';
import { Menu } from '../models';

declare var require;
var jwtDecode = require("jwt-decode");

@Injectable({
  providedIn: 'root'
})
export class PermissionsAppInitService {
menu : Menu[] =[];

  constructor(private authenticationService :AuthenticationService
) {}

public getStoredUserId() {
    if(!localStorage.getItem('token'))
        return null;
    try {
        let token = localStorage.getItem('token');
        let decodedToken = jwtDecode(token);
        return decodedToken.UserId;
    } catch (err) {
        return null;
    }
}

initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
        let userId = this.getStoredUserId();
        if(!userId && userId != 0) {
            localStorage.removeItem('token');
            return resolve();
        }
      this.menu = this.authenticationService.getMenu();
      if(this.menu){
        return resolve()
      }else{
        resolve();
        console.log('App initialize err')
      }
      
        // this.UserPermissionsService.getUserPermissions(userId).toPromise().then(
        //     permissions => {
        //         this.permissionsService.setPermissions(permissions);
        //         return resolve();
        //     }
        // ).catch(
        //     err => {
        //         resolve();
        //         console.log("App initialize err", err);
        //     }
        // );
    })
}
}
