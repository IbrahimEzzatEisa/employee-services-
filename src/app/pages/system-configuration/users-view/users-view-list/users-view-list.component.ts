import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User, FilterParams, Config } from 'src/app/shared/models';
import { UsersService } from 'src/app/shared/services/api/users.service';
import { SwalService, ChangeThemeService } from 'src/app/shared/services';
import { NotifierService } from 'angular-notifier';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users-view-list',
  templateUrl: './users-view-list.component.html',
  styleUrls: ['./users-view-list.component.scss']
})
export class UsersViewListComponent implements OnInit {

  pageURL: string = './pages/system-configuration/menu-permissions';

  //main object
  usersList: User[] = [];
  // total number of page pages / items of list table
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  // dropdown filter  -- page permission
  filterParams = new FilterParams();

  searchTimeout: any;
  queryString: string = '';
  // set loading state
  busyLoading: boolean = false;

  routeParamsKeys = ['WarnYear', 'WarnSerial'];

  configs: Config[] = [
    {
      key: 'UserID',
      label: 'المسلسل',
      visible: true
    },
    {
      key: 'UserFullName',
      label: 'الاسم',
      visible: true
    },
    {
      key: 'DepartmentName',
      label: 'الإدارة/القسم',
      visible: true
    },
    {
      key: 'PerGroupName',
      label: 'الصلاحية',
      visible: true
    },
    {
      key: 'Username',
      label: 'اسم المستخدم',
      visible: true
    },
    {
      key: 'Mobile',
      label: ' الهاتــف',
      visible: true
    },
    {
      key: 'choises',
      label: 'الخيارات',
      visible: true
    }
  ];

  constructor(private route: Router,
    private usersService: UsersService,
    private notifier: NotifierService,
    private swalService: SwalService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private  changeThemeService: ChangeThemeService,
  ) { }

  ngOnInit() {
    this.changeThemeService.changeColor();
    this.filterParams.pageSize = 10;
    this.filterParams.sortField = "UserID";
    this.getAllUsers();
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true });
  }
  search(event: any) {
    this.filterParams.pageSize = 10;
    this.filterParams.searchValue = event.target.value
    this.getAllUsers();
  }
  removeSearch() {
    this.queryString = ''
  }
  // search(value) {
  //   if(this.searchTimeout) clearTimeout(this.searchTimeout);
  //   this.searchTimeout = setTimeout((()=> {
  //    this.filterParams.searchValue = value ;
  //   }).bind(this), 800)
  //   this.getAllUsers();
  // }

  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    this.getAllUsers();
  }
  setPageSize(pagesize: number) {
    this.filterParams.pageSize = pagesize;
    this.getAllUsers();
  }
  // get content all data for notices
  getAllUsers() {
    this.busyLoading = true;
    this.spinner.show()
    this.usersService.getAll(this.filterParams).subscribe(
      res => {
        this.usersList = res.result;
        this.filterParams.pageNumber = res.pagination.currentPage;
        this.filterParams.pageSize = res.pagination.itemsPerPage;
        this.totalNumberOfPages = res.pagination.totalPages;
        this.totalNumberOfItems = res.pagination.totalItems;
        this.busyLoading = false;
        this.spinner.hide();
      },
      err => {
        this.busyLoading = false;
        this.spinner.hide()
        let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
        this.swalService.NotifierError(errorMessage)
      }
    )
  }

  delete(id: number, Name: string, index: number) {
    this.swalService.showRemoveConfirmation(Name).then(
      result => {
        if (result.value) {
          this.usersService.delete(id).subscribe(
            res => {
              this.usersList.splice(index, 1);
              this.swalService.Notifier('تم الحذف بنجاح');
            },
            err => {
              let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
              this.swalService.NotifierError(errorMessage)
            }
          )
        }
      }
    );
  }
  navigateToPermGroup(perGroupID: number) {
    this.route.navigate([this.pageURL], { queryParams: { permissionGroup: true, PerGroupID: perGroupID } })
  }
  navigateToUserPerm(userID: number) {
    this.route.navigate([this.pageURL], { queryParams: { permissionGroup: false, UserID: userID } })
  }
  navigateToEdit(UserID: number) {
    this.route.navigate([`./pages/system-configuration/UsersView/edit/${UserID}`], { queryParams: { isAdd: false } })
  }
  navigateToAdd() {
    this.route.navigate([`./pages/system-configuration/UsersView/edit/false`], { queryParams: { isAdd: true } })
  }


}
