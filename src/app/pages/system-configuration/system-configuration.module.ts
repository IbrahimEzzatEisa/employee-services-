import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemConfigurationRoutingModule } from './system-configuration-routing.module';
import { UsersViewListComponent } from './users-view/users-view-list/users-view-list.component';
import { UsersViewAddEditComponent } from './users-view/users-view-add-edit/users-view-add-edit.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemConfigurationComponent } from './system-configuration.component';
import { MenuPermissionsComponent } from './users-view/menu-permissions/menu-permissions.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WorkFlowListComponent } from './WorkFlow/work-flow-list/work-flow-list.component';
import { DocTypesListComponent } from './DocTypes/doc-types-List/doc-types-list.component';
import { DepartmentsViewListComponent } from './departments-view/departments-view-list/departments-view-list.component';
import { DocPrioritylistComponent } from './doc-prioritylist/doc-prioritylist.component';
import { JobsComponent } from './jobs/jobs.component';
import { NewsListComponent } from './News/news-list/news-list.component';
import { NewsAddEditComponent } from './News/news-add-edit/news-add-edit.component';
import { SystemSettingsViewComponent } from './SystemSettings/system-settings-view/system-settings-view.component';
import { VotingAddComponent } from './Voting/voting-add/voting-add.component';


@NgModule({
    declarations: [
      UsersViewListComponent,
      UsersViewAddEditComponent,
      SystemConfigurationComponent,
      MenuPermissionsComponent,
      WorkFlowListComponent,
      DocTypesListComponent,
      DepartmentsViewListComponent,
      DocPrioritylistComponent,
      NewsListComponent,
      NewsAddEditComponent,
      SystemSettingsViewComponent,
      DocPrioritylistComponent,
      JobsComponent, 
      VotingAddComponent
    ],
    imports: [
      CommonModule,
      SystemConfigurationRoutingModule,
      FormsModule,
      SharedModule,
      NgbModule
    ]
})
export class SystemConfigurationModule { }
