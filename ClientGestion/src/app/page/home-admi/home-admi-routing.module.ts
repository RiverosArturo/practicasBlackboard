import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from 'src/app/home/home.page';

import { HomeAdmiPage } from './home-admi.page';
import { EditCoursePage } from './page/edit-course/edit-course.page';
import { EditProfPage } from './page/edit-prof/edit-prof.page';
import { EditStudentPageModule } from './page/edit-student/edit-student.module';
import { EditStudentPage } from './page/edit-student/edit-student.page';

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
    path: 'edit-course/:nrc',
    loadChildren: () => import('./page/edit-course/edit-course.module').then( m => m.EditCoursePageModule)
  },
  {
    path: 'edit-student/:matricula',
    loadChildren: () => import('./page/edit-student/edit-student.module').then( m => m.EditStudentPageModule)
  },
  {
    path: 'edit-prof/:nTrabajador',
    loadChildren: () => import('./page/edit-prof/edit-prof.module').then( m => m.EditProfPageModule)
  },
  {
    path: 'add-student',
    component: EditStudentPage
  },
  {
    path: 'edit-student/:matricula',
    component: EditStudentPage
  },
  {
    path: 'add-prof',
    component: EditProfPage
  },
  {
    path: 'edit-prof/:nTrabajador',
    component: EditProfPage
  },
  {
    path: 'add-course',
    component: EditCoursePage
  },
  {
    path: 'edit-course/:nrc',
    component:EditCoursePage
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
