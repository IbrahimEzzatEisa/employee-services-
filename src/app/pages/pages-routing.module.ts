import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent
    },
  
    {
      path: 'system-configuration',
      loadChildren: () => import('./system-configuration/system-configuration.module').then(m => m.SystemConfigurationModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    },
    {
      path: 'Transactions',
      loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
    },
    {
      path: 'reports-follow-up',
      loadChildren: () => import('./reports-follow-up/reports-follow-up.module').then(m => m.ReportsFollowUpModule),
    },
   
    {
      path: 'computer-maintenance',
      loadChildren: () => import('./computer-maintenance/computer-maintenance.module').then(m => m.ComputerMaintenanceModule),
    },
    {
      path: '**',
      component: ErrorPageComponent,
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
