import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdmiPage } from '../../home-admi.page';
import { ListCoursesPage } from '../list-courses/list-courses.page';

import { EditCoursePage } from './edit-course.page';


const routes: Routes = [
  {
    path: '',
    component: EditCoursePage
  },
  {
    path: 'home-admi',
    component: HomeAdmiPage
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCoursePageRoutingModule {}
