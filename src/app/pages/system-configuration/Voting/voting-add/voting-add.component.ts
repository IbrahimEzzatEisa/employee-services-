import { Component, OnInit } from '@angular/core';
import { Voting, Config, Votings, FilterParams } from 'src/app/shared/models';
import { DateService, SwalService } from 'src/app/shared/services';
import { VotingService } from 'src/app/shared/services/api';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-voting-add',
  templateUrl: './voting-add.component.html',
  styleUrls: ['./voting-add.component.scss']
})
export class VotingAddComponent implements OnInit {

  //main-object-- backup
  voting: Votings;
  votingBackup: Votings;

  //main object
  votingList: Voting[] = [];
  votingItem = new Voting();

  // date now 
  myDate = new Date();


  answer: any = {};
  // config tabel
  // total number of page pages / items of list table
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  // dropdown filter  -- page permission
  filterParams = new FilterParams();

  searchTimeout: any;
  queryString: string = '';
  // set loading state
  busyLoading: boolean = false;

  configs: Config[] = [
    {
      key: 'VotingDetailsID',
      label: ' المسلسل ',
      visible: true
    },
    {
      key: 'Answer',
      label: ' الإجابة ',
      visible: true
    },


    {
      key: 'choises',
      label: ' خيارات ',
      visible: true
    }

  ];
  // second tabel get All data Voting
  config: Config[] = [
    {
      key: 'VotingID',
      label: 'المسلسل',
      visible: true
    },
    {
      key: 'VotingName',
      label: 'الاسم',
      visible: true
    },
    {
      key: 'VotingDate',
      label: 'التاريخ',
      visible: true
    },
    {
      key: 'VotingQuestion',
      label: 'السؤال',
      visible: true
    },

    {
      key: 'choises',
      label: 'الخيارات',
      visible: true
    }
  ];
  sendSmsCustomers: any[] = [];
  Answertxt: string;


  isShow: boolean = false;
  ShowTabel: boolean = false;

  constructor(private DateServices: DateService,
    private VotingServices: VotingService,
    private swalService: SwalService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService, ) { }

  ngOnInit() {
    //init object 
    this.voting = new Votings();
    this.voting.VotingDetails = [];
    this.filterParams.pageSize = 10;
    this.filterParams.sortField = "VotingID";
    this.getDateNow();
    this.getAllvoting();
  }

  search(event: any) {
    this.filterParams.pageSize = 10;
    this.filterParams.searchValue = event.target.value
    this.getAllvoting();
  }
  removeSearch() {
    this.queryString = ''
  }
  changePageNumber(pageSize) {
    this.filterParams.pageNumber = pageSize;
    this.getAllvoting();
  }
  setPageSize(pagesize: number) {
    this.filterParams.pageSize = pagesize;
    this.getAllvoting();
  }
  // get All data into tabel 
  getAllvoting() {
    this.busyLoading = true;
    this.spinner.show()
    this.VotingServices.getAll(this.filterParams).subscribe(
      res => {
        this.votingList = res.result;
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
  // get date now
  getDateNow() {
    let myDate = new Date(this.myDate);
    this.voting.VotingDate = this.DateServices.fromGregorianToGregorianString(this.myDate);


  }
  selectVotingStartDate(endDate) {
    this.voting.VotingStartDate = endDate.greg;
  }

  selectVotingEndDate(endDate) {
    this.voting.VotingEndDate = endDate.greg;

  }
  //save answer voting
  saveAnswer() {
    this.voting.VotingDetails.push({
      VotingDetailsID: (this.voting.VotingDetails.length - 1) + 1,
      VotingId: this.voting.VotingID,
      Answer: this.Answertxt

    });
    this.notifier.notify('success', 'تمت الإضافة بنجاح');
    this.ShowTabel = true;
    this.Answertxt = '';

  }
  //fill popup
  fill(i) {
    let item = this.voting.VotingDetails[i];
    this.Answertxt = this.voting.VotingDetails[i].Answer
    this.voting.VotingDetails[i].VotingDetailsID = this.voting.VotingDetails[i].VotingDetailsID
    this.voting.VotingDetails[i].Answer = this.Answertxt;
    //  this.voting.VotingDetails[i].Answer= item[i].Answer ;

  }
  //save
  save() {  
    this.create()

  }
  //show tabel get all voting
  Show() {
    this.isShow = true;
    this.reset();
    this.ShowTabel = false
  }
  Hide() {
    this.isShow = false;
    this.reset();
    this.Answertxt=''
  }

  //on submit form call update if isEdit = true otherwise call create
  saveedit() {
    this.voting.VotingDetails[0].Answer = this.Answertxt;
    this.notifier.notify('success', 'تمت التعديل بنجاح');
    this.Answertxt = '';

  }
  //reset all fields 
  reset() {
    this.Answertxt = '';
    this.voting.VotingName = '';
    this.voting.VotingID = null;
    this.voting.VotingDate = '';
    this.voting.VotingStartDate = '';
    this.voting.VotingEndDate = '';
    this.voting.VotingQuestion = '';
    this.voting.VotingDetails = null;

  }

  // POST ____ PUT______DELETE
  create() {
    this.VotingServices.create(this.voting).subscribe(
      res => {
        this.reset();
        this.Answertxt = '';

        this.notifier.notify('success', 'تمت الإضافة بنجاح');
        this.ShowTabel = false;
      },
      err => {
        this.notifier.notify('error', err.message || 'حدث خطأ اثناء الإضافة');

      }
    )
  }

  delete(id: number, name: string, index: number) {
    this.swalService.showRemoveConfirmation(name).then(
      result => {
        if (result.value) {
          this.voting.VotingDetails.splice(index, 1);
          this.swalService.Notifier('تم الحذف بنجاح');
        }
      },
      err => {
        let errorMessage = err.message || 'حدث خطأ اثناء الحذف';
        this.swalService.NotifierError(errorMessage)

      }

    );
  }
  // finish voting
  Finish(prop: Voting) {
    this.voting.VotingID = prop.VotingID
    this.VotingServices.Finish(this.voting.VotingID, this.voting).subscribe(
      res => {
        this.notifier.notify('success', 'تم التصويت  بنجاح');
        this.getAllvoting();
      },
      err => {
        const errorMessage = err.message || 'حدث خطأ اثناء التصويت';
        this.notifier.notify('error', errorMessage);
      }
    )
  }


}