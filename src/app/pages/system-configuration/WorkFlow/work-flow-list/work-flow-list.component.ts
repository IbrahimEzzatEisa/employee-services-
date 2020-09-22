import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterParams, WorkFlow, WorkFlowDepartment, WorkFlowTypes, WorkFlows, DepartmentByUser } from 'src/app/shared/models';
import { NotifierService } from 'angular-notifier';
import { SwalService } from 'src/app/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkFlowService, TrainingEmpService, WorkFlowDepartmentService, WorkFlowTypesService, DepartmentByUserService } from 'src/app/shared/services/api';

@Component({
  selector: 'app-work-flow-list',
  templateUrl: './work-flow-list.component.html',
  styleUrls: ['./work-flow-list.component.scss']
})
export class WorkFlowListComponent implements OnInit {

  pageURL: string = './pages/system-configuration/WorkFlow';
  // total number of page pages / items of list table
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  // dropdown filter  -- page permission
  filterParams = new FilterParams();

  searchTimeout: any;
  queryString: string = '';
  // set loading state
  busyLoading: boolean = false;

  routeParamsKeys = ['ID'];

  workFlowlist: WorkFlow[] = [];
  workFlow = new WorkFlow();
  workFlowItem = new WorkFlow();



  // dropdown
  department: WorkFlowDepartment[] = [];
  departmentItem = new WorkFlowDepartment();


  // dropdown 
  workFlowTypes: WorkFlowTypes[] = [];
  WorkFlowTypesItem = new WorkFlowTypes();

  //main object -- backup
  WorkFlows: WorkFlows;
  WorkFlowsBackup: WorkFlows;

  userByDepartment: DepartmentByUser[] = [];
  userByDepartmentItem = new DepartmentByUser();


  busySaving: boolean = true;
  formSubmitted: boolean = true;

  configs: Config[] = [
    {
      key: 'ID',
      label: 'المسلسل',
      visible: true
    },
    {
      key: 'TypeName',
      label: 'نوع التسلسل',
      visible: true
    },
    {
      key: 'DepartmentName',
      label: 'الإدارة/القسم',
      visible: true
    },
    {
      key: 'UserFullName',
      label: 'الموظف المسئول',
      visible: true
    },

    {
      key: 'choises',
      label: 'الخيارات',
      visible: true
    }
  ];


  constructor(private route: Router,
    private notifier: NotifierService,
    private swalService: SwalService,
    private spinner: NgxSpinnerService,
    private workFlowService: WorkFlowService,
    private WorkFlowDepartmentServices: WorkFlowDepartmentService,
    private WorkFlowTypesServices: WorkFlowTypesService,
    private WorkFlowServices: WorkFlowService,
    private userbyDepartmentServices: DepartmentByUserService

  ) { }

  ngOnInit() {
    this.workFlow = new WorkFlow();
    this.WorkFlows = new WorkFlows();


    this.getAllFlowWork();
    // this.getTrainingEmp();
    this.getAllDepartment();
    this.getAllWorkFlowTypes();



  }

  search(event: any) {
    this.filterParams.pageSize = 10;
    this.filterParams.searchValue = event.target.value
    this.getAllFlowWork();


  }
  removeSearch() {
    this.queryString = ''
  }

  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    this.getAllFlowWork();
  }
  setPageSize(pagesize: number) {
    this.filterParams.pageSize = pagesize;
    this.getAllFlowWork();
  }


  getAllFlowWork() {
    this.busyLoading = true;
    this.spinner.show()
    this.workFlowService.getAll().subscribe(
      res => {
        this.workFlowlist = res;
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

  getAllDepartment() {
    this.WorkFlowDepartmentServices.getWorkFlowDepartment().subscribe(
      res => {
        this.department = res;
      }
    )
  }
  getAllWorkFlowTypes() {
    this.WorkFlowTypesServices.getWorkFlowTypes().subscribe(
      res => {
        this.workFlowTypes = res;
      }
    )
  }


  SelectWorkFlowTypes(workFlowTypes: WorkFlowTypes) {
    this.WorkFlowTypesItem = Object.assign({}, workFlowTypes)
    this.WorkFlows.TypeID = this.WorkFlowTypesItem.TypeID
  }

  SelectWorkFlowDepartment(department: WorkFlowDepartment) {
    this.departmentItem = Object.assign({}, department)
    this.WorkFlows.DepartmentID = this.departmentItem.DepartmentID;
    this.userbyDepartmentServices.get(this.departmentItem.DepartmentID).subscribe(
      res => {
        this.userByDepartment = res;

      }
    )
  }
  fill(prop: WorkFlow) {
    this.WorkFlows = Object.assign({}, prop)
  }

  SelectWorkFlowUser(userByDepartment: DepartmentByUser) {
    this.userByDepartmentItem = Object.assign({}, userByDepartment)
    this.WorkFlows.UserID = this.userByDepartmentItem.ID;

  }

  delete(id: number, Name: string, index: number) {
    this.swalService.showRemoveConfirmation(Name).then(
      result => {
        if (result.value) {
          this.workFlowService.delete(id).subscribe(
            res => {
              this.workFlowlist.splice(index, 1);
              this.swalService.Notifier('تم الحذف بنجاح');
              this.getAllFlowWork();

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


  // paginateData(workFlow: any[]) {
  //   let arr = [];
  //   if (workFlow.length > 0) {
  //     workFlow.forEach((item, index) => {
  //       arr.push(
  //         workFlow.slice(+index, 3 + index)
  //       )
  //     })
  //   }
  // }

  //on submit form call update if isEdit = true otherwise call create
  saveadd() {
    this.create()
  }

  //on submit form call update if isEdit = true otherwise call create
  saveedit() {
    this.update()
  }


  create() {
    this.WorkFlowServices.create(this.WorkFlows).subscribe(
      res => {
        this.notifier.notify('success', 'تمت الإضافة بنجاح');
        this.WorkFlows.DepartmentID = null;
        this.WorkFlows.TypeID = null;
        this.WorkFlows.UserID = null;
        this.WorkFlows.Order = null;
        this.getAllFlowWork();
      },
      err => {
        this.notifier.notify('error', err.message || 'حدث خطأ اثناء الإضافة');

      }
    )

  }
  update() {
    this.WorkFlowServices.update(this.WorkFlows.TypeID, this.WorkFlows).subscribe(
      res => {
        this.busySaving = false;
        this.formSubmitted = false;
        this.notifier.notify('success', 'تم التعديل  بنجاح');
        this.WorkFlows.DepartmentID = null;
        this.WorkFlows.TypeID = null;
        this.WorkFlows.UserID = null;
        this.WorkFlows.Order = null;

        this.getAllFlowWork();
      },
      err => {
        this.busySaving = false;
        this.formSubmitted = false;
        const errorMessage = err.message || 'حدث خطأ اثناء التعديل';
        this.notifier.notify('error', errorMessage);
      }
    )
  }
}
