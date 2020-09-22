import { Component, OnInit } from '@angular/core';
import { Jobs, FilterParams, Config } from 'src/app/shared/models';
import { JobsService } from 'src/app/shared/services/api';
import { NotifierService } from 'angular-notifier';
import { SwalService } from 'src/app/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  //main object
  jobs: Jobs;
  jobsBackup: Jobs;

  // tabel 
  jobsList: Jobs[] = [];

  // total number of page pages / items of list table
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  // dropdown filter  -- page permission
  filterParams = new FilterParams();

  searchTimeout: any;
  queryString: string = '';
  // set loading state
  busyLoading: boolean = false;
  // config tabel
  configs: Config[] = [
    {
      key: 'ID',
      label: ' المسلسل ',
      visible: true
    },
    {
      key: 'Name',
      label: ' الجهة ',
      visible: true
    },

    {
      key: 'choises',
      label: ' خيارات ',
      visible: true
    }

  ];

  constructor(private notifier: NotifierService,
    private swalService: SwalService,
    private spinner: NgxSpinnerService,
    private jobsServices: JobsService) { }

  ngOnInit() {
    this.jobs = new Jobs;
    this.filterParams.pageSize = 10;
    this.filterParams.sortField = "ID";
    this.getAllJobs();
  }


  search(event: any) {
    this.filterParams.pageSize = 10;
    this.filterParams.searchValue = event.target.value
    this.getAllJobs();
  }
  removeSearch() {
    this.queryString = ''
  }


  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    this.getAllJobs();
  }
  setPageSize(pagesize: number) {
    this.filterParams.pageSize = pagesize;
    this.getAllJobs();
  }
  //get date authorities fill tabel
  getAllJobs() {
    this.busyLoading = true;
    this.spinner.show()
    this.jobsServices.getAll(this.filterParams).subscribe(
      res => {
        this.jobsList = res.result;
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

  //on submit form call update if isEdit = true otherwise call create
  save() {
    this.create();
  }

  //on submit form call update if isEdit = true otherwise call create
  saveedit() {
    this.update();

  }
  // reset
  reset() {
    this.jobs.Name = '';
  }
  //fill
  fill(item: Jobs) {
    this.jobs.Name = item.Name
    this.jobs.ID = item.ID
  }
  // POST ____ PUT______DELETE
  create() {
    this.jobsServices.create(this.jobs).subscribe(
      res => {
        this.notifier.notify('success', 'تمت الإضافة بنجاح');
        this.reset();
        this.getAllJobs();
      },
      err => {
        this.notifier.notify('error', err.message || 'حدث خطأ اثناء الإضافة');

      }
    )
  }
  update() {
    this.jobsServices.update(this.jobs.ID, this.jobs).subscribe(
      res => {
        this.reset();
        this.notifier.notify('success', 'تم التعديل  بنجاح');
        this.getAllJobs();
      },
      err => {
        const errorMessage = err.message || 'حدث خطأ اثناء التعديل';
        this.notifier.notify('error', errorMessage);
      }
    )
  }

  delete(id: number, name: string, index: number) {
    this.swalService.showRemoveConfirmation(name).then(
      result => {
        if (result.value) {
          this.jobsServices.delete(id).subscribe(
            res => {
              this.jobsList.splice(index, 1);
              this.swalService.Notifier('تم الحذف بنجاح');
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


}
