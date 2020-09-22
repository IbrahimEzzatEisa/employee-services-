import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { 
  FormNavigatorComponent,
  PageTitleComponent,
  PaginationComponent,
  PermissionsStringComponent,
  TableInfoComponent,
  ListTableComponent,
  SortableColumnComponent,
  DropdownListComponent,
  MainNavComponent ,
  GregorianHijriCalendarComponent

} from './components';

import { SortableTableDirective, ErrorAniamtionDirective } from './directives';
import { FilterPipe, paginate, SelectPipe, AppDatePipe } from './pipes';
import { DropdownComponent } from './components/dropdown/dropdown.component';


import {  SharedSettingsService } from './services';
import { DropdownListInputDirective } from './directives/dropdown-list-input.directive';
import { ConvertArDigitToEnPipe } from './pipes/convert-ar-digit-to-en.pipe';
import { FixedNumberPipe } from './pipes/fixed-number.pipe';
import { TableBoxComponent } from './components/table-box/table-box.component';
import { DwtComponent } from './components/dwt/dwt.component';

const COMPONENTS = [
  ListTableComponent,
  FormNavigatorComponent,
  PageTitleComponent,
  PaginationComponent,
  PermissionsStringComponent,
  TableInfoComponent,
  SortableColumnComponent,
  DropdownListComponent ,
  MainNavComponent ,
  GregorianHijriCalendarComponent,
  DropdownComponent,
  TableBoxComponent,
  DwtComponent
]

const APIs = [

]

const SERVICES = [
  ...APIs,
  SharedSettingsService,

]


const DIRECTIVES = [
  SortableTableDirective,
  ErrorAniamtionDirective ,
  DropdownListInputDirective
]

const PIPES = [
  FilterPipe,
  paginate,
  SelectPipe,
  AppDatePipe,
  FixedNumberPipe,
  ConvertArDigitToEnPipe
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  providers: [FilterPipe  , DatePipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return <ModuleWithProviders> {
          ngModule: SharedModule,
          providers: [
              ...SERVICES
          ]
      }
  }
}
