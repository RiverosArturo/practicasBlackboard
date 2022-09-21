import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from 'src/app/home/home.page';

import { HomeAdmiPage } from './home-admi.page';


const routes: Routes = [
  {
    path: '',
    component: HomeAdmiPage
  },
  {
    path: 'list-students',
    loadChildren: () => import('./page/list-students/list-students.module').then( m => m.ListStudentsPageModule)
  },
  {
    path: 'list-prof',
    loadChildren: () => import('./page/list-prof/list-prof.module').then( m => m.ListProfPageModule)
  },
  {
    path: 'list-courses',
    loadChildren: () => import('./page/list-courses/list-courses.module').then( m => m.ListCoursesPageModule)
  },
  {
    path: 'home',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAdmiPageRoutingModule {}
