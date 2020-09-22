import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChangeThemeService } from '../../services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  _page: number;
  @Input()
  set page(page: number) {
    this._page = page || 1;
  }

  _size: number;
  @Input()
  set size(numberOfPages) {
    this._size = numberOfPages;
  }

  @Output() onChange = new EventEmitter<number>();

  constructor(private changeThemeService : ChangeThemeService) { }

  ngOnInit() {
    this.changeThemeService.changeColor();
  }

  changePage(page) {
    if( page<1 || page>this._size) return;
    this.onChange.emit(page);
  }

}
