import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { EditStudentPage } from './page/home-admi/page/edit-student/edit-student.page';

import { LoginPage } from  './page/login/login.page'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home-stud',
    loadChildren: () => import('./page/home-stud/home-stud.module').then( m => m.HomeStudPageModule)
  },
  {
    path: 'home-admi',
    loadChildren: () => import('./page/home-admi/home-admi.module').then( m => m.HomeAdmiPageModule)
  },
  {
    path: 'home-prof',
    loadChildren: () => import('./page/home-prof/home-prof.module').then( m => m.HomeProfPageModule)
  },
  {
    path:'home-admi/edit-student/:matricula',
    component: EditStudentPage
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'login-Admi/:accessA',
    component: LoginPage
  },
  {
    path: 'login-Prof/:accessP',
    component: LoginPage
  },
  {
    path: 'login-Student/:accessS',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
