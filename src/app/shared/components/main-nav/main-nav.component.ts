import { Component, OnInit } from '@angular/core';
import { retryWhen, share } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { User, Menu } from '../../models';
import { AuthenticationService } from '../../services/Auth';
import { UsersService } from '../../services/api/users.service';
import * as $ from 'jquery'
import { SwalService, ChangeThemeService } from '../../services';
import { NotificationService } from '../../services/api';
import { Observable } from 'rxjs';


interface IParentMunu {
  ParentID: Number;
  ParentCaption: string;
}
interface Notifications{
  Message : string;
  Url : string;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  menuParent: IParentMunu[] = [];
  menuChildren: any[] = [];
  user: User = new User();
  image: string = '../../../../assets/images/logo1.png';
  notificationList : Notifications[] = [];

  isVisable : boolean = false;
  

  constructor(private router: Router, private AuthenticationService: AuthenticationService,
    private usersService: UsersService,
    private swal: SwalService,
    private changeThemeService: ChangeThemeService,
    private route: Router,
    private notificationService: NotificationService,
  ) { }

  // haveChildren(menuItem: PagesMenu) {
  //   let children = menuItem.data.children;
  //   if (children) {
  //     for (let i = 0; i < children.length; i++) {
  //       if (children[i].data.children) {
  //         return this.haveChildren(children[i])
  //       }
  //     }
  //   }
  //   return false;
  // }

  ngOnInit() {
    this.Notifications();
    this.getMenuParents();
    const { UserID } = JSON.parse(localStorage.getItem('User'))
    if (UserID) {
      this.usersService.get(UserID).subscribe(res => {
        this.user = res[0]
        if (res[0].UserImageURL) {

          this.image = res[0].UserImageURL
        }
      })

    }
    // this.user= this.AuthenticationService.getUser();

  }
  Notifications(){
    this.notificationService.get().subscribe(res=>{
      this.notificationList = res;
      console.log(res);
    })
  }

  showHideNotiefication(){
    this.isVisable = !this.isVisable
  }
  theame(){
    this.changeThemeService.changeColor();
  }
  changeColor(theme: string) {
    switch (theme) {
      case 'dragon':
        localStorage.removeItem('Theme');
        // this.changeThemeService.changeColor();
        location.reload();
        break;
      case 'wolf':
        localStorage.setItem('Theme', 'wolf');
        this.changeThemeService.changeColor();
        break;
      case 'panther':
        localStorage.setItem('Theme', 'panther');
        this.changeThemeService.changeColor();
        break;
      case 'pigeon':
        localStorage.setItem('Theme', 'pigeon');
        this.changeThemeService.changeColor();
        break;
      case 'eagle':
        localStorage.setItem('Theme', 'eagle');
        this.changeThemeService.changeColor();
        break;
      default:
        break;
    }
  }

  getMenuParents() {
    const menu = JSON.parse(localStorage.getItem('Menu')) as any[];
    const parentId = [...new Set(menu.map(item => item.ParentID))]
    let transportArray = []
    parentId.forEach((element) => {
      return transportArray.push(menu.find(({ ParentID }) => ParentID == element))
    })
    let MeduleName;
    this.menuParent = transportArray.map(el => {
      MeduleName = ''
      switch (el.ParentID) {
        case 600:
          MeduleName = 'system-configuration'
          break;
        case 200:
          MeduleName = 'Transactions'
          break;
        case 400:
          MeduleName = 'reports-follow-up'
          break;
        case 36:
          MeduleName = 'follow-up-box'
          break;
        case 500:
          MeduleName = 'archives'
          break;
        case 300:
          MeduleName = 'Employee-services'
          break;
        case 48:
          MeduleName = 'computer-maintenance'
          break;

        default:
          break;
      }
      return { ParentID: el.ParentID, ParentCaption: el.ParentCaption, MeduleName: MeduleName }
    })
    this.getMenuChildren(menu, parentId)

  }


  getMenuChildren(menu: any[], parentId: number[]) {
    let transportArray = []
    parentId.forEach(el => {
      transportArray = []
      menu.map(item => {
        if (item.ParentID == el) {
          transportArray.push({ Caption: item.Caption, URL: item.URL, Icon: item.Icon })
        }
      })
      this.menuChildren.push(transportArray)
    })
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('Menu');
    localStorage.removeItem('User');
    localStorage.removeItem('EtaSettings');
    localStorage.removeItem('PayrollSettings');
    localStorage.removeItem('Employee');
    this.router.navigate(['/login']);
  }
  

  navigateToProfile() {
    let users = JSON.parse(localStorage.getItem('User'));
    this.user.UserID = users.UserID;
    this.route.navigate([`./pages/system-configuration/UsersView/edit/${this.user.UserID}`], { queryParams: { isAdd: false } })
  }

}