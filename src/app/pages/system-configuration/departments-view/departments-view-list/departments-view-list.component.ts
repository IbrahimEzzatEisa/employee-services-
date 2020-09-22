import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Department, FilterParams, Config } from 'src/app/shared/models';
import { departmentsService } from 'src/app/shared/services/api/departments.service';
import { SwalService } from 'src/app/shared/services';
import { NotifierService } from 'angular-notifier';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { __assign } from 'tslib';

@Component({
  selector: 'app-departments-view-list',
  templateUrl: './departments-view-list.component.html',
  styleUrls: ['./departments-view-list.component.scss']
})
export class DepartmentsViewListComponent implements OnInit {


  //main object
  departmentsList: Department[] = [];
  // total number of page pages / items of list table
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  // dropdown filter  -- page permission
  filterParams = new FilterParams();

  //main object
  department: Department;
  //dropdownPerGroup

  //dropdown
  ParentList: Department[] = [];
  ParentItem = new Department();
  busyLoadingParent: boolean = false;

  isAdd: boolean = false;
  isEdit: boolean = false;
  formSubmitted: boolean = false;

  searchTimeout: any;
  queryString: string = '';
  // set loading state
  busyLoading: boolean = false;
  busySaving: boolean = false;
  isFormChanged: boolean = false;
  isActive: boolean = false;


  configs: Config[] = [
    {
      key: 'DepartmentID',
      label: 'المسلسل',
      visible: true
    },
    {
      key: 'DepartmentName',
      label: 'الاسم',
      visible: true
    },
    {
      key: 'ParentName',
      label: 'الإدارة',
      visible: true
    },
    {
      key: 'DeparturePermissionCount',
      label: 'عدد اذن مهمة العمل المسموح بها خلال الشهر',
      visible: true
    },
    {
      key: 'choises',
      label: 'الخيارات',
      visible: true
    }
  ];

  constructor(private route: Router,
    private departmentsService: departmentsService,
    private notifier: NotifierService,
    private swalService: SwalService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute, private route2: Router,
  ) { }

  ngOnInit() {
    this.spinner.show()
    this.filterParams.pageSize = 10;
    this.filterParams.sortField = "DepartmentID";
    this.getAlldepartments();

    this.department = new Department();
    this.getDropDown();

  }

  search(event: any) {
    this.filterParams.pageSize = 10;
    this.filterParams.searchValue = event.target.value
    this.getAlldepartments();
  }
  removeSearch() {
    this.queryString = ''
  }

  fill(prop: Department) {
    this.department = Object.assign({}, prop)
  }

  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    this.getAlldepartments();
  }
  setPageSize(pagesize: number) {
    this.filterParams.pageSize = pagesize;
    this.getAlldepartments();
  }
  // get content all data for notices
  getAlldepartments() {
    this.busyLoading = true;
    this.departmentsService.getAll(this.filterParams).subscribe(
      res => {
        this.departmentsList = res.result;

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

  getDropDown() {

    this.getParent();
  }

  getParent() {
    this.busyLoadingParent = true
    this.departmentsService.GetParents().subscribe(res => {
      this.ParentList = res;
      this.busyLoadingParent = false;
    })
  }
  SelectParent(parent: Department) {
    this.ParentItem = Object.assign({}, parent)
    this.department.ParentID = this.ParentItem.DepartmentID
  }

  delete(id: number, Name: string, index: number) {
    this.swalService.showRemoveConfirmation(Name).then(
      result => {
        if (result.value) {
          this.departmentsService.delete(id).subscribe(
            res => {
              this.departmentsList.splice(index, 1);
              this.swalService.Notifier('تم الحذف بنجاح');
              this.getAlldepartments();
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

  update() {
    this.departmentsService.update(this.department).subscribe(
      res => {
        this.busySaving = false;
        this.notifier.notify('success', ' تم التعديل  بنجاح ');
        this.getAlldepartments();


      },
      err => {
        this.busySaving = false;
        const errorMessage = err.message || 'حدث خطأ اثناء التعديل';
        this.notifier.notify('error', errorMessage);
      }
    )
    this.isActive = false;
    this.modalService.dismissAll();
  }


  create() {

    this.departmentsService.create(this.department).subscribe(
      res => {
        this.busySaving = false;
        this.notifier.notify('success', 'تمت الإضافة بنجاح');
        this.getAlldepartments();

      },
      err => {
        this.busySaving = false;
        let errorMessage = err.message || 'حدث خطأ اثناء الإضافة';
        this.notifier.notify('error', errorMessage);
      }

    )
    this.isActive = false;
    this.modalService.dismissAll();
  }

  getdepartment(id) {
    this.departmentsService.get(id).subscribe(res => {
      this.department = res
      this.department.DepartmentID = id
    })
  }

  //on submit form call update if isEdit = true otherwise call create
  saveadd() {
    this.busySaving = true;
    this.formSubmitted = true;
    this.create()
  }

  //on submit form call update if isEdit = true otherwise call create
  saveedit() {
    this.busySaving = true;
    this.formSubmitted = true;
    this.update()
  }



}
