import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SwalService, ChangeThemeService } from 'src/app/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterParams, Config, News } from 'src/app/shared/models';
import { NewsService } from 'src/app/shared/services/api';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  //main object
  newsList: News[] = [];
  news: News;
  // total number of page pages / items of list table
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  // dropdown filter  -- page permission
  filterParams = new FilterParams();

  searchTimeout: any;
  queryString: string = '';
  // set loading state
  busyLoading: boolean = false;
  NewsID: News;

  configs: Config[] = [
    {
      key: 'NewsID',
      label: ' رقم الخبر ',
      visible: true
    },
    {
      key: 'NewsDate',
      label: 'التاريخ',
      visible: true
    },
    {
      key: 'NewsTitle',
      label: ' الموضوع',
      visible: true
    },
    {
      key: 'NewsDescription',
      label: 'التفاصيل ',
      visible: true
    },

    {
      key: 'choises',
      label: 'الخيارات',
      visible: true
    }
  ];

  constructor(private route: Router,
    private newsService: NewsService,
    private notifier: NotifierService,
    private swalService: SwalService,
    private spinner: NgxSpinnerService,
    private route2: Router,
    private changeThemeService: ChangeThemeService,
  ) { }

  ngOnInit() {
    this.spinner.show()
    this.filterParams.pageSize = 10;
    this.filterParams.sortField = "NewsID";
    this.getAllNews();
  }

  search(event: any) {
    this.filterParams.pageSize = 10;
    this.filterParams.searchValue = event.target.value
    this.getAllNews();
  }
  removeSearch() {
    this.queryString = ''
  }


  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    this.getAllNews();
  }
  setPageSize(pagesize: number) {
    this.filterParams.pageSize = pagesize;
    this.getAllNews();
  }
  // get content all data for notices
  getAllNews() {
    this.busyLoading = true;
    this.newsService.getAll(this.filterParams).subscribe(
      res => {
        this.newsList = res.result;
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
          this.newsService.delete(id).subscribe(
            res => {
              this.newsList.splice(index, 1);
              this.swalService.Notifier('تم الحذف بنجاح');
              this.getAllNews();

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

  navigateToEdit(NewsID: number) {
    this.route.navigate([`./pages/system-configuration/NewsView/edit/${NewsID}`], { queryParams: { isEdit: true } })
  }
  navigateToAdd() {
    this.route.navigate([`./pages/system-configuration/NewsView/add/`], { queryParams: { isAdd: true } })
  }


}
