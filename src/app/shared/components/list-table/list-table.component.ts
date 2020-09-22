import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TableConfig, Permission } from 'src/app/shared/models';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {

  // hold serch value and clear it by call method [ removeSearch() ] by click on button
  queryString: string = '';

  // set after receive value from parent
  _itemsList: any[];
  // receive the list from parent(items)
  @Input()
  set itemsList(list) {
    this._itemsList = list || [];
  }
  // set after recevie configs 
  _configs: TableConfig[];
  // receive the list from parent(configs)
  @Input()
  set configs(conf) {
    this._configs = conf || [];
  }
  // make spinner appere if he load data and that came from parent
  _loading: boolean;
  @Input()
  set loading(isLoading) {
    this._loading = isLoading || false;
  }

  @Input() routeParamsKeys: string[];
  // the name of add button to create new recored -> this button call redirectToAdd() 
  @Input() addButtonText: string;
  // @Input() addEditRoute: string;

  @Input() addRoute: string;
  @Input() editRoute: string;

  _pageSize: number;
  @Input()
  set pageSize(pageSize) {
    this._pageSize = pageSize;
  }

  @Input() permission: Permission;

  @Output() OnPageSizeChange = new EventEmitter<number>();
  @Output() onSearch = new EventEmitter<string>();
  @Output() onSort = new EventEmitter<{ sortColumn: string, sortDirection: string }>();
  @ViewChild('searchForm', {static: false}) searchForm: NgForm;
  searchTimeout: any;

  headersSelectorShown: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  //   this.routeParamsKeys = this.routeParamsKeys || [this._configs[0].key];
  //   this.permission = this.permission || new Permission();
  //   this.search();
  }

  // // fire when click on button ( addButtonText ) to navigate to create new recored
  redirectToAdd() {
    if (this.addRoute) {
      this.router.navigate([this.addRoute]);
    } else {
      this.router.navigate(["../add"], { relativeTo: this.activatedRoute });
    }
  }
  // // recevie data of row to redirict to page
  // redirectToUpdate(modal: any) {
  //   let routeParams = '';
  //   for (let i = 0; i < this.routeParamsKeys.length; i++) {
  //     routeParams += `/${modal[this.routeParamsKeys[i]]}`;
  //   }
  //   if (this.editRoute) {
  //     this.router.navigate([this.editRoute]);
  //   } else {
  //     this.router.navigate(["../edit" + routeParams], { relativeTo: this.activatedRoute });
  //   }
  // }
  // // change number of row and emit to parent to reload list ()
  setPageSize(number) {
    this.OnPageSizeChange.emit(number)
  }
  // // fire when write on search and emit to parent to reload data
  // search() {
  //   this.searchForm.valueChanges.pipe(
  //     debounceTime(600),
  //     distinctUntilChanged( (x : any ,y: any)=> {
  //       if(x.search == y.search) return true
  //       false
  //     })
  //   ).subscribe((res) => {
  //     this.onSearch.emit(res.search);
  //   })

  // }
  // //sort data on table using dirctibe
  // sort(sortingParams) {
  //   this.onSort.emit(sortingParams);
  // }

}
