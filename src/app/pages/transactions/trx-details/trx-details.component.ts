import { Component, OnInit } from '@angular/core';
import { TrxinboxDetails, DropdownList, TrxinboxDetailsPost, DocPriority, DepartmentDropdown } from 'src/app/shared/models';
import { TrxRequestsBoxService, DocPriorityService, departmentsService } from 'src/app/shared/services/api';
import { Router, ActivatedRoute } from '@angular/router';
import { TrxDetailsService } from 'src/app/shared/services/api/trx-details.service';
import { SwalService } from 'src/app/shared/services';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrxInService } from 'src/app/shared/services/api/trx-in.service';

class TrxDetails {
  StatementID: number;
  StatementText: string
}
class TrxImage {
  constructor() {
    this.AllUsers = false;
    this.AllDepts = false;
    this.AllManagers = false;
  }
  TrxID: number;
  ToUserID: number[];     //from drop down
  AllUsers: boolean;     //from checkbox 'نسخة لجميع موظفى القسم'
  AllDepts: boolean;     //from checkbox 'نسخة لروساء الاقسام'
  AllManagers: boolean;
}

class DirectTrxToUser{
  TrxID: number ;
  Statements: string;
  ToID: number ;
  DocPeriorityID: number ;
  Notes: string;
  Generalize: boolean;
  GenerailzationClass: number ;
  CopyToAllDepartments: boolean;
  DepartmentsIdForCopies: number[];
}

@Component({
  selector: 'app-trx-details',
  templateUrl: './trx-details.component.html',
  styleUrls: ['./trx-details.component.scss']
})
export class TrxDetailsComponent implements OnInit {
  page: number = 1;
  title : string;
  //mainObject
  trxinboxDetails: TrxinboxDetails;
  titles: string[] = [];
  properties: string[] = [];
  list: any[] = [];

  trxDetailsList: TrxDetails[] = [];
  selectedTrxDetails: TrxDetails = new TrxDetails();
  busyLoadingTrxDirectiveStatements: boolean = false;
  fielToUpload: File = null
  //Department Dropdown
  departmentList: DropdownList[] = [];
  selectedDepartment: DropdownList = new DropdownList();
  busyLoadingDepartment: boolean = false;

  //Employee Dropdown
  redirectEmployeeList: DropdownList[] = [];
  selectedEmployee: DropdownList = new DropdownList();
  busyLoadingEmployee: boolean = false;

  //Folder Dropdown
  folderList: DropdownList[] = [];
  selectedFolder: DropdownList = new DropdownList();
  busyLoadingfolders: boolean = false;
  //copyToDepartment
  copyToDepartmentsList: DropdownList[] = [];
  copyToDepartmentsListShadow: DropdownList[] = [];
  SelsectedcopyToDepartments: DropdownList = new DropdownList();
  busyLoadingCopyToDepartments: boolean = false;
  isTrxRecive: boolean = false;

  trxPostObject: TrxinboxDetailsPost = new TrxinboxDetailsPost();

  isAttacheAlow: boolean;

  trxImage = new TrxImage();

  isAllowAction : boolean = true;

  hideId : boolean;

  //doc priority dropdown
  docPiorityList: DropdownList[] = [];
  docPiority: DocPriority = new DocPriority();
  busyLoadingDocpPiority: boolean = false;


  departmenForCopiestList: DepartmentDropdown[] = [];
  departmenForCopiestListShadow: DepartmentDropdown[] = [];
  busyLoadingForCopiesDepartment: boolean = false;

  directTrxToUser : DirectTrxToUser = new DirectTrxToUser();


  constructor(
    private trxRequestsBoxService: TrxRequestsBoxService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private trxDetailsService: TrxDetailsService,
    private swalService: SwalService,
    private DepartmentsService: departmentsService,
    private spinner: NgxSpinnerService,
    private docPriorityService: DocPriorityService,
    private trxInService: TrxInService,
  ) { }

  ngOnInit() {
    //initilze main object
    this.trxinboxDetails = new TrxinboxDetails();
    const PerGroupID = JSON.parse(localStorage.getItem('User')).PerGroupID;
    if (PerGroupID == 9 || PerGroupID == 10) this.isAttacheAlow = true;
    else this.isAttacheAlow = false;
    this.getTrxinboxDetails();
    this.getDropdownLists();
    if(history.state.data === 'false'){
      this.isAllowAction = false;
      history.state.data = null;
    }
  }
  getDropdownLists() {
    this.getTrxDetailsDropdown();
    this.GetUndoDepartments();
    this.GetRedirectEmployees();
    this.GetFoldersForSave();
    this.GetCopyToDepartmentsList();
  }

  getTrxinboxDetails() {
    this.trxRequestsBoxService.GetTrxDetails(this.activatedRoute.snapshot.params.id).subscribe(res => {
      this.trxinboxDetails = res;
      this.hideId =this.trxinboxDetails.lastDirectivestatues == 17 ? true : false;
      this.changeTableContent();
    }, err => {
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }
  //change table content
  changeTableContent() {
    switch (this.page) {
      //TrxDirctive
      case 1:
        this.list = this.trxinboxDetails.TrxDirctives
        this.titles = ['التاريخ', 'توجيه من', 'توجيه الي', 'الشرح و التوجيه'];
        this.properties = ['DirectiveDateH', 'FromUserName', 'ToUserName', 'DirectiveDateH'];
        break;
      //TrxStatement
      case 2:
        this.list = this.trxinboxDetails.TrxStatements
        this.titles = ['التاريخ', 'توجيه من', 'توجيه الي', 'الشرح و التوجيه'];
        this.properties = ['DirectiveDateH', 'FromUserName', 'ToUserName', 'DirectiveDateH'];
        break;
      //TrxAttachment
      case 3:
        this.list = this.trxinboxDetails.TrxAttachments
        this.titles = ['اسم المرفق', 'التاريخ', 'الاسم', 'الاداره'];
        this.properties = ['AttachmentName', 'DirectiveDateH', 'UserName', 'DepartmentName'];
        break;
      //TrxCopie
      case 4:
        this.list = this.trxinboxDetails.TrxCopies
        this.titles = ['الاداره'];
        this.properties = ['DepartmentName'];
        break;
      default:
        break;
    }
  }
  //TrxDetails dropdown
  getTrxDetailsDropdown() {
    this.busyLoadingTrxDirectiveStatements = true;
    this.trxDetailsService.GetTrxDirectiveStatements().subscribe(res => {
      this.busyLoadingTrxDirectiveStatements = false;
      this.trxDetailsList = res;
    }, err => {
      this.busyLoadingTrxDirectiveStatements = false;
      let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
      this.swalService.NotifierError(errorMessage);
    })
  }
  selectTrxDetails(event: TrxDetails) {
    this.selectedTrxDetails = event;
    this.trxPostObject.Statements = ` نص التوجيه , ${event.StatementText}`
  }
  addToList(name: string) {
    this.busyLoadingTrxDirectiveStatements = true;
    this.trxDetailsService.AdddirectiveStatements(name).subscribe(res => {
      this.busyLoadingTrxDirectiveStatements = false;
      this.trxDetailsList.unshift({ StatementText: name, StatementID: null });
    }, err => {
      this.busyLoadingTrxDirectiveStatements = false;
      let errorMessage = err.message || 'حدث خطأ اثناء الاضافه ';
      this.swalService.NotifierError(errorMessage);
    })
  }
  //Department dropdown
  GetUndoDepartments() {
    this.busyLoadingDepartment = true;
    this.trxDetailsService.GetUndoDepartments().subscribe(res => {
      this.departmentList = res;
      this.busyLoadingDepartment = false;
    }, err => {
      this.busyLoadingDepartment = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError(errorMessage);
    })
  }
  selecteDepartment(department: DropdownList) {
    this.selectedDepartment = department;
    this.trxPostObject.ToUserID = department.ID
  }
  //Employee dropdown
  GetRedirectEmployees() {
    this.busyLoadingEmployee = true;
    this.trxDetailsService.GetRedirectEmployees().subscribe(res => {
      this.redirectEmployeeList = res;
      this.busyLoadingEmployee = false;
    }, err => {
      this.busyLoadingEmployee = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError(errorMessage);
    })
  }
  selectEmployee(employee: DropdownList) {
    this.trxPostObject.ToUserID = employee.ID;
  }
  //Folder dropdown
  GetFoldersForSave() {
    this.busyLoadingfolders = true;
    this.trxDetailsService.GetFoldersForSave().subscribe(res => {
      this.busyLoadingfolders = false;
      this.folderList = res;
    }, err => {
      this.busyLoadingfolders = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError(errorMessage);
    })
  }
  selectFolder(employee: DropdownList) {
    this.selectedFolder = employee;
  }
  addFolderToFolderList(name: string) {
    this.busyLoadingfolders = true;
    this.trxDetailsService.AddSaveFolder(name).subscribe(res => {
      this.folderList.unshift({ Name: res.FolderName, ID: res.FolderID });
      this.busyLoadingfolders = false;
    }, err => {
      this.busyLoadingEmployee = false;
      let errorMessage = err.message || 'حدث خطأ اثناء الاضافه';
      this.swalService.NotifierError(errorMessage);
    })
  }
  // upload file
  uploadFile(files: FileList) {
    this.trxPostObject.LitterFile = files[0];
  }
  // clearPopUP(){
  //   this.fielToUpload = null;
  //   this.selectedTrxDetails = null; 
  // }

  GetCopyToDepartmentsList() {
    this.busyLoadingCopyToDepartments = true;
    this.trxDetailsService.GetCopyToDepartments().subscribe(
      res => {
        this.busyLoadingCopyToDepartments = false;
        this.copyToDepartmentsList = res;
      }, err => {
        this.busyLoadingCopyToDepartments = false;
        let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      }
    )
  }
  deleteDepartmentItem(index: number) {
    this.copyToDepartmentsList.unshift(this.copyToDepartmentsListShadow[index]);
    this.copyToDepartmentsListShadow.splice(index, 1);
    this.copyToDepartmentsList = [...this.copyToDepartmentsList];
  }
  SelectCopyOfDepartment(department: DropdownList) {
    this.SelsectedcopyToDepartments = department
    this.copyToDepartmentsListShadow.push(department);
    let index = this.copyToDepartmentsList.findIndex(item => item.ID === department.ID);
    this.copyToDepartmentsList.splice(index, 1);
    this.copyToDepartmentsList = [...this.copyToDepartmentsList];
  }
  TrxRecive() {
    this.trxDetailsService.TrxRecive(this.trxinboxDetails.DirectiveID).subscribe(res => {
      this.isTrxRecive = true;
    }, err => {
      this.swalService.NotifierError('لم يتم الاستلام')
    })
  }

  save(state: number) {
    if (state == 5 || state == 5 || state == 5 || state == 5)
      if (!this.trxPostObject.ToUserID) {
        this.swalService.NotifierError('من فضلك اكمل البيانات')
        return
      }
    this.trxPostObject.TrxID = this.trxinboxDetails.TrxID;
    this.trxPostObject.TrxStatusID = state;
    this.spinner.show()
    this.trxDetailsService.SaveTrxDirectiveForDetails(this.trxPostObject).subscribe(res => {
      this.spinner.hide();
      this.router.navigate(['pages/Transactions/TrxInbox'])

    }, err => {
      this.spinner.hide();
      this.swalService.NotifierError('حدث مشكله اثناء الحفظ');
    })
  }
  saveTrxImage() {
    this.trxImage.ToUserID = [];
    this.trxImage.TrxID = this.trxinboxDetails.TrxID;
    if (this.copyToDepartmentsListShadow.length > 1) {
      this.copyToDepartmentsListShadow.forEach(el => {
        this.trxImage.ToUserID.push(el.ID)
      })
    }
    if (this.trxImage.AllManagers || this.trxImage.AllDepts || this.trxImage.AllUsers) {
      this.trxImage.ToUserID = null;
    }
    this.trxDetailsService.SaveTrxCopiesUser(this.trxImage).subscribe(res => {
      this.router.navigate(['pages/Transactions/TrxInbox'])
    }, err => {
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }


  //////////////////////////////
  // priority DropDown
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
  // selectDocPriority(event: DropdownList) {
  //   this.trxIn.DocPeriorityID = event.ID;
  // }
  //Employee dropdown
  GetEmployees() {
    this.busyLoadingEmployee = true;
    this.trxDetailsService.GetRedirectEmployees().subscribe(res => {
      this.redirectEmployeeList = res;
      this.busyLoadingEmployee = false;
    }, err => {
      this.busyLoadingEmployee = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError(errorMessage);
    })
  }
  selectEmp(employee: DropdownList) {
    this.trxPostObject.ToUserID = employee.ID;
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

  saveDirectTrxToUser(){
    this.trxInService.DirectTrxToUser(this.directTrxToUser).subscribe(res =>{
      this.router.navigate(['pages/Transactions/TrxInbox']);
    }, err => {
      let errorMessage = err.error.message || 'حدث خطأ قي استلام البيانات';
      this.swalService.NotifierError(errorMessage)
    })
  }



}
