import { Component, OnInit, HostListener, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilterParams } from '../../models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const ESCAPE_KEYCODE = 27;

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE_KEYCODE) {
      this.hideDropdown();
    }
  }

  @ViewChild('componentRef',{static:true}) componentRef: ElementRef;
  @ViewChild('searchInput',{static:true}) searchInput: ElementRef;
  @ViewChild('searchForm',{static:true}) searchForm: NgForm;

  @Input() list = []
  @Input() filterParams: FilterParams;
  @Input() totalNumberOfPages;
  @Input() totalNumberOfItems;
  @Input() selectedItemId: any;

  _selectedItem: any;
  @Input() set selectedItem(selectedItem){
    selectedItem? this._selectedItem = selectedItem : this._selectedItem = {};
  }

  @Input() idField: string;
  @Input() textField: string;
  @Input() placeholder: string = '';

  @Input() viewFields: string[] = [];
  @Input() ViewFieldsProps: string[] = [];

  @Input() busyLoading: boolean;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() submitted: boolean = false;

  @Output() search = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onChangePage = new EventEmitter();
  
  // onSearch: Subscription;

  searchText: string = "";
  isOpen: boolean = false;
  isDirty: boolean = false;
  focus: boolean = false;

  get invalid(): boolean {
    return this.required && !this._selectedItem[this.idField];
  }

  constructor() { }
  

  ngOnInit() {
    this.onSearch();
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
    if(this.isReadOnly || this.disabled) {
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

  //on table row click
  selectItem(item) {
    this.onSelect.emit(item);
    this.hideDropdown();
  }

  onSearch() {
    this.searchForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(changes => {
      this.search.emit(changes)
    })
  }
  
  changePage(pageNumber) {
    this.onChangePage.emit(pageNumber);
  }

  resetSelectedItem(emit?) {
    this._selectedItem = {};
    this._selectedItem[this.idField] = null;
    this._selectedItem[this.textField] = "";
    if(emit) {
      this.onSelect.emit(this._selectedItem);
    }
  }

  reset() {
    this.isDirty = false;
    this.resetSelectedItem();
  }
}
