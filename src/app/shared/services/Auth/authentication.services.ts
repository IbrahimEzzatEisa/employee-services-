import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Menu, PayrollSetting, EtaSetting, Employee, User } from '../../models';


declare var require;
var jwtDecode = require("jwt-decode");

interface LoginResponse {
    tokenString: string;
    Menu: Menu[];
    User: User
    PayrollSettings: PayrollSetting;
    EtaSettings: EtaSetting;
    Employee: Employee;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private loggedIn;
    private expirationTimeout;
    private AllowMenu: Menu[];

    constructor(
        private router: Router, private route: ActivatedRoute
    ) {
        this.refreshLoginStatus();
    }

    private setSessionExpirationNotification(remainingTimeMs) {
        if (this.expirationTimeout) {
            clearTimeout(this.expirationTimeout);
        }
        this.expirationTimeout = setTimeout(() => {
            this.redirectToLogin(this.route.snapshot['_routerState'].url, 'انتهت صلاحية الجلسة قم بتسجيل الدخول للمتابعة');
        }, remainingTimeMs);
    }

    public getLoginStatus() {
        if (!localStorage.getItem('token'))
            return false;
        try {
            let token = localStorage.getItem('token');
            let decodedToken = jwtDecode(token);
            let expDate = Number.parseInt(decodedToken.exp) * 1000;
            let today = new Date().valueOf();
            if (expDate > today) {
                this.setSessionExpirationNotification(expDate - today);
                return true;
            }
        } catch (err) {
            return false;
        }
        return false;
    }

    getPermmisson(pageName: string): boolean {
        this.AllowMenu = this.getMenu();
        const found = this.AllowMenu.find(page => page.MenuNameEn == pageName);
        if (found) {
            return true;
        } else {
            return false
        }

    }

    public refreshLoginStatus() {
        if (!this.loggedIn) {
            this.loggedIn = new BehaviorSubject(this.getLoginStatus());
        } else {
            this.loggedIn.next(this.getLoginStatus());
        }
    }

    public isLoggedIn() {
        this.refreshLoginStatus();
        return this.loggedIn.asObservable();
    }

    public getStoredUserId() {
        if (!localStorage.getItem('token'))
            return null;
        try {
            let token = localStorage.getItem('token');
            let decodedToken = jwtDecode(token);
            return decodedToken.UserId;
        } catch (err) {
            return null;
        }
    }
    getToken() {
        let token = localStorage.getItem('token');
        return token
    }

    public getLoggedUserName() {
        if (!localStorage.getItem('token'))
            return null;
        try {
            let token = localStorage.getItem('token');
            let decodedToken = jwtDecode(token);
            return decodedToken.UserName;
        } catch (err) {
            return null;
        }
    }

    public getLoggedUserId() {
        if (!localStorage.getItem('token'))
            return null;
        try {
            let token = localStorage.getItem('token');
            let decodedToken = jwtDecode(token);
            return decodedToken.UserId;
        } catch (err) {
            return null;
        }
    }

    logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('Menu');
        localStorage.removeItem('User');
        localStorage.removeItem('EtaSettings');
        localStorage.removeItem('PayrollSettings');
        localStorage.removeItem('Employee');
        // localStorage.clear();
        this.router.navigate(['/login']);
    }

    public redirectToLogin(path, msg) {
        this.router.navigate(['/login'], {
            queryParams: {
                redirect: path,
                redirectMessage: msg
            }
        })
    }
    getMenu() {
        if (!localStorage.getItem('Menu'))
            return null;
        try {
            let Menu = JSON.parse(localStorage.getItem('Menu'))
            return Menu
        } catch (err) {
            return null;
            
        }
    }
    getUser():User{
        if (!localStorage.getItem('User'))
            return null;
        try {
            let Menu = JSON.parse(localStorage.getItem('User'))
            return Menu
        } catch (err) {
            return null;
        }
    }
    geEmployees() {
        if (!localStorage.getItem('Employee'))
            return null;
        try {
            let Menu = JSON.parse(localStorage.getItem('Employee'))
            return Menu
        } catch (err) {
            return null;
        }
    }
    getEtaSettings() {
        if (!localStorage.getItem('EtaSettings'))
            return null;
        try {
            let Menu = JSON.parse(localStorage.getItem('EtaSettings'))
            return Menu
        } catch (err) {
            return null;
        }
    }
    getPayrollSettings() {
        if (!localStorage.getItem('PayrollSettings'))
            return null;
        try {
            let Menu = JSON.parse(localStorage.getItem('PayrollSettings'))
            return Menu
        } catch (err) {
            return null;
        }
    }
    setLocalstorgProperty(res: LoginResponse) {
        if (res.Menu) {
            localStorage.setItem('Menu', JSON.stringify(res.Menu))
        }
        if (res.Employee) {
            localStorage.setItem('Employee', JSON.stringify(res.Employee))
        }
        if (res.EtaSettings) {
            localStorage.setItem('EtaSettings', JSON.stringify(res.EtaSettings))
        }
        if (res.PayrollSettings) {
            localStorage.setItem('PayrollSettings', JSON.stringify(res.PayrollSettings))
        }
        if (res.User) {
            localStorage.setItem('User', JSON.stringify(res.User))
        }
        if (res.Menu) {
            localStorage.setItem('Menu', JSON.stringify(res.Menu))
        }

    }
}