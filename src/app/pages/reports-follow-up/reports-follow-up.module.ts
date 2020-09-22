import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsFollowUpRoutingModule } from './reports-follow-up-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportsFollowUpServicesComponent } from './reports-follow-up-services.component';


@NgModule({
  declarations: [ 
  ReportsFollowUpServicesComponent,
  ],
  imports: [
    CommonModule,
    ReportsFollowUpRoutingModule ,
    FormsModule,
    SharedModule
  ]
})
export class ReportsFollowUpModule { }
