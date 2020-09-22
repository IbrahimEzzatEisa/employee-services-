import { Component, OnInit } from '@angular/core';
import { FilterParams, TrxSearch, TrxSearchResult } from 'src/app/shared/models';
import { TrxSearchService } from 'src/app/shared/services/api/trx-search.service';
import { SwalService } from 'src/app/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-trx-search',
  templateUrl: './trx-search.component.html',
  styleUrls: ['./trx-search.component.scss']
})
export class TrxSearchComponent implements OnInit {
  trxSearch: TrxSearch;
  trxSearchResultList: TrxSearchResult[] = [];

  filter = new FilterParams();
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  busyLoading: boolean = false;
  properties: string[] = ['TrxID', 'TrxHijriDate', 'FromName', 'ToName', 'Serial', 'Subject', 'StatusName',]
  titles: string[] = ['#', 'تاريخ', 'ورد من	', 'ورد الى	', 'المعاملة', 'الموضــوع	', 'الحالة', 'خيارات']
 
  private navigationExtras: NavigationExtras = {
    state: {
      isAllow: false,
    }
  };
 
 
  constructor(
    private trxSearchService: TrxSearchService,
    private spinner : NgxSpinnerService,
    private swalService : SwalService,
    private router : Router
  ) { }

  ngOnInit() {
    this.trxSearch = new TrxSearch();
    this.filter.pageNumber = 1;
    this.filter.pageSize = 10;
    this.save();
  }
  save() {
    this.spinner.show();
    this.trxSearchService.post(this.trxSearch, this.filter).subscribe(res => {
      this.spinner.hide();
      this.trxSearchResultList = res.result;
      this.totalNumberOfItems = res.pagination.totalItems
      this.totalNumberOfPages = res.pagination.totalPages
      this.filter.pageNumber = res.pagination.currentPage
      this.filter.pageSize = res.pagination.itemsPerPage
    },err =>{
      this.spinner.hide();
      this.busyLoading = false;
      let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
      this.swalService.NotifierError( errorMessage);
    })
  }
  changePageNumber(pageNumber) {
    this.filter.pageNumber = pageNumber;
    this.save();
  }
  changePageSize(pageSize) {
    this.filter.pageSize = pageSize;
    this.save();
  }
  search(event) {
    this.filter.pageSize = 10;
    this.filter.searchValue = event
    this.save();
  }
  removeSearch() {
    this.filter.searchValue = ''
  }
  setPageSize(pagesize: number) {
    this.filter.pageSize = pagesize;
    this.save();
  }
  selectFromDate(date) {
    this.trxSearch.DateFrom = date.greg
    // this.archive.ArchiveHijriDate = date.hijri
  }
  selectToDate(date) {
    this.trxSearch.DateTo = date.greg
    // this.archive.ArchiveHijriDate = date.hijri
  }
  navigate({TrxID}){
    this.router.navigate([`/pages/Transactions/Trx-details/${TrxID}`],{state:{data: 'false'}});
  }


}
