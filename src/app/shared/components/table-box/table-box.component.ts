import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FilterParams } from "../../models";

class Choices {
  constructor() {
    this.delete = false;
    this.file = false;
    this.dish = false;
    this.marker = false;
  }
  delete: boolean;
  file: boolean;
  dish: boolean;
  marker: boolean;
}
class Title {
  constructor() {
    this.delete = '';
    this.file = '';
    this.dish = '';
    this.marker = '';
  }
  delete: string;
  file: string;
  dish: string;
  marker: string;
}

@Component({
  selector: "table-box",
  templateUrl: "./table-box.component.html",
  styleUrls: ["./table-box.component.scss"],
})
export class TableBoxComponent implements OnInit {
  @Input() list = [];
  @Input() properties = []; 
  @Input() filterParams: FilterParams;
  @Input() titleArray = [];
  @Input() choices?: Choices = new Choices();
  @Input() title?: Title = new Title();
  @Input() isChoices?: boolean = false;
  @Input() totalNumberOfItems;
  @Input() totalNumberOfPages;
  @Input() isSearch: boolean = false;
  // @Input() selectedItemId: any;
  @Output("emitPageNumber") pageNumber = new EventEmitter();
  @Output("emitpageSize") pageSize = new EventEmitter();
  @Output("emitedRow") emitedRow = new EventEmitter();
  @Output("file") file = new EventEmitter();
  @Output("dish") dish = new EventEmitter();
  @Output("marker") marker = new EventEmitter();
  @Output("delete") delete = new EventEmitter();
  @Output("search") search = new EventEmitter();

  public searchval: string = "";
  constructor() {}

  ngOnInit() {}

  changePageNumber(pageSize) {
    this.pageNumber.emit(pageSize);
  }
  rowEmit(item: any) {
    this.emitedRow.emit(item);
  }
  rowDish(item: any) {
    this.dish.emit(item);
  }
  rowMarker(item: any) {
    this.marker.emit(item);
  }
  deleteItem(item: any) {
    this.delete.emit(item);
  }
  setPageSize(num) {
    this.pageSize.emit(num);
  }
  searchValue() {
    this.search.emit(this.searchval);
  }
}
