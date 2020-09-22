import { Component, OnInit } from '@angular/core';
import { DocTypes, Config, FilterParams, Permission, PermissionMenu } from 'src/app/shared/models';
import { PermissionsService, DocTypesService } from 'src/app/shared/services/api';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/shared/services';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-doc-types-list',
  templateUrl: './doc-types-list.component.html',
  styleUrls: ['./doc-types-list.component.scss']
})
export class DocTypesListComponent implements OnInit {
  //main object
  docTypes: DocTypes;
  //dropdownPerGroup

  //dropdown
  GetIdNameList: DocTypes;
  ParentList: DocTypes[] = [];
  ParentItem = new DocTypes();
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
  docTypesList: DocTypes[] = [];
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
      key: 'Name',
      label: 'ألاسم',
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
    private docTypesService: DocTypesService,
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
    this.getAlldocTypes();


    this.docTypes = new DocTypes();
    this.getDropDown();

    if (this.route.snapshot.queryParams.isAdd === 'true') {

      this.isAdd = true;

    } else {

      this.docTypes.ID = this.route.snapshot.params.id;
      this.getdocTypes(this.docTypes.ID)
      this.isAdd = false
    }

    if (this.route.snapshot.queryParams.isEdit === 'true') {
      this.isEdit = true;

    } else {

      this.docTypes.ID = this.route.snapshot.params.id;
      this.getdocTypes(this.docTypes.ID)
      this.isEdit = false
    }

    this.spinner.show();
    const params = this.route.snapshot.queryParams;
    if (params.permissionGroup == 'true') {
      this.filterParams.pageSize = 10;
      this.filterParams.sortField = "ID";
      this.id = params.id;
      this.getAlldocTypes()
      this.id = false
    } else if (params.permissionGroup == 'false') {
      this.filterParams.pageSize = 10;
      this.filterParams.sortField = "ID";
      this.id = params.id
      this.getAlldocTypes()
      this.id = true;
    }
    this.configs[2].visible = this.id


  }

  search(event: any) {
    this.filterParams.pageSize = 10;
    this.filterParams.searchValue = event.target.value
    this.getAlldocTypes();
  }
  removeSearch() {
    this.queryString = ''
  }

  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    this.getAlldocTypes();
  }
  setPageSize(pagesize: number) {
    this.filterParams.pageSize = pagesize;
    this.getAlldocTypes();
  }



  getAlldocTypes() {
    this.busyLoading = true;
    this.docTypesService.getAll(this.filterParams).subscribe(
      res => {
        this.docTypesList = res.result;

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

  fill(prop: DocTypes) {
    this.docTypes = Object.assign({}, prop)

  }



  delete(id: number, Name: string, index: number) {
    this.swalService.showRemoveConfirmation(Name).then(
      result => {
        if (result.value) {
          this.docTypesService.delete(id).subscribe(
            res => {
              this.docTypesList.splice(index, 1);
              this.swalService.Notifier('تم الحذف بنجاح');
              this.getAlldocTypes();
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

  getdocTypes(id) {
    this.docTypesService.getAll(id).subscribe(res => {
      this.docTypes.ID = id
    })
  }


  getDropDown() {

    this.getParent();
  }

  getParent() {
    this.busyLoadingParent = true
    this.docTypesService.GetParents().subscribe(res => {
      this.ParentList = res;
      this.busyLoadingParent = false;
    })
  }
  SelectParent(parent: DocTypes) {
    this.ParentItem = Object.assign({}, parent)
    this.docTypes.ID = this.ParentItem.ID
  }




  update() {
    this.docTypesService.update(this.docTypes).subscribe(
      res => {
        this.busySaving = false;
        this.notifier.notify('success', ' تم التعديل  بنجاح ');
        this.getAlldocTypes();


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

    this.docTypesService.create(this.docTypes).subscribe(
      res => {
        this.busySaving = false;
        this.notifier.notify('success', 'تمت الإضافة بنجاح');
        this.getAlldocTypes();

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

