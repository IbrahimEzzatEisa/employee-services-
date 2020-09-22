import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemSettings, SettingDirectUser, OutsideDDl, Department, DepartmentManagersUsers, DropdownList } from 'src/app/shared/models';
import { NotifierService } from 'angular-notifier';
import { SwalService, ChangeThemeService } from 'src/app/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemSettingsService, departmentsService, SettingsService } from 'src/app/shared/services/api';
import { UsersService } from 'src/app/shared/services/api/users.service';
import { DropdownListComponent } from 'src/app/shared/components';
class DepartmentDropdown {
  DepartmentID: number;
  DepartmentName: String;
}
@Component({
  selector: 'app-system-settings-view',
  templateUrl: './system-settings-view.component.html',
  styleUrls: ['./system-settings-view.component.scss']
})
export class SystemSettingsViewComponent implements OnInit {
  //main object -- backup
  @ViewChild('VacationSearchUser', { static: false }) VacationSearchUser: DropdownListComponent;
  @ViewChild('SMSDirect', { static: false }) SMSDirect: DropdownListComponent;
  // Main Object
  systemSetting: SystemSettings;
  title = '';
  page = 1;
  //dropdown
  //department
  DepartmentList: Department[] = [];
  departmentBusyLoading: boolean = false
  //GetDepartmentManagersUsers dropdown
  departmentManagersUserList: DepartmentManagersUsers[] = [];
  DepartmentManagersUsersBusyLoading: boolean = false;
  //departmentName
  departmentDropdownList: DepartmentDropdown[] = []
  departmentNameBusyLoading: boolean = false;

  VacationSearchUserList: DropdownList[] = [];
  VacationSearchUserListBusyLoading: boolean = false;

  VacationSearchUserListChoosen: DropdownList[] = [];
  //Manager dropDown
  ManagerList: DropdownList[] = [];
  ManagerBusyLoading: boolean = false;
  //UserByDepartmentId dropdown 
  userListByDepartmentId: DropdownList[] = [];
  UserByDepartmentIdBusyLoading: boolean = false;
  //SMSDirect dropDown
  outsideDDl: DropdownList[] = [];
  SMSDirectbusyLoading: boolean = false;
  outSideList: DropdownList[] = [];

  constructor(
    private systemSettingsService: SystemSettingsService,
    private swalService: SwalService,
    private DepartmentsService: departmentsService,
    private userServices: UsersService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    // inializate main object
    this.systemSetting = new SystemSettings();

    this.getSystemSetting();
    this.getDropdown();
  }

  getDropdown() {
    this.outSideList = [];
    this.VacationSearchUserListChoosen = [];
    this.getAllOutsideDDl();
    this.getManagerList();
    this.getDepartment();
    this.getDepartmentManagersUsers();
    this.getDeptIDForVacationFinishList();
    this.getVacationSearchUser();
  }
  //get main object property
  getSystemSetting() {
    this.settingsService.get().subscribe(res => {
      this.systemSetting = res

      console.table(this.systemSetting)
      this.getUserListByDepartmentId();
    }, err => {
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }

  getAllOutsideDDl() {
    this.SMSDirectbusyLoading = true;
    this.systemSettingsService.getOutsideDDl().subscribe(
      res => {
        this.SMSDirectbusyLoading = false;
        this.outsideDDl = res;
        if (this.systemSetting.SMSDirect.length > 0) {
          let arr = this.systemSetting.SMSDirect.split(',').map(item => Number(item));
          arr.forEach(element => {
            this.outSideList
              .push(this.outsideDDl[this.outsideDDl
                .findIndex(item => item.ID == element)]);
            this.outsideDDl
              .splice(this.outsideDDl
                .findIndex(item => item.ID == element), 1);
          });
        }
      }, err => {
        this.SMSDirectbusyLoading = false;
        let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      }
    )
  }
  deleteoutsideDDlItem(index: number) {
    this.outsideDDl.push(this.outSideList[index])
    this.outSideList.splice(index, 1);
    this.SMSDirect.list = this.outsideDDl;
  }
  SelectSMSDirect(outsideDDl: OutsideDDl) {
    this.systemSetting.SMSDirect = outsideDDl.ID.toString();

    this.outSideList.push(outsideDDl);
    let index = this.outsideDDl.findIndex(item => item.ID === outsideDDl.ID);
    this.outsideDDl.splice(index, 1);
    this.SMSDirect.list = this.outsideDDl;
  }

  //UserByDepartmentId dropdown 
  getUserListByDepartmentId() {
    this.UserByDepartmentIdBusyLoading = true
    if (!this.systemSetting.MSDefaultDeptID) return;
    this.userServices.getUserByDepartmentId(this.systemSetting.MSDefaultDeptID).subscribe(res => {
      this.UserByDepartmentIdBusyLoading = false;
      this.userListByDepartmentId = res;
    }, err => {
      this.UserByDepartmentIdBusyLoading = false
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }
  SelectMSDefaultUserDirectiveId(user: DropdownList) {
    this.systemSetting.MSDefaultUserDirectiveId = user.ID;
  }

  //departmentName
  getDeptIDForVacationFinishList() {
    this.departmentNameBusyLoading = true;
    this.DepartmentsService.GetIdNameList().subscribe(res => {
      this.departmentNameBusyLoading = false;
      this.departmentDropdownList = res;
    }, err => {
      this.departmentNameBusyLoading = false;
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }
  SelectDeptIDForVacationFinish(department: DepartmentDropdown) {
    this.systemSetting.DeptIDForVacationFinish = department.DepartmentID;
  }
  SelectMSDefaultDeptID(department: DepartmentDropdown) {
    this.systemSetting.MSDefaultDeptID = department.DepartmentID;
    this.getUserListByDepartmentId();
  }
  //GetDepartmentManagersUsers dropdown
  getDepartmentManagersUsers() {
    this.DepartmentManagersUsersBusyLoading = true;
    this.DepartmentsService.GetDepartmentManagersUsers().subscribe(res => {
      this.DepartmentManagersUsersBusyLoading = false;
      this.departmentManagersUserList = res;
    }, err => {
      this.DepartmentManagersUsersBusyLoading = false;
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    });
  }
  selectdepartmentManagersUser(departmentManagersUsers: DepartmentManagersUsers) {
    this.systemSetting.VacationToUserID = departmentManagersUsers.UserID;
  }
  //department
  getDepartment() {
    this.departmentBusyLoading = true;
    this.userServices.GetDepartments().subscribe(res => {
      this.departmentBusyLoading = false;
      this.DepartmentList = res;
    }, err => {
      this.departmentBusyLoading = false;
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }
  SelectDepartment(department: Department) {
    this.systemSetting.DepartmentID = department.DepartmentID;
  }
  SelectDeptIDForDepartureFinish(department: Department) {
    this.systemSetting.DeptIDForDepartureFinish = department.DepartmentID;
  }
  SelectDeptIDForLegationFinish(department: Department) {
    this.systemSetting.DeptIDForDepartureFinish = department.DepartmentID;
  }

  //Managers dropdown
  getManagerList() {
    this.ManagerBusyLoading = true;
    this.settingsService.getManagers().subscribe(res => {
      this.ManagerBusyLoading = false;
      this.ManagerList = res;
    }, err => {
      this.ManagerBusyLoading = false;
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }
  SelectTrxCopyToDirectUser(manager: DropdownList) {
    this.systemSetting.TrxCopyToDirectUser = manager.ID
  }
  SelectTrxToDirectUser(manager: DropdownList) {
    this.systemSetting.TrxToDirectUser = manager.ID
  }
  SelectStatementsEmpID(manager: DropdownList) {
    this.systemSetting.StatementsEmpID = manager.ID
  }
  SelectAgentUser(manager: DropdownList) {
    this.systemSetting.AgentUser = manager.ID
  }
  SelectUserForAddDepartures(manager: DropdownList) {
    this.systemSetting.UserForAddDepartures = manager.ID
  }
  SelectUserForAddOutOfDuty(manager: DropdownList) {
    this.systemSetting.UserForAddOutOfDuty = manager.ID
  }
  SelectUserSMS(manager: DropdownList) {
    this.systemSetting.UserSMS = manager.ID
  }


  getVacationSearchUser() {
    this.VacationSearchUserListBusyLoading = true;
    this.settingsService.getManagers().subscribe(res => {
      this.VacationSearchUserListBusyLoading = false;
      this.VacationSearchUserList = res;
      if (this.systemSetting.VacationSearchUser.length > 0) {
        let arr = this.systemSetting.VacationSearchUser.split(',').map(item => Number(item));
        arr.forEach(element => {
          this.VacationSearchUserListChoosen
            .push(this.VacationSearchUserList[this.VacationSearchUserList
              .findIndex(item => item.ID == element)]);
          this.VacationSearchUserList
            .splice(this.VacationSearchUserList
              .findIndex(item => item.ID == element), 1);
        });
      }
    }, err => {
      this.VacationSearchUserListBusyLoading = false;
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }
  deleteVacationSearchUserItem(index: number) {
    this.VacationSearchUserList.push(this.VacationSearchUserListChoosen[index])
    this.VacationSearchUserListChoosen.splice(index, 1);
    this.VacationSearchUser.list = this.VacationSearchUserList;
  }
  selectVacationSearchUser(user: DropdownList) {
    this.VacationSearchUserListChoosen.push(user);
    this.VacationSearchUserList.splice(this.VacationSearchUserList.findIndex(item => item.ID === user.ID), 1);
    this.VacationSearchUser.list = this.VacationSearchUserList;
  }
  save() {
    this.systemSetting.SMSDirect = this.outSideList.map(item => item.ID).join(',');
    this.systemSetting.VacationSearchUser = this.VacationSearchUserListChoosen.map(item => item.ID).join(',');
    this.settingsService.update(this.systemSetting).subscribe(res => {
      this.swalService.Notifier('تم الحفظ')
    },err =>{
      let errorMessage = err.error.message || 'حدث خطأ اثناء الحفظ';
      this.swalService.NotifierError(errorMessage)
    })
  }
  cancel() {
    this.getSystemSetting();
    this.getDropdown();
  }
}