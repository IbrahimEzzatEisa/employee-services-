import { 
  Component, 
  OnInit, 
  Input, 
  ContentChild, 
  HostListener, 
  ElementRef, 
  ViewChild, 
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Observable } from 'rxjs';

import { FilterPipe, paginate } from '../../pipes';
import { ResultWithPagination, FilterParams } from '../../models';
import { DropdownListInputDirective } from '../../directives/dropdown-list-input.directive';

const ESCAPE_KEYCODE = 27;

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss'],
  host: {
    '(document:click)': 'onDocClick($event)',
  },
})
export class DropdownListComponent implements OnInit, OnChanges {

  @ContentChild(DropdownListInputDirective , {static: false})
  input: DropdownListInputDirective;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE_KEYCODE) {
      this.hideDropdown();
    }
  }
  @ViewChild('componentRef' , {static: false}) componentRef: ElementRef;
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  focus: boolean = false;
  isOpen: boolean = false;
  isDirty: boolean = false;

  @Input() isParentBasedFilter;

  _selectedItemId;
  @Input()
  set selectedItemId(selectedItemId) {
    this._selectedItemId = selectedItemId;
    this.selectModelItem();
  }
  _selectedItem: any = {};
  @Input()
  set selectedItem(selectedItem) {
    this._selectedItem = selectedItem || {};
  }
  @Input() idField: string;
  @Input() textField: string;
  @Output() onSelect = new EventEmitter<any>();
  //emit added value
  @Output() addedValue = new EventEmitter<any>();
  _list: any[];
  @Input()
  set list(list: any[]) {
    this._list = list;
    this.filter();
  }
 
  filteredList: any[];
  @Input() busyLoading: boolean;
  // to enable to add to the exist list by emit the search value and then you add it to list where you use custom component
  @Input() isEnableAdd: boolean = false;
  @Input() palceholder: string;
  @Input() isRequired: boolean = false;
  @Input() isReadonly: boolean = false;
  _isDisabled: boolean;
  @Input() 
  set isDisabled(isDisabled: boolean) {
    this._isDisabled = isDisabled || false;
  }

  @Input() submitted: boolean = false;
  
  searchText: string = "";

  get invalid(): boolean {
    return this.isRequired && !this._selectedItem[this.idField];
  }

  pageNumber: number;
  @Input() pageSize: number;;
  totalPages: number;

  @Input() 
  set listWithPagination(listWithPagination: ResultWithPagination<any>) {
    if(listWithPagination) {
      this.filteredList = listWithPagination.result;
      this.pageNumber = listWithPagination.pagination.currentPage;
      this.pageSize = listWithPagination.pagination.itemsPerPage;
      this.totalPages = listWithPagination.pagination.totalPages;
      this.busyLoading = false;
    }
  }

  @Output() onFilter = new EventEmitter<FilterParams>();

  constructor() { }

  ngOnInit() {
    this.pageNumber = 1;
    this.pageSize? this.pageSize = Number(this.pageSize): this.pageSize = 7;
    if(this.isParentBasedFilter) {
      this.parentFilter();
    }
  }
  ngOnChanges() {
    if(this._selectedItemId) this.selectModelItem();
  }
  resetSelectedItem(emit?) {
    this._selectedItem = {};
    this._selectedItem[this.idField] = null;
    this._selectedItem[this.textField] = "";
    if(emit) {
      this.onSelect.emit(this._selectedItem);
    }
  }
  onDocClick(event) {
    if(event.target != this.componentRef.nativeElement && !this.isParent(event.target, this.componentRef.nativeElement) ) {
      this.hideDropdown();
    }
  }
  isParent(element, parentElement) {
    if(element == parentElement)
      return true;
    while(element.parentNode) {
      if(element.parentNode==parentElement) {
        return true;
      } else {
        element = element.parentNode
      }
    }
    return false;
  }
  showDropdown() {
    if(this.isReadonly || this._isDisabled) {
      return;
    }
    this.isOpen = true;
    setTimeout(()=>{
      if(this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    }, 100);
  }
  hideDropdown() {
    if(this.isOpen) {
      this.isOpen = false;
      this.isDirty = true;
    }
  }
  select(item) {
    this._selectedItem = item;
    this.onSelect.emit(this._selectedItem);
    this.hideDropdown();
  }
  selectModelItem() {
    if(this._list && this._selectedItemId) {
      const selectedItem = this._list.find(
        item => item[this.idField] == this._selectedItemId
      );
      if(selectedItem) {
        this._selectedItem = selectedItem;
      } else {
        this.resetSelectedItem();
      }
    } else if (this._list && !this._selectedItemId) {
      this.resetSelectedItem();
    }
  }
  reset() {
    this.isDirty = false;
    this.resetSelectedItem();
  }

  onSearch() {
    this.pageNumber = 1;
    this.filter();
  }
  changePage(pageNumber) {
    if(pageNumber > 0 && pageNumber <= this.totalPages) {
      this.pageNumber = pageNumber;
    }
    this.filter();
  }
  filter() {
    if(this.isParentBasedFilter)
      return this.parentFilter();
    let filteredList = this._list;
      filteredList = this.search(filteredList);
    filteredList = this.paginate(filteredList);
    this.filteredList = filteredList;
  }
  search(list){
    let searhList = this.searchText.split(' ');
    for(let search of searhList) {
      list = new FilterPipe().transform(list, search, this.textField);
    }
    let searchResult = list;    
    const totalItems = searchResult.length;
    this.totalPages= Math.ceil(totalItems/this.pageSize);
    return searchResult;
  }
  paginate(list): any[] {
    return new paginate().transform(list, this.pageSize, this.pageNumber);
  }
  parentFilter() {
    this.busyLoading = true;
    const filterParams: FilterParams = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchValue: this.searchText || "null",
      sortField: "",
      sortDirection: "ASC"
    }
    this.onFilter.emit(filterParams);
  }
  //emit new value
  addToList(){
    this.addedValue.emit(this.searchText);
    this.searchText = "";
    this.filter();    
  }

}
