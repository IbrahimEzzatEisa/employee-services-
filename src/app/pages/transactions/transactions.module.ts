import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TrxInboxComponent } from './trx-inbox/trx-inbox.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrxDetailsComponent } from './trx-details/trx-details.component';
import { TrxSearchComponent } from './trx-search/trx-search.component';

import { TrxOutAddComponent } from './trx-out-add/trx-out-add.component';
import { TrxOutSecertAddComponent } from './trx-out-secert-add/trx-out-secert-add.component';
import { TrxInAddComponent } from './trx-in-add/trx-in-add.component';
import { TrxInSecertAddComponent } from './trx-in-secert-add/trx-in-secert-add.component';


@NgModule({
  declarations: [
    TrxInboxComponent,
    TrxOutAddComponent,
    TrxOutSecertAddComponent,
    TrxInAddComponent,
    TrxInSecertAddComponent,
    TrxDetailsComponent,
    TrxSearchComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class TransactionsModule { }
