import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

import { LoginPage } from '../page/login/login.page'
import { HomeAdmiPage } from '../page/home-admi/home-admi.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'login',
    loadChildren: () => import('../page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home-admi',
    component: HomeAdmiPage
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
