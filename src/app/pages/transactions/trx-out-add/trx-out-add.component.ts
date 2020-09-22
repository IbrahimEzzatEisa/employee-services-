import { Component, OnInit } from '@angular/core';
import { DocTypes, FilterParams, DepartmentManagersUsers, Outsides, Trxoutadd } from 'src/app/shared/models';
import { DocTypesService, departmentsService, OutsidesService, TrxoutaddService } from 'src/app/shared/services/api';
import { SwalService } from 'src/app/shared/services';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-trx-out-add',
  templateUrl: './trx-out-add.component.html',
  styleUrls: ['./trx-out-add.component.scss']
})
export class TrxOutAddComponent implements OnInit {

  //main object -- backup
  trxOutAdd: Trxoutadd;
  trxOutAddBackup: Trxoutadd;
  DocTypes: DocTypes[] =[];
  departments: DepartmentManagersUsers[] =[];
  outsides: Outsides[] =[];
  busyLoading: boolean = false;
  filterParams = new FilterParams();


  totalNumberOfPages: number;
  totalNumberOfItems: number;

  constructor(private DocTypesServices: DocTypesService ,
    private swalService : SwalService ,
    private departmentsServices: departmentsService , 
    private outsidesServices: OutsidesService , 
    private trxOutservices: TrxoutaddService ,
    private notifier: NotifierService) { }

  ngOnInit() {
    //init object 
    this.trxOutAdd = new Trxoutadd();
    this.getAllDocTypes();
    this.getDepartments();
    this.Outsides();

  }



getAllDocTypes(){
this.DocTypesServices.getAll( this.filterParams)
.subscribe(res => {
  this.DocTypes = res.result;
  console.log(this.DocTypes)
  this.filterParams.pageNumber = res.pagination.currentPage;
  this.filterParams.pageSize = res.pagination.itemsPerPage;
  this.totalNumberOfPages = res.pagination.totalPages;
  this.totalNumberOfItems = res.pagination.totalItems;
  this.busyLoading = false;
}, err =>{
  this.busyLoading = false;
  let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
  this.swalService.NotifierError( errorMessage);
})



}

getDepartments(){
  this.departmentsServices.GetIdNameList().subscribe(
    res=> {
      this.departments = res;
    }
  )
}


Outsides(){
    this.outsidesServices.getAll( this.filterParams)
    .subscribe(res => {
      this.outsides = res.result;
      console.log(this.outsides)
      this.filterParams.pageNumber = res.pagination.currentPage;
      this.filterParams.pageSize = res.pagination.itemsPerPage;
      this.totalNumberOfPages = res.pagination.totalPages;
      this.totalNumberOfItems = res.pagination.totalItems;
      this.busyLoading = false;
    }, err =>{
      this.busyLoading = false;
      let errorMessage = err.message || 'حدث خطأ اثناء استلام البيانات';
      this.swalService.NotifierError( errorMessage);
    })
    
    
    
    }



    
  selectDate(Date) {
    this.trxOutAdd.TrxDate = Date.greg;
  }

  SelectDocType(DocTypes: DocTypes) {
    this.trxOutAdd.DocTypeID = DocTypes.ID;
  }

    save(){
      this.create();
    }
    // POST ____ PUT______DELETE
    create() {
      this.trxOutservices.create(this.trxOutAdd).subscribe(
        res => {
          // this.reset();
          this.notifier.notify('success', 'تمت الإضافة بنجاح');
        },
        err => {
          this.notifier.notify('error', err.message || 'حدث خطأ اثناء الإضافة');
  
        }
      )
    }
}

