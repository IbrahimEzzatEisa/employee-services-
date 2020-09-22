import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event } from '@angular/router';
import { PermissionsService } from 'src/app/shared/services/api';
import { FilterParams, Config, Permission, PermissionMenu } from 'src/app/shared/models';
import { NotifierService } from 'angular-notifier';
import { SwalService, ChangeThemeService } from 'src/app/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownListComponent } from 'src/app/shared/components';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menu-permissions',
  templateUrl: './menu-permissions.component.html',
  styleUrls: ['./menu-permissions.component.scss']
})
export class MenuPermissionsComponent implements OnInit {

  @ViewChild('menu', { static: false }) menu: DropdownListComponent;



  PermissionMenuList: PermissionMenu[] = [];
  permissionMenuselected: PermissionMenu = new PermissionMenu()
  permissions: Permission[] = []
  pageURL: string = './pages/system-configuration/menu-permissions';

  // total number of page pages / items of list table
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  // dropdown filter  -- page permission
  filterParams = new FilterParams();
  //set loading state for dropdowns
  busyLoadingDropdowns: boolean = false;
  searchTimeout: any;

  // set loading state
  busyLoading: boolean = false;
  activeRow : boolean = false;
  routeParamsKeys = ['WarnYear', 'WarnSerial'];

  configs: Config[] = [
    {
      key: 'MenuID',
      label: 'رقم الشاشة',
      visible: true
    },
    {
      key: 'Caption',
      label: 'اسم الشاشة',
      visible: true
    },
    {
      key: 'IsGrant',
      label: 'مفعل',
      visible: true
    },
    {
      key: 'choises',
      label: 'خيارات',
      visible: true
    }
  ];

  perGroupID: string;
  userID: string;
  isUserId: boolean;
  isActive: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private permissionsService: PermissionsService,
    private notifier: NotifierService,
    private swalService: SwalService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private changeThemeService: ChangeThemeService,
  ) { }

  ngOnInit() {
    this.changeThemeService.changeColor();
    this.spinner.show();
    const params = this.route.snapshot.queryParams;
    if (params.permissionGroup == 'true') {
      this.filterParams.pageSize = 10;
      this.filterParams.sortField = "MenuID";
      this.perGroupID = params.PerGroupID;
      this.GetGroupPermissions(String(this.perGroupID))
      this.isUserId = false
    } else if (params.permissionGroup == 'false') {
      this.filterParams.pageSize = 10;
      this.filterParams.sortField = "MenuID";
      this.userID = params.UserID
      this.GetUserPermissions(String(this.userID))
      this.isUserId = true;
    }
    this.configs[2].visible = this.isUserId
  }
  search(event : any){
    this.filterParams.pageSize = 10;
    this.filterParams.searchValue = event.target.value
    if (this.isUserId) {
      this.GetGroupPermissions(this.userID)
    } else {
      this.GetGroupPermissions(this.perGroupID)
    }
  }
  openVerticallyCentered(content) {
    this.getPermissionMenuList();
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true });

  }
  GetUserPermissions(id: string) {
    this.busyLoading = true;
    this.permissionsService.GetUserPermissions(id, this.filterParams).subscribe(
      res => {
        this.permissions = res.result;
        this.filterParams.pageNumber = res.pagination.currentPage;
        this.filterParams.pageSize = res.pagination.itemsPerPage;
        this.totalNumberOfPages = res.pagination.totalPages;
        this.totalNumberOfItems = res.pagination.totalItems;
        this.busyLoading = false;
        this.spinner.hide();
      },
      err => {
        this.busyLoading = false;
        this.spinner.hide();
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)

      }
      )
    }
    delete(MenuID: number, Caption: string, index: number) {
      this.activeRow = true;
    if (this.userID) {
      this.swalService.showRemoveConfirmation(Caption).then(
        result => {
          if (result.value) {
            this.permissionsService.deleteUserPermission(this.userID, MenuID).subscribe(
              res => {
                this.permissions.splice(index, 1);
                this.swalService.Notifier('تم الحذف بنجاح');
                this.activeRow = false;
              },
              err => {
                let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
               this.swalService.NotifierError( errorMessage);
                this.activeRow = false;
              }
              )
            }
          }
          );
        } else {
          this.swalService.showRemoveConfirmation(Caption).then(
            result => {
              if (result.value) {
                this.permissionsService.deleteGroupPermission(this.perGroupID, MenuID).subscribe(
                  res => {
                    this.permissions.splice(index, 1);
                    this.swalService.Notifier('تم الحذف بنجاح');
                    this.activeRow = false;
                  },
              err => {
                let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
                this.swalService.NotifierError(errorMessage);
                this.activeRow = false;
              }
              )
            }
        }
        );
      }
  }
  
  getPermissionMenuList() {
    this.busyLoadingDropdowns = true
    this.permissionsService.getMenuList().subscribe(res => {
      this.PermissionMenuList = res;
      this.busyLoadingDropdowns = false;
    })
  }
  SelectPermissionMenu(PermissionMenu: PermissionMenu) {
    this.permissionMenuselected = Object.assign({},PermissionMenu)
  }
  
  GetGroupPermissions(id: string) {
    
    this.busyLoading = true;
    this.permissionsService.GetGroupPermissions(id, this.filterParams).subscribe(
      res => {
        this.permissions = res.result;
        this.filterParams.pageNumber = res.pagination.currentPage;
        this.filterParams.pageSize = res.pagination.itemsPerPage;
        this.totalNumberOfPages = res.pagination.totalPages;
        this.totalNumberOfItems = res.pagination.totalItems;
        this.busyLoading = false;
        this.spinner.hide();
      },
      err => {
        this.busyLoading = false;
        this.spinner.hide();
        this.swalService.NotifierError('حدث خطاء في استلام البيانات')
      }
      )
    }
    removeSearch(){
      this.filterParams.searchValue ='';
    }
    setPageSize(pagesize : number){
      this.filterParams.pageSize = pagesize;
      if (this.isUserId) {
        this.GetGroupPermissions(this.userID)
      } else {
        this.GetGroupPermissions(this.perGroupID)
      }
    }
    changeActivation(index: number, MenuID: string) {
      let IsGrant;
      if (this.isUserId) {
        this.permissions[index].IsGrant = !this.permissions[index].IsGrant
        if (this.permissions[index].IsGrant) { IsGrant = '1' } else { IsGrant = '0' }
        this.permissionsService.editUserPermission({
        UserID: String(this.userID),
        MenuID: MenuID,
        IsGrant: IsGrant
      }).subscribe(res => {
        this.swalService.Notifier('تم  التغير بنجاح');
      }, err => {
        this.permissions[index].IsGrant = !this.permissions[index].IsGrant
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })
    } else {
      return;
    }
  }
  
  addWindow() {
    
    let IsGrant;
    if (this.isActive) { IsGrant = '1' } else { IsGrant = '0' }
    if (this.isUserId) {
      this.permissionsService.postUserPermission({
        UserID: this.userID,
        MenuID: this.permissionMenuselected.MenuID.toString(),
        IsGrant: IsGrant
      }).subscribe(res => {
        this.permissions.push({ Id: Number(this.userID),
          MenuID: this.permissionMenuselected.MenuID,
          IsGrant: IsGrant==='1'?true:false ,
          Caption: this.permissionMenuselected.Caption,
        })
        this.swalService.Notifier('تم  التغير بنجاح');
      }, err => {
        this.swalService.NotifierError('حدث خطاء اثناء الحفظ');
      })
    } else {
      this.permissionsService.postGroupPermission({
        PerGroupID: this.perGroupID,
        MenuID: this.permissionMenuselected.MenuID.toString(),
      }).subscribe(res => {
        this.permissions.push(
          { Id: Number(this.perGroupID),
            MenuID: this.permissionMenuselected.MenuID,
            IsGrant:null,
            Caption: this.permissionMenuselected.Caption,
          }
        )
        this.swalService.Notifier('تم  التغير بنجاح');
      }, err => {
        this.swalService.NotifierError('حدث خطاء اثناء الحفظ');
      })
    }
    this.isActive = false;
    this.modalService.dismissAll();
  }
  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    if (this.isUserId) {
      this.GetGroupPermissions(this.userID)
    } else {
      this.GetGroupPermissions(this.perGroupID)
    }
  }


}
