import { Component, OnInit } from '@angular/core';
import { FilterParams, TrxInbox } from 'src/app/shared/models';
import { TrxRequestsBoxService } from 'src/app/shared/services/api';
import { SwalService } from 'src/app/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trx-inbox',
  templateUrl: './trx-inbox.component.html',
  styleUrls: ['./trx-inbox.component.scss']
})
export class TrxInboxComponent implements OnInit {
  //main object
  trxInboxList : TrxInbox[] = [];
  filterParams = new FilterParams();
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  busyLoading: boolean = false;
  constructor(
    private trxRequestsBoxService : TrxRequestsBoxService,
    private swalService: SwalService,
    private spinner: NgxSpinnerService,
    private router : Router
    ) { }

  ngOnInit() {
    this.filterParams.sortField = "DateFrom"
    this.filterParams.pageSize =10;
    this.getMyInbox();
  }
  getMyInbox(){
    this.spinner.show();
    this.trxRequestsBoxService.getMyInbox().subscribe(res =>{
      this.spinner.hide();
      this.trxInboxList = res.result
      this.filterParams.pageNumber = res.pagination.currentPage;
      this.filterParams.pageSize = res.pagination.itemsPerPage;
      this.totalNumberOfPages = res.pagination.totalPages;
      this.totalNumberOfItems = res.pagination.totalItems;
      this.busyLoading = false;
    },err =>{
      this.spinner.hide();
      this.busyLoading = false;
      let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
      this.swalService.NotifierError( errorMessage);
    })
  }

  search(event: any) {
    this.filterParams.searchValue = event.target.value
    this.getMyInbox();
  }
  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    this.getMyInbox();
  }
  setPageSize(pagesize: number) {
    this.filterParams.pageSize = pagesize;
    this.getMyInbox();
  }
  navigate({TrxID}){
    this.router.navigate(['/pages/Transactions','Trx-details',TrxID])
  }

}
