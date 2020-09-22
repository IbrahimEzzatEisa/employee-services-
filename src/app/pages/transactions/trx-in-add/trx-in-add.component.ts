import { Component, OnInit, ViewChild } from '@angular/core';
import { TrxIn, DropdownList, DocPriority, DepartmentDropdown, Drawer } from 'src/app/shared/models';
import {
  DocTypesService, DocPriorityService, OutsidesService,
  departmentsService
} from 'src/app/shared/services/api';
import { SwalService } from 'src/app/shared/services';
import { DrawersService } from 'src/app/shared/services/api/drawers.service';
import { TrxInService } from 'src/app/shared/services/api/trx-in.service';
import { viewClassName } from '@angular/compiler';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trx-in-add',
  templateUrl: './trx-in-add.component.html',
  styleUrls: ['./trx-in-add.component.scss']
})
export class TrxInAddComponent implements OnInit {

  @ViewChild('form', { static: false }) form: NgForm;

  trxIn: TrxIn;
  title = '';
  page;
  //doc type dropdown
  docTypeList: DropdownList[] = [];
  busyLoadingDocType: boolean = false;
  //doc priority dropdown
  docPiorityList: DropdownList[] = [];
  docPiority: DocPriority = new DocPriority();
  busyLoadingDocpPiority: boolean = false;
  //outSide dropdown
  outSideList: DropdownList[] = [];
  outSide: DropdownList = new DropdownList();
  busyLoadingOutSide: boolean = false;
  //department dropdown
  departmentList: DepartmentDropdown[] = [];
  busyLoadingDepartment: boolean = false;

  departmenForCopiestList: DepartmentDropdown[] = [];
  departmenForCopiestListShadow: DepartmentDropdown[] = [];
  busyLoadingForCopiesDepartment: boolean = false;
  //Drawers dropdown
  drawerList: Drawer[] = [];
  busyLoadingDrawer: boolean = false;
  formSubmitted: boolean = false;
  isHide: boolean;


  constructor(
    private docTypesService: DocTypesService,
    private swalService: SwalService,
    private docPriorityService: DocPriorityService,
    private outsidesService: OutsidesService,
    private DepartmentsService: departmentsService,
    private drawersService: DrawersService,
    private trxInService: TrxInService,
  ) { }

  ngOnInit() {
    this.trxIn = new TrxIn();
    this.isHide = JSON.parse(localStorage.getItem('EtaSettings')).IsStartPage;
    this.getDropDown();
  }
  getDropDown() {
    this.getDocType();
    this.getDocPriorityList();
    this.getOutSideList();
    this.getDepartments();
    this.getCopiesDepartment();
    this.getDrawers();
  }
  selectDate(date) {
    this.trxIn.TrxDate = date.greg
    // this.overTime.DateH = date.hijri
  }
  //tDocType dropdown
  getDocType() {
    this.busyLoadingDocType = true;
    this.docTypesService.GetIdNameList().subscribe(res => {
      this.docTypeList = res;
      this.busyLoadingDocType = false;
    }, err => {
      this.busyLoadingDocType = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError(errorMessage);
    })
  }
  selectDocumentType(doc: DropdownList) {
    this.trxIn.DocTypeID = doc.ID;
  }
  //Document priority dropdown
  getDocPriorityList() {
    this.busyLoadingDocpPiority = true;
    this.docPriorityService.GetIdNameList().subscribe(res => {
      this.busyLoadingDocpPiority = false;
      this.docPiorityList = res;
    }, err => {
      this.busyLoadingDocpPiority = false;
      let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
      this.swalService.NotifierError(errorMessage);
    })
  }
  selectDocPriority(event: DropdownList) {
    this.trxIn.DocPeriorityID = event.ID;
  }
  addDocPriority(name, docNumber) {
    if (name || docNumber) {
      this.swalService.NotifierError('من فضلك قم باتمام جميع الحقول');
      return;
    }
    this.docPiority.ID = 0;
    this.busyLoadingDocpPiority = true;
    this.docPriorityService.create(this.docPiority).subscribe(res => {
      this.busyLoadingDocpPiority = false;
      this.swalService.Notifier('تم الاضافه');
      this.getDocPriorityList();
    }, err => {
      this.busyLoadingDocpPiority = false;
      let errorMessage = err.message || 'حدث خطأ اثناء الاضافه ';
      this.swalService.NotifierError(errorMessage);
    })
  }
  //out side dropdown
  getOutSideList() {
    this.busyLoadingOutSide = true;
    this.outsidesService.GetIdNameList().subscribe(res => {
      this.outSideList = res;
      this.busyLoadingOutSide = false;
    }, err => {
      this.busyLoadingOutSide = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError(errorMessage);
    });
  }
  selectOutSide(doc: DropdownList) {
    this.trxIn.FromID = doc.ID;
  }
  addOutside(name: boolean) {
    if (name) {
      this.swalService.NotifierError('من فضلك قم باتمام جميع الحقول');
      return;
    }
    this.outSide.ID = 0
    this.busyLoadingOutSide = true;
    this.outsidesService.post(this.outSide).subscribe(res => {
      this.getOutSideList();
    }, err => {
      this.busyLoadingOutSide = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام الاضافه';
      this.swalService.NotifierError(errorMessage);
    });
  }
  //department dropdown
  getDepartments() {
    this.busyLoadingDepartment = true;
    this.DepartmentsService.getDepartmentList().subscribe(res => {
      this.busyLoadingDepartment = false;
      this.departmentList = res;
    }, err => {
      this.busyLoadingOutSide = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError(errorMessage);
    });
  }
  selectDepartment(event: DepartmentDropdown) {
    this.trxIn.ToID = event.DepartmentID;
  }
  getCopiesDepartment() {
    this.busyLoadingForCopiesDepartment = true;
    this.DepartmentsService.getDepartmentList().subscribe(res => {
      this.busyLoadingForCopiesDepartment = false;
      this.departmenForCopiestList = res;
    }, err => {
      this.busyLoadingForCopiesDepartment = false;
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }
  deleteCopiesDepartment(index: number) {
    this.departmenForCopiestList.push(this.departmenForCopiestListShadow[index])
    this.departmenForCopiestListShadow.splice(index, 1);

  }
  selectCopiesDepartment(user: DepartmentDropdown) {
    this.departmenForCopiestListShadow.push(user);
    this.departmenForCopiestList.splice(this.departmenForCopiestList.findIndex(item => item.DepartmentID === user.DepartmentID), 1);

  }
  // selectDepartment(event : DepartmentDropdown){
  //   this.trxIn.ToID = event.DepartmentID;
  // }
  //Drawers dropdown
  getDrawers() {
    this.busyLoadingDrawer = true;
    this.drawersService.get().subscribe(res => {
      this.busyLoadingDrawer = false;
      this.drawerList = res;
    }, err => {
      this.busyLoadingDrawer = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError(errorMessage);
    });
  }
  selectDrawer(event: Drawer) {
    this.trxIn.ToID = event.DrajID;
  }

  save(...args) {
    this.formSubmitted = true;
    if (args.includes(true) || this.trxIn.Subject.length < 1 || String(this.trxIn.TrxDeliveryTypeID).length < 1) {
      if(this.isHide  == true){
        if(this.trxIn.ToID < 1){
          this.swalService.NotifierError('قم من فضلك باكمال البيانات المطلوبه');
          return;
        }
      }
      this.swalService.NotifierError('قم من فضلك باكمال البيانات المطلوبه');
      return;
    }
    if (this.departmenForCopiestListShadow.length >= 1) {
      this.trxIn.DepartmentsIdForCopies.push(
        ...this.departmenForCopiestListShadow.map(item => item.DepartmentID)
      )
    }
    this.trxIn.TrxDeliveryTypeID = Number(this.trxIn.TrxDeliveryTypeID)
    this.trxInService.post(this.trxIn).subscribe(res => {
      this.swalService.Notifier('تم الحفظ');
      this.formSubmitted = false;
    }, err => {
      this.busyLoadingDrawer = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError(errorMessage);
    })
  }

}
