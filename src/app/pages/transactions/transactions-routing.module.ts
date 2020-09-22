import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrxInboxComponent } from './trx-inbox/trx-inbox.component';
import { TrxDetailsComponent } from './trx-details/trx-details.component';
import { TrxSearchComponent } from './trx-search/trx-search.component';
import { TrxOutAddComponent } from './trx-out-add/trx-out-add.component';
import { TrxOutSecertAddComponent } from './trx-out-secert-add/trx-out-secert-add.component';
import { TrxInAddComponent } from './trx-in-add/trx-in-add.component';
import { TrxInSecertAddComponent } from './trx-in-secert-add/trx-in-secert-add.component';


const routes: Routes = [
  {
    path:'TrxInbox',
    component: TrxInboxComponent
  },
  {
    path:'Trx-details/:id',
    component: TrxDetailsComponent
  },
  {
    path:'TrxSearch',
    component: TrxSearchComponent
  },
  {
    path:'TrxOutAdd',
    component: TrxOutAddComponent
  } ,
  {
    path:'TrxOutSecertAdd',
    component: TrxOutSecertAddComponent
  } ,
  {
    path:'TrxInAdd',
    component: TrxInAddComponent
  } ,
  {
    path:'TrxInSecertAdd',
    component: TrxInSecertAddComponent
  } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
