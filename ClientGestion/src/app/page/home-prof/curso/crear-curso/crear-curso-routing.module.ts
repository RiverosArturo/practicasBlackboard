import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdmiPage } from 'src/app/page/home-admi/home-admi.page';
import { HomeProfPage } from '../../home-prof.page';
import { ConsultarCursoPage } from '../consultar-curso/consultar-curso.page';

import { CrearCursoPage } from './crear-curso.page';

const routes: Routes = [
  {
    path: '',
    component: CrearCursoPage
  },
  {
    path: 'home-prof',
    component: HomeProfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearCursoPageRoutingModule {}
