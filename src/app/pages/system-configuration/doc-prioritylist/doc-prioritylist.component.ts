import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SwalService } from 'src/app/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocPriorityService } from 'src/app/shared/services/api';
import { PermissionMenu, Permission, DocPriority, FilterParams, Config } from 'src/app/shared/models';

@Component({
  selector: 'app-doc-prioritylist',
  templateUrl: './doc-prioritylist.component.html',
  styleUrls: ['./doc-prioritylist.component.scss']
})
export class DocPrioritylistComponent implements OnInit {

  //main object
  docPriority: DocPriority;
  //dropdownPerGroup

  //dropdown
  GetIdNamelist: DocPriority;
  ParentList: DocPriority[] = [];
  ParentItem = new DocPriority();
  busyLoadingParent: boolean = false;

  PermissionMenuList: PermissionMenu[] = [];
  permissionMenuselected: PermissionMenu = new PermissionMenu()
  permissions: Permission[] = []

  isEdit: boolean;
  isAdd: boolean;
  formSubmitted: boolean = false;
  id: any;
  name: any;
  //main object
  docPriorityList: DocPriority[] = [];
  // total number of page pages / items of list table
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  // dropdown filter  -- page permission
  filterParams = new FilterParams();

  searchTimeout: any;
  queryString: string = '';
  // set loading state
  busyLoading: boolean = false;


  isActive: boolean = false;

  configs: Config[] = [
    {
      key: 'ID',
      label: 'المسلسل',
      visible: true
    },
    {
      key: 'Color',
      label: 'اللون',
      visible: true
    },

    {
      key: 'NoDays',
      label: 'الايام',
      visible: true
    },
    {
      key: 'Name',
      label: 'اولوية المعاملة',
      visible: true
    },
    {
      key: 'choises',
      label: 'الخيارات',
      visible: true
    }

  ];
  busySaving: boolean = false;
  isFormChanged: boolean = false;




  constructor(private router: Router,
    private DocPriorityService: DocPriorityService,
    private notifier: NotifierService,
    private swalService: SwalService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.spinner.show()
    this.filterParams.pageSize = 10;
    this.filterParams.sortField = "ID";
    this.getAllDocPriority();


    this.docPriority = new DocPriority();
    this.getDropDown();


  }

  search(event: any) {
    this.filterParams.pageSize = 10;
    this.filterParams.searchValue = event.target.value
    this.getAllDocPriority();
  }
  removeSearch() {
    this.queryString = ''
  }

  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    this.getAllDocPriority();
  }
  setPageSize(pagesize: number) {
    this.filterParams.pageSize = pagesize;
    this.getAllDocPriority();
  }



  getAllDocPriority() {
    this.busyLoading = true;
    this.DocPriorityService.getAll(this.filterParams).subscribe(
      res => {
        this.docPriorityList = res.result;

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
        let errorMessage = err.message || 'حدث خطأ ';
        this.swalService.NotifierError(errorMessage)
      }
    )
  }

  fill(prop: DocPriority) {
    this.docPriority = Object.assign({}, prop)

  }



  delete(id: number, Name: string, index: number) {
    this.swalService.showRemoveConfirmation(Name).then(
      result => {
        if (result.value) {
          this.DocPriorityService.delete(id).subscribe(
            res => {
              this.docPriorityList.splice(index, 1);
              this.swalService.Notifier('تم الحذف بنجاح');
              this.getAllDocPriority();
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

  getDocPriority(id) {
    this.DocPriorityService.getAll(id).subscribe(res => {
      this.docPriority.ID = id
    })
  }


  getDropDown() {

    this.getParent();
  }

  getParent() {
    this.busyLoadingParent = true
    this.DocPriorityService.GetParents().subscribe(res => {
      this.ParentList = res;
      this.busyLoadingParent = false;
    })
  }
  SelectParent(parent: DocPriority) {
    this.ParentItem = Object.assign({}, parent)
    this.docPriority.ID = this.ParentItem.ID
  }




  update() {
    this.DocPriorityService.update(this.docPriority).subscribe(
      res => {
        this.busySaving = false;
        this.notifier.notify('success', ' تم التعديل  بنجاح ');
        this.getAllDocPriority();


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

    this.DocPriorityService.create(this.docPriority).subscribe(
      res => {
        this.busySaving = false;
        this.notifier.notify('success', 'تمت الإضافة بنجاح');
        this.getAllDocPriority();

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


};

