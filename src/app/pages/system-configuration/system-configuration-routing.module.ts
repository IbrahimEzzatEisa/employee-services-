import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersViewListComponent } from './users-view/users-view-list/users-view-list.component';
import { UsersViewAddEditComponent } from './users-view/users-view-add-edit/users-view-add-edit.component';
import { SystemConfigurationComponent } from './system-configuration.component';
import { MenuPermissionsComponent } from './users-view/menu-permissions/menu-permissions.component';
import { WorkFlowListComponent } from './WorkFlow/work-flow-list/work-flow-list.component';
import { DocTypesListComponent } from './DocTypes/doc-types-List/doc-types-list.component';
import { DepartmentsViewListComponent } from './departments-view/departments-view-list/departments-view-list.component';
import { DocPrioritylistComponent } from './doc-prioritylist/doc-prioritylist.component';
import { JobsComponent } from './jobs/jobs.component';
import { NewsAddEditComponent } from './News/news-add-edit/news-add-edit.component';
import { NewsListComponent } from './News/news-list/news-list.component';
import { SystemSettingsViewComponent } from './SystemSettings/system-settings-view/system-settings-view.component';
import { VotingAddComponent } from './Voting/voting-add/voting-add.component';



const routes: Routes = [{
  path: '',
  component: SystemConfigurationComponent,
  children: [
    {
      path: 'UsersView',
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: UsersViewListComponent,

        },
        {
          path: 'edit/:id',
          component: UsersViewAddEditComponent,

        },
        {
          path: 'Add',
          component: UsersViewAddEditComponent,

        },
     
      ]     
    }, 

 
    {
      path: 'menu-permissions',
      component: MenuPermissionsComponent,

    },
    {
      path: 'NewsView',
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: NewsListComponent,

        },
        {
          path: 'edit/:id',
          component: NewsAddEditComponent,

        },
        {
          path: 'add',
          component: NewsAddEditComponent,

        },

      ]
    },

    {
      path: 'SystemSettings',
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: SystemSettingsViewComponent,
        },
        {
          path: 'edit/:id',
          component: SystemSettingsViewComponent,
        },
        {
          path: 'add',
          component: SystemSettingsViewComponent,

        },
      ]
    },
    {
      path: 'VotingAddEdit',
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: VotingAddComponent,

        },
        {
          path: 'edit/:id',
          component: NewsAddEditComponent,

        },
        {
          path: 'add',
          component: NewsAddEditComponent,

        },


      ]
    },
    
    {
      path: 'WorkFlow',
      children:
        [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: WorkFlowListComponent,

          },
        
        ]
    },
    {
      path: 'DocTypesAddEdit',
      children:
        [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: DocTypesListComponent,

          },
        
      

        ]
    },
    {
      path: 'DocPeriorityAddEdit',
      children:
        [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: DocPrioritylistComponent,

          },
        
      

        ]
    },
   
    {
      path: 'Departments',
      children:
        [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: DepartmentsViewListComponent,

          },
          
        ]
    },

    {
      path: 'JobsAddEdit',
      component: JobsComponent,
    },
    
   

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemConfigurationRoutingModule { }
