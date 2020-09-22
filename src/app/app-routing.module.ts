import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/services/Guards/auth-guard.service';


const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: '',
      redirectTo: 'pages',
      pathMatch: 'full'
    },
    {
      path: 'pages',
      loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
      canLoad:[AuthGuard],
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '**',
      redirectTo: 'pages'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
