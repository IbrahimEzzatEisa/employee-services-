import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsFollowUpServicesComponent } from './reports-follow-up-services.component';


const routes: Routes = [ {
  path: '',
  component: ReportsFollowUpServicesComponent,
  children: [
  
   
]

}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsFollowUpRoutingModule { }
