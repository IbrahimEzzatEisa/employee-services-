import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/services/api';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../shared/services/Auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userId;
  username;
  userPassword;
  redirectUrl: string;
  redirectMessage:string;
  busyLoggingIn: boolean = false;
  isRememberMeChecked: boolean = false;

  //TODO
  valideUser;
  busy;
  firstRequestDone;
  
  @ViewChild('updatePasswordModal', {static: false}) updatePasswordModal;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) { }

  
  login() {
    this.spinner.show();
    this.busyLoggingIn = true;
    this.loginService.login({
      // BldId:"555",
      username: this.userId,
      password: this.userPassword

    }).subscribe(
      res => {
        if(res.tokenString) {
          if(this.isRememberMeChecked) {
            this.rememberMe();
          } else {
            this.forgetMe();
          }
          if(this.redirectUrl) {
            this.router.navigateByUrl(this.redirectUrl);
          } else {
            this.spinner.hide();
             this.router.navigate(['home']);
         
          }
         
        }
        this.busyLoggingIn = false;
      },
      err => {
        this.spinner.hide();
        this.notifier.notify('error', err.message );
        this.busyLoggingIn = false;
      }
    );
  }
  // getPassword() {
  //   const password = localStorage.getItem(this.userId);
  //   if(password) {
  //     this.userPassword = password;
  //     this.isRememberMeChecked = true;
  //   }
  // }
  rememberMe() {
    localStorage.setItem(this.userId, this.userPassword)
  }
  forgetMe() {
    localStorage.removeItem(this.userId);
  }
  // getUserName() {
  //   if(!this.userId)
  //     return;
  //   this.getPassword();
  //   this.busy = true;
  //   this.loginService.getName(this.userId).subscribe(
  //     res => {
  //       this.userName = res.UserName;
  //       this.valideUser = true;
  //       this.busy = false;
  //       this.firstRequestDone = true;
  //       if(res.NoPassword == 1) {
  //         let passwordInput = document.getElementById('passwordInput');
  //         if(passwordInput) {
  //           passwordInput.blur();
  //         }
  //         this.openChangePasswordModal(this.updatePasswordModal);
  //       }
  //     }, 
  //     err => {
  //       this.userName = err.status === 404 ? 'غير موجود': err.message || 'تعذر الإتصال بالخادم';
  //       this.valideUser = false;
  //       this.busy = false;
  //       this.firstRequestDone = true;
  //     }
  //   );
  // }
  ngOnInit() {
    // if(this.route.snapshot.queryParams) {
    //   this.redirectUrl = this.route.snapshot.queryParams.redirect || '';
    //   this.redirectMessage = this.route.snapshot.queryParams.redirectMessage || '';
    // }
  }

  // openChangePasswordModal(modal) {
  //   this.modalService.open(modal, { centered: true }).result.then((newPassword) => {
  //     this.loginService.createPassword(this.userId, newPassword).subscribe(
  //       res => {
  //         this.notifier.notify('success', 'تم حفظ كلمة المرور بنجاح. قم بتسجيل الدخول');
  //       }, 
  //       err => {
  //         const errMessage = err.message || 'حدث خطأ اثناء تسجيل كلمة المرور!';
  //         this.notifier.notify('error', errMessage);
  //         this.openChangePasswordModal(modal);
  //       }
  //     );
  //   }, (reason) => {
  //     this.userId = null;
  //   });
  // }
 

}
