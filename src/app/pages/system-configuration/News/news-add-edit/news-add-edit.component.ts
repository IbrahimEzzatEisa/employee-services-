import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { News, FilterParams } from 'src/app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from 'src/app/shared/services';
import { NewsService } from 'src/app/shared/services/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { UQCal } from 'src/app/shared/scripts/date'
import { DateService } from 'src/app/shared/services';
import { GregorianHijriCalendarComponent } from 'src/app/shared/components';
import { DatePipe } from '@angular/common';


require('src/app/shared/scripts/jquery.calendars');
require('src/app/shared/scripts/jquery.calendars.plus');
require('src/app/shared/scripts/jquery.calendars.ummalqura');
require('src/app/shared/scripts/jquery.calendars.ummalqura-ar');
const numberOfDaysInYear = 354.367056;
const numberOfDaysInMonth = 29.530588;
const numberOfMonthsInYear = 12;
declare var require: any;
declare var $: any;
@Component({
  selector: 'app-news-add-edit',
  templateUrl: './news-add-edit.component.html',
  styleUrls: ['./news-add-edit.component.scss']
})
export class NewsAddEditComponent implements OnInit {

  @ViewChild('FromDate', { static: false }) FromDate: GregorianHijriCalendarComponent;

  
  // Date
  @Input() years: number;
  @Input() months: number;
  @Input() days: number;
  
  //main object
  news: News;
  //dropdownPerGroup

  //dropdown
  ParentList: News[] = [];
  ParentItem = new News();
  busyLoadingParent: boolean = false;
  isEdit: boolean;

  isAdd: boolean;
  formSubmitted: boolean = false;
  busySaving = false;

  busyLoading: boolean = false;
  isActive: boolean = false;
  Active: boolean = false;
  totalNumberOfPages: number;
  totalNumberOfItems: number;
  // dropdown filter  -- page permission
  filterParams = new FilterParams();
  myDate = new Date();

  constructor(private route: ActivatedRoute, private route2: Router,
    private newsService: NewsService,
    private swalService: SwalService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private datePipe: DatePipe ,
    private DateServices: DateService,

  ) { }



  ngOnInit() {

    this.news = new News();
    this.getDropDown();
    if (this.route.snapshot.queryParams.isAdd === 'true') {
      this.isAdd = true;

    } else {

      this.news.NewsID = this.route.snapshot.params.id;
      this.getnews(this.news.NewsID)
      this.isAdd = false
    }


  }

  getnews(id) {
    this.newsService.get(id).subscribe(res => {
      this.news = res
      this.news.NewsID = id
    })
  }

  selectvacApplicarionDate(date) {
    this.news.FromDate = date.greg;
    this.news.FromDateH = date.hijri;
  }

  save(...args: boolean[]) {
    this.formSubmitted = true;
    let a;
    args.map(item => {
      if (item === true) {
        a = true
        this.swalService.NotifierError('قم بادخال الحقول المطلوبه');
      }
    })
    if (a) return
    if (this.isAdd) {
      this.newsService.create(this.news).subscribe(res => {
        this.swalService.Notifier('تم الحفظ بنجاح');
        this.formSubmitted = false;
        this.route2.navigate([`./pages/system-configuration/NewsView`])

      })
    } else {
      this.newsService.update(this.news).subscribe(res => {
        this.swalService.Notifier('تم التعديل بنجاح');
        this.formSubmitted = false;
        this.route2.navigate([`./pages/system-configuration/NewsView`])

      })

    }
  }

// get date now
getDateNow() {
  let myDate = new Date(this.myDate);
}

////////////////// Hijri API ///////////////////////
addHijriYears(date, years): Date {
  let dateUq = new UQCal(date).convert();
  let day = dateUq.Hday,
    month = dateUq.Hmonth,
    year = dateUq.Hyear;

  year += years;
  let lengthOfMonth = this.getLengthOfHijriMonth(year, month);
  if (day > lengthOfMonth) day = lengthOfMonth;
  return this.dateFromHijri(year, month, day);
}

addHijriMonths(date, months) {
  let dateUq = new UQCal(date).convert();
  let day = dateUq.Hday,
    month = dateUq.Hmonth,
    year = dateUq.Hyear;
  month += months;
  if (month > 12) {
    month = 12;
    year++;
  }
  let lengthOfMonth = this.getLengthOfHijriMonth(year, month);
  if (day > lengthOfMonth) day = lengthOfMonth;
  return this.dateFromHijri(year, month, day);

}
addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}


dateToHijri(date: Date) {
  let dateUq = new UQCal(date).convert();
  return `${dateUq.Hyear}/${dateUq.Hmonth}/${dateUq.Hday}`;

}
dateFromHijri(year: number, month: number, day: number) {
  var calendarHijri = $.calendars.instance("ummalqura");
  var dateHijri = calendarHijri.parseDate('yyyy/mm/dd', year + '/' + month + '/' + day);
  var calendarGregorien = $.calendars.instance("gregorian");
  var dateGregorien = calendarGregorien.fromJD(dateHijri.toJD());
  return new Date(dateGregorien._year, dateGregorien._month - 1, dateGregorien._day);
}
getLengthOfHijriMonth(year: number, month: number) {
  let AnyDateInMonth = this.dateFromHijri(year, month, 1);
  return new UQCal(AnyDateInMonth).convert().Hlength;
}


//calculate end of the vacation date
calcEndDate() {
  if (this.news.FromDate && (this.news.NewsDate)) {
    let endDate = this.addHijriYears(this.news.FromDate, 0);
    endDate = this.addDays(endDate, Number(this.news.NewsDate || 0) - 1);
    this.news.ToDate = this.DateServices.fromGregorianToGregorianString(endDate);
    this.news.ToDateH  = this.DateServices.fromGregorianToUmmulquraString(endDate);
  }

}

  getDropDown() {

    this.getParent();
  }

  getParent() {
    this.busyLoadingParent = true
    this.newsService.getAll().subscribe(res => {
      // this.ParentList = res;
      this.busyLoadingParent = false;
    })
  }
  SelectParent(parent: News) {
    this.ParentItem = Object.assign({}, parent)
    this.news.NewsID = this.ParentItem.NewsID
  }

  update() {
    this.newsService.update(this.news).subscribe(
      res => {
        this.busySaving = false;
        this.notifier.notify('success', ' تم التعديل  بنجاح ');
        this.getAllNews();


      },
      err => {
        this.busySaving = false;
        const errorMessage = err.message || 'حدث خطأ اثناء التعديل';
        this.notifier.notify('error', errorMessage);
      }
    )

  }


  create() {

    this.newsService.create(this.news).subscribe(
      res => {
        this.busySaving = false;
        this.notifier.notify('success', 'تمت الإضافة بنجاح');
        this.getAllNews();


      },
      err => {
        this.busySaving = false;
        let errorMessage = err.message || 'حدث خطأ اثناء الإضافة';
        this.notifier.notify('error', errorMessage);
      }

    )

  }
  // get content all data for notices
  getAllNews() {
    this.busyLoading = true;
    this.newsService.getAll(this.filterParams).subscribe(
      res => {
        this.ParentList = res.result;
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

}
